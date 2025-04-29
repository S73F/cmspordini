<?php

namespace App\Http\Controllers;

use App\Jobs\CreazioneOrdineMailJob;
use App\Jobs\TermineOrdineMailJob;
use App\Models\Operatore;
use App\Models\Ordine;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class OrdineController extends Controller
{

    /**
     * Crea un nuovo ordine e gestisce il file caricato.
     *
     * Valida i dati in ingresso, calcola il numero progressivo per l'anno corrente e crea l'ordine.
     * Se viene caricato un file, lo salva nello storage pubblico, aggiorna l'ordine e avvia un job asincrono
     * per inviare un'email di notifica a cliente e operatori.
     *
     * @param Request $request - La richiesta HTTP contenente i dati del nuovo ordine.
     * @return \Illuminate\Http\RedirectResponse - Ritorna un redirect con un messaggio di successo o errore.
     * @throws ValidationException - Se i dati non sono validi.
     */
    public function creazione(Request $request)
    {
        try {
            $request->validate([
                'medico_ordinante' => 'required|string|max:50',
                'paziente_nome' => 'required|string|max:50',
                'paziente_cognome' => 'required|string|max:50',
                'indirizzo_spedizione' => 'required|string|max:50',
                'lavorazione' => 'required|string|max:1000',
                'colore' => 'required|string|max:100',
                'piattaforma' => 'nullable|string|max:1000',
                'data_cons' => 'required|date',
                'ora_cons' => 'required',
                'note' => 'nullable|string|max:1000',
                'userfile' => 'required|file|mimes:zip,pdf,stl',
            ], [
                'required' => 'Il campo :attribute è obbligatorio.',
                'max' => 'Il campo :attribute non può superare i :max caratteri.',
                'mimes' => 'Il file deve avere uno dei seguenti formati: :values.',
            ]);

            // Calcolo del numero progressivo per l'anno corrente
            $anno = date('Y');
            $numero = Ordine::whereYear('data', $anno)->max('numero') + 1;

            $ordine = Ordine::create([
                'IDcliente' => Auth::guard('cliente')->user()->IDcliente,
                'numero' => $numero,
                'data' => now(),
                'medicoOrdinante' => $request->medico_ordinante,
                'PazienteNome' => $request->paziente_nome,
                'PazienteCognome' => $request->paziente_cognome,
                'IndirizzoSpedizione' => $request->indirizzo_spedizione,
                'lavorazione' => $request->lavorazione,
                'colore' => $request->colore,
                'piattaforma' => $request->piattaforma ?? '',
                'data_cons' => $request->data_cons,
                'ora_cons' => $request->ora_cons,
                'stato' => 0,
                'fileok' => 0,
                'note' => $request->note ?? '',
                'note_int' => '',
            ]);

            // Se viene caricato un file valido, lo salva e aggiorna l'ordine
            if ($request->hasFile('userfile') && $request->file('userfile')->isValid()) {
                $file = $request->file('userfile');
                $extension = $file->getClientOriginalExtension();
                $newFileName = Auth::guard('cliente')->user()->ragione_sociale . "_" . strtoupper($request->paziente_cognome) . "_" . strtoupper($request->paziente_nome) . "_" . $ordine->IDordine . "." . $extension;

                // Salva il file nella cartella storage/app/public/uploads
                $file->storeAs('uploads', $newFileName, 'public');

                $ordine->update([
                    'fileok' => 1,
                    'nomefile' => $newFileName,
                ]);

                // Recupera tutte le email degli operatori
                $mailOperatori = Operatore::pluck("emailoperatore");

                // Dispatch asincrono per inviare un'email di notifica a cliente e operatori
                dispatch(new CreazioneOrdineMailJob(['mailCliente' => Auth::guard('cliente')->user()->emailcliente, 'ragioneSociale' => Auth::guard('cliente')->user()->ragione_sociale, 'numero' => $numero, 'anno' => $anno, 'mailOperatori' => $mailOperatori]));

                return redirect('/cliente/dashboard')->with(['success' => 'Ordine creato e file caricato con successo!']);
            } else {
                return redirect('/cliente/dashboard')->with(['success' => 'Ordine creato con successo!']);
            }

        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la creazione dell'ordine", "validation_errors" => $errors])->withInput();
        }
    }

    /**
     * Restituisce il numero di lavori nuovi (stato = 0).
     * 
     * @return int - Numero di lavori nuovi.
     */
    public function getNumeroLavori()
    {
        $numeroLavoriNuovi = Ordine::where('stato', 0)->count();

        return $numeroLavoriNuovi;
    }

    /**
     * Genera un PDF dell'ordine.
     * 
     * Recupera l'ordine con i campi specificati, aggiungendo ulteriori dati se l'utente loggato è un operatore.
     * Quindi, genera il PDF utilizzando la vista PDF.ordinePDF e lo restituisce come stream.
     *
     * @param int $id - ID dell'ordine.
     * @return \Illuminate\Http\Response - Risposta con il PDF generato.
     */
    public function generaPDF($id)
    {
        // Campi da restituire alla vista del PDF
        $fields = ['IDordine', 'IDcliente', 'numero', 'data', 'medicoOrdinante', 'PazienteNome', 'PazienteCognome', 'IndirizzoSpedizione', 'lavorazione', 'colore', 'piattaforma', 'data_cons', 'ora_cons', 'note'];

        // Se l'utente loggato è un operatore, aggiunge i campi seguenti
        if (Auth::guard('operatore')->check()) {
            $fields = array_merge($fields, ['utente_modifica', 'note_int', 'note_ulti_mod']);
        }

        $ordine = Ordine::select($fields)->with('cliente:IDcliente,ragione_sociale,indirizzo,citta,provincia')->find($id);

        $pdf = Pdf::loadView("PDF.ordinePDF", compact("ordine"));

        return $pdf->stream("ordine_{$ordine->IDordine}.pdf");
    }

    /**
     * Aggiorna lo stato di un ordine, avanzando allo stato successivo o annullando l'ordine.
     * 
     * Se l'opzione è "forward", il metodo aggiorna lo stato:
     * - Se lo stato corrente è 0, lo imposta a 1, registra la data di inizio lavorazione e assegna l'ordine all'operatore.\n
     * - Se lo stato corrente è 1, lo imposta a 2, registra la data di spedizione e invia una notifica via email.\n
     * Se l'opzione non è "forward" (ad esempio "back"), tutti i dati dell'ordine (compreso lo stato) vengono ripristinati.
     *
     * @param Request $request - La richiesta HTTP contenente i dati dell'operatore.
     * @param int $IDordine - ID dell'ordine da aggiornare.
     * @param string $option - Opzione per avanzare o annullare l'ordine (default "forward").
     * @return \Illuminate\Http\RedirectResponse - Redirect con un messaggio di conferma o errore.
     * @throws Exception - Se lo stato dell'ordine non è valido.
     */
    public function aggiornaStato(Request $request, $IDordine, $option = "forward")
    {
        $ordine = Ordine::select('IDordine', 'IDoperatore', 'IDcliente', 'numero', 'data', 'stato')->with(['operatore:IDoperatore,nome,cognome', 'cliente:IDcliente,emailcliente'])->find($IDordine);

        if (!$ordine) {
            return redirect()->back()->withErrors('Ordine non trovato');
        }

        try {
            if ($option == "forward") {

                switch ($ordine->stato) {

                    // Stato iniziale: passa a "In lavorazione" (1), registra la data di inizio e assegna l'ordine all'operatore corrente
                    case 0:
                        $ordine->update(['stato' => 1, 'data_inizioLavorazione' => now(), 'IDoperatore' => $request->user()->IDoperatore]);

                        return redirect('/operatore/dashboard?tipo=nuovi')->with('success', 'Hai preso in carico il lavoro.');


                    // Stato "In lavorazione": passa a "Spedito" (2), registra la data di spedizione
                    case 1:
                        $ordine->update(['stato' => 2, 'data_spedizione' => now()]);

                        // Dispatch asincrono per inviare un'email di notifica al cliente
                        dispatch(new TermineOrdineMailJob(['mailCliente' => $ordine->cliente->emailcliente, 'numero' => $ordine->numero, 'anno' => Carbon::parse($ordine->data)->format('Y'), 'nomeOperatore' => $ordine->operatore->nome, 'cognomeOperatore' => $ordine->operatore->cognome]));

                        return redirect('/operatore/dashboard?tipo=inCorso')->with('success', 'Hai spedito la lavorazione.');

                    default:
                        throw new Exception("Stato dell'ordine non valido. Contattare un amministratore");
                }

            } else {
                // Se a $option viene passato un argomento differente da "forward" (es: "back"), l'ordine viene annullato e riportato a stato 0
                $ordine->update(['data_inizioLavorazione' => null, 'stato' => 0, 'data_spedizione' => null, "note_int" => "", 'note_ulti_mod' => null, 'utente_modifica' => "-", "file_fin" => 0, 'file_fin_nome' => null]);
                return redirect('/operatore/dashboard?tipo=inCorso')->with('success', "Hai annullato l'incarico e ripristinato l'ordine.");
            }

        } catch (Exception $e) {
            $errors = $e->getMessage();
            return redirect()->back()->with('error', 'ATTENZIONE: si è verificato un errore. Riprova più tardi.')->withErrors($errors);
        }
    }

    /**
     * Scarica il file associato a un ordine.
     * 
     * @param int $id ID dell'ordine.
     * @return \Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\StreamedResponse - Risposta per il download del file.
     */
    public function downloadFile($id)
    {
        // Recupera il nome del file associato all'ordine dal database
        $fileName = Ordine::where('IDordine', $id)->value('nomefile');

        if (!$fileName) {
            return redirect()->back()->with(['error' => 'File non trovato nel database.']);
        }

        if (Storage::disk('public')->exists("uploads/{$fileName}")) {
            return Storage::disk('public')->download("uploads/{$fileName}");
        } else {
            return redirect()->back()->with(['error' => 'Il file non esiste nel server.']);
        }
    }

    /**
     * Scarica il file finale di un ordine.
     * 
     * @param int $id ID dell'ordine.
     * @return \Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\StreamedResponse - Risposta per il download del file finale.
     */
    public function downloadFileFinale($id)
    {
        // Recupera il nome del file finale associato all'ordine dal database
        $fileName = Ordine::where('IDordine', $id)->value('file_fin_nome');

        if (!$fileName) {
            return redirect()->back()->with(['error' => 'File non trovato nel database.']);
        }

        if (Storage::disk('public')->exists("uploads/{$fileName}")) {
            return Storage::disk('public')->download("uploads/{$fileName}");
        } else {
            return redirect()->back()->with(['error' => 'Il file non esiste nel server.']);
        }
    }
}
