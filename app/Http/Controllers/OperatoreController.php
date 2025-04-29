<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Ordine;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OperatoreController extends Controller
{
    /**
     * Mostra la dashboard dell'operatore con i lavori da gestire.
     * 
     * Recupera gli ordini in base allo stato (nuovi, in corso, spediti) e il numero
     * di ordini nuovi, per renderizzare la vista della dashboard.
     *
     * @param Request $request - La richiesta HTTP.
     * @return \Inertia\Response - La vista della dashboard.
     */
    public function showDashboard(Request $request)
    {
        // Imposta il tipo di lavori da visualizzare (default: "nuovi")
        $tipo = $request->query('tipo', "inCorso");

        $lavori = [];

        if ($tipo == "nuovi") {
            $lavori = Ordine::select("IDordine", "IDcliente", "medicoOrdinante", "PazienteNome", "PazienteCognome", "data")
                ->with(["cliente:IDcliente,ragione_sociale"])
                ->where('stato', 0)
                ->orderBy('data', 'desc')
                ->get();
        }

        if ($tipo == "inCorso") {
            $lavori = Ordine::select("IDordine", "IDcliente", "IDoperatore", "medicoOrdinante", "PazienteNome", "PazienteCognome", "data", "data_inizioLavorazione", "note_ulti_mod", "file_fin")
                ->with(["cliente:IDcliente,ragione_sociale", "operatore:IDoperatore,nome,cognome"])
                ->where('stato', 1)
                ->orderBy('data_inizioLavorazione', 'desc')
                ->get();
        }

        if ($tipo == "spediti") {
            $lavori = Ordine::select("IDordine", "IDcliente", "IDoperatore", "medicoOrdinante", "PazienteNome", "PazienteCognome", "data", "data_inizioLavorazione", "data_spedizione", "file_fin")
                ->with(["cliente:IDcliente,ragione_sociale", "operatore:IDoperatore,nome,cognome"])
                ->where('stato', 2)
                ->orderBy('data_spedizione', 'desc')
                ->get();
        }

        $numLavoriNuovi = Ordine::where('stato', 0)->count();

        return Inertia::render("Operatore/Dashboard", [
            "tipo" => $tipo,
            "lavori" => $lavori,
            "numLavoriNuovi" => $numLavoriNuovi
        ]);
    }

    /**
     * Mostra la pagina di gestione clienti.
     * 
     * Recupera l'elenco dei clienti e renderizza la vista corrispondente.
     *
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse - La vista dei clienti o un redirect in caso di errore.
     */
    public function showGestioneClienti()
    {
        try {
            $clienti = Cliente::select('IDcliente', 'ragione_sociale', 'nome', 'cognome', 'emailcliente', 'username')
                ->orderBy('IDcliente', 'desc')
                ->get();

            return Inertia::render('Operatore/GestioneClienti', ["clienti" => $clienti]);

        } catch (Exception $e) {
            return redirect()->back()->with(["error" => "Errore durante il recupero dei clienti"]);
        }
    }

    /**
     * Recupera e mostra gli ordini di un cliente specifico.
     *
     * Se viene fornito l'ID del cliente, recupera gli ordini relativi a quel cliente;
     * altrimenti, mostra solo la lista dei clienti.
     *
     * @param int|null $IDcliente - ID del cliente (facoltativo).
     * @return \Inertia\Response - La vista con i clienti e, se disponibile, i loro ordini.
     */
    public function showOrdiniCliente($IDcliente = null)
    {
        $clienti = Cliente::select('IDcliente', 'ragione_sociale')->get();
        $ordini = [];

        // Se è fornito l'IDcliente, recupera gli ordini per quel cliente
        if ($IDcliente) {
            $ordini = Ordine::where('IDcliente', $IDcliente)
                ->with([
                    'operatore' => function ($query) {
                        $query->select('IDoperatore', 'nome', 'cognome');
                    },
                    'cliente' => function ($query) {
                        $query->select('IDcliente', 'ragione_sociale');
                    }
                ])
                ->select(
                    'IDordine',
                    'IDoperatore',
                    'IDcliente',
                    'medicoOrdinante',
                    'PazienteNome',
                    'PazienteCognome',
                    'stato',
                    'data',
                    'data_inizioLavorazione',
                    'data_spedizione',
                    'file_fin',
                )
                ->orderByDesc('data')
                ->get();

            return Inertia::render('Operatore/OrdiniClienti', ["clienti" => $clienti, "ordini" => $ordini]);

        } else {
            // Se non viene passato l'IDcliente, mostra solo la lista dei clienti, senza alcun ordine
            return Inertia::render('Operatore/OrdiniClienti', ["clienti" => $clienti]);
        }
    }

    /**
     * Mostra la modale per la creazione o modifica di un cliente.
     *
     * @param string $azione - L'azione da eseguire: "creazione" o "modifica".
     * @param int|null $id - L'ID del cliente da modificare (necessario solo per la modifica).
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse La risposta Inertia per visualizzare la modale o un redirect in caso di errore.
     */
    public function showAzioneClienteModal($azione, $id = null)
    {
        if ($id) {
            $cliente = Cliente::find($id);
        }

        switch ($azione) {
            case "creazione":
                return Inertia::render('Modals/AzioneCliente', ["action" => $azione]);
            case "modifica":
                return Inertia::render('Modals/AzioneCliente', ["action" => $azione, "cliente" => $cliente]);
            default:
                return redirect()->back()->with("error", "Azione non valida");
        }
    }

    /**
     * Aggiunge un nuovo cliente nel database.
     *
     * Valida i dati di input e crea un nuovo record cliente.
     *
     * @param Request $request - La richiesta HTTP contenente i dati del cliente.
     * @return \Illuminate\Http\RedirectResponse - Redirect con esito della creazione.
     * @throws ValidationException - Se i dati non sono validi.
     */
    public function createCliente(Request $request)
    {
        try {
            $request->validate([
                'ragione_sociale' => 'required|string|max:100',
                'nome' => 'required|string|max:50',
                'cognome' => 'required|string|max:50',
                'partitaIVA' => 'required|string|max:50',
                'indirizzo' => 'required|string|max:50',
                'citta' => 'required|string|max:50',
                'cap' => 'required|integer',
                'provincia' => 'required|string|max:50',
                'emailcliente' => 'required|email|string|max:50',
                'username' => 'required|string|max:20',
                'password' => 'required|string|max:100',
            ], [
                'required' => 'Il campo :attribute è obbligatorio.',
                'max' => 'Il campo :attribute non può superare i :max caratteri.',
                'email' => 'La mail inserita non è valida.',
                'integer' => 'Il campo :attribute deve contenere un numero intero.'
            ]);

            $cliente = Cliente::create([
                'ragione_sociale' => $request->ragione_sociale,
                'nome' => $request->nome,
                'cognome' => $request->cognome,
                'partitaIVA' => $request->partitaIVA,
                'indirizzo' => $request->indirizzo,
                'citta' => $request->citta,
                'cap' => $request->cap,
                'provincia' => $request->provincia,
                'emailcliente' => $request->emailcliente,
                'username' => $request->username,
                'password' => bcrypt($request->password),
            ]);

            return redirect('/operatore/gestione-clienti')->with(['success' => 'Cliente creato con successo!', 'newCliente' => $cliente]);

        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la creazione del cliente", "validation_errors" => $errors])->withErrors($errors)->withInput();
        }
    }

    /**
     * Aggiorna i dati di un cliente.
     *
     * Valida i dati di input e, se vi sono modifiche, aggiorna il record del cliente.
     *
     * @param Request $request - La richiesta HTTP contenente i dati aggiornati.
     * @param int $IDcliente - ID del cliente da modificare.
     * @return \Illuminate\Http\RedirectResponse - Redirect con esito dell'aggiornamento.
     */
    public function patchCliente(Request $request, $IDcliente)
    {
        $cliente = Cliente::findOrFail($IDcliente);

        try {
            $validatedData = $request->validate([
                'ragione_sociale' => 'sometimes|nullable|string|max:100',
                'nome' => 'sometimes|nullable|string|max:50',
                'cognome' => 'sometimes|nullable|string|max:50',
                'partitaIVA' => 'sometimes|nullable|string|max:50',
                'indirizzo' => 'sometimes|nullable|string|max:50',
                'citta' => 'sometimes|nullable|string|max:50',
                'cap' => 'sometimes|nullable|integer',
                'provincia' => 'sometimes|nullable|string|max:50',
                'emailcliente' => 'sometimes|nullable|email|string|max:50',
                'username' => 'sometimes|nullable|string|max:20',
                'password' => 'sometimes|nullable|string|max:100',
            ], [
                'required' => 'Il campo :attribute è obbligatorio.',
                'max' => 'Il campo :attribute non può superare i :max caratteri.',
                'email' => 'La mail inserita non è valida.',
                'integer' => 'Il campo :attribute deve contenere un numero intero.',
                'string' => 'Il campo :attribute deve contenere una stringa di testo.'
            ]);

            // Filtra i dati non nulli e non vuoti ricevuti
            $data = array_filter($validatedData, function ($value) {
                return $value !== null && $value !== '';
            });

            if (!empty($data)) {
                $cliente->fill($data);

                if (!empty($validatedData['password'])) {
                    $cliente->password = bcrypt($validatedData['password']);
                }

                $cliente->update();

            } else {
                throw new Exception("Non è stato modificato alcun dato");
            }

            return redirect()->intended('/operatore/gestione-clienti')->with(['success' => 'Cliente modificato con successo!']);

        } catch (ValidationException $e) {
            $errors = $e->validator->errors();
            return redirect()->back()->with(["error" => "Errore durante la modifica del cliente", "validation_errors" => $errors])->withErrors($errors)->withInput();

        } catch (Exception $e) {
            $error = $e->getMessage();
            return redirect()->back()->with("error", $error)->withErrors($error);
        }
    }

    /**
     * Mostra la modale per eliminare un cliente.
     *
     * @param int $IDCliente - ID del cliente da eliminare.
     * @return \Inertia\Response - La vista della modale per l'eliminazione del cliente.
     */
    public function showEliminazioneClienteModal($IDCliente)
    {
        $cliente = Cliente::select('IDcliente', "ragione_sociale")->find($IDCliente);

        return Inertia::render("Modals/EliminazioneCliente", ["cliente" => $cliente]);
    }

    /**
     * Elimina un cliente.
     *
     * @param int $IDCliente - ID del cliente da eliminare.
     * @return \Illuminate\Http\RedirectResponse - Redirect con esito dell'eliminazione.
     */
    public function deleteCliente($IDCliente)
    {
        $cliente = Cliente::findOrFail($IDCliente);

        $cliente->delete();

        return redirect('/operatore/gestione-clienti')->with(['success' => 'Cliente eliminato con successo']);
    }

    /**
     * Mostra il modal per prendere in carico un ordine.
     *
     * @param int $IDordine - L'ID dell'ordine da prendere in carico.
     * @return \Inertia\Response - La vista della modale per la presa in carico dell'ordine.
     */
    public function showAccettazioneOrdineModal($IDordine)
    {
        $ordine = Ordine::select('IDordine')->find($IDordine);

        return Inertia::render("Modals/AccettazioneOrdine", [
            "ordine" => $ordine->IDordine,
        ]);
    }

    /**
     * Mostra il modal per eliminare un ordine.
     *
     * @param int $IDordine - L'ID dell'ordine da eliminare.
     * @return \Inertia\Response - La vista della modale per l'eliminazione dell'ordine.
     */
    public function showSpedizioneOrdineModal($IDordine)
    {
        $ordine = Ordine::select('IDordine')->find($IDordine);

        return Inertia::render("Modals/SpedizioneOrdine", [
            "ordine" => $ordine->IDordine,
        ]);
    }

    /**
     * Mostra il modal per ripristinare un ordine.
     *
     * @param int $IDordine - L'ID dell'ordine da ripristinare.
     * @return \Inertia\Response - La vista della modale per il ripristino dell'ordine.
     */
    public function showResetOrdineModal($IDordine)
    {
        $ordine = Ordine::select('IDordine')->find($IDordine);

        return Inertia::render("Modals/ResetOrdine", [
            "ordine" => $ordine->IDordine,
        ]);
    }

    /**
     * Mostra il modal per eliminare un ordine.
     *
     * @param int $IDordine - L'ID dell'ordine da eliminare.
     * @return \Inertia\Response - La vista della modale per l'eliminazione dell'ordine.
     */
    public function showEliminazioneOrdineModal($IDordine)
    {
        $ordine = Ordine::select('IDordine', 'stato')->find($IDordine);

        return Inertia::render("Modals/EliminazioneOrdine", [
            "ordine" => $ordine->IDordine,
            "stato" => $ordine->stato
        ]);
    }

    /**
     * Elimina un ordine.
     *
     * @param int $IDordine - L'ID dell'ordine da eliminare.
     * @param Request $request - La richiesta HTTP contenente la query string 'stato'.
     * @return \Illuminate\Http\RedirectResponse - Redirect con esito dell'eliminazione.
     */
    public function deleteOrdine($IDordine, Request $request)
    {
        $ordine = Ordine::findOrFail($IDordine);

        $ordine->delete();

        // Recupera la query string "stato" attuale, utile per il reindirizzamento alla pagina corretta
        $stato = $request->input('stato', 1);

        $redirectUrl = ($stato == 0)
            ? '/operatore/dashboard?tipo=nuovi'
            : '/operatore/dashboard?tipo=inCorso';

        return redirect($redirectUrl)->with('success', 'Lavoro eliminato con successo');
    }

    /**
     * Mostra la modale per la lavorazione di un ordine.
     *
     * @param int $IDordine - ID dell'ordine sul quale caricare la lavorazione.
     * @return \Inertia\Response - La vista della modale per la lavorazione dell'ordine.
     */
    public function showLavorazioneModal($IDordine)
    {
        $ordine = Ordine::select('IDordine', 'note_int')->findOrFail($IDordine);

        return Inertia::render('Modals/Lavorazione', [
            'ordine' => $ordine->IDordine,
            'note_int' => $ordine->note_int
        ]);
    }

    /**
     * Carica una lavorazione per un ordine.
     *
     * Valida i dati (file e note) e, se presenti, li salva aggiornando l'ordine.
     *
     * @param int $IDordine - ID dell'ordine da aggiornare.
     * @param Request $request - La richiesta HTTP contenente il file (opzionale) e le note.
     * @return \Illuminate\Http\RedirectResponse - Redirect con esito del caricamento.
     */
    public function caricaLavorazione($IDordine, Request $request)
    {
        $ordine = Ordine::select('IDordine', 'IDcliente', 'PazienteNome', 'PazienteCognome', 'utente_modifica', 'note_ulti_mod', 'file_fin', 'file_fin_nome', 'note_int')
            ->with(['cliente:IDcliente,ragione_sociale'])
            ->findOrFail($IDordine);

        try {
            $request->validate([
                'userfile' => 'nullable|file|mimes:zip,pdf,stl',
            ], [
                'mimes' => 'Il file deve avere uno dei seguenti formati: :values.',
            ]);

            // Se non sono presenti né note né file, lancia un'eccezione
            if (empty($request->note_int) && !$request->hasFile('userfile')) {
                throw new Exception("Non hai modificato la lavorazione");
            }

            // Recupera l'operatore autenticato per registrare l'utente che effettua la modifica
            $operatore = Auth::guard('operatore')->user();
            $utenteModifica = trim(($operatore->cognome ?? '') . ' ' . ($operatore->nome ?? ''));

            $fileCaricato = false;
            $noteModificate = false;

            // Se la richiesta contiene un file valido, salva il file e aggiorna i dettagli dell'ordine
            if ($request->hasFile('userfile') && $request->file('userfile')->isValid()) {
                $file = $request->file('userfile');
                $extension = $file->getClientOriginalExtension();
                $newFileName = $ordine->cliente->ragione_sociale . "_" . strtoupper($ordine->PazienteCognome) . "_" . strtoupper($ordine->PazienteNome) . "_{$ordine->IDordine}_FINALE.{$extension}";

                // Salva il file nella cartella storage/app/public/uploads
                $file->storeAs('uploads', $newFileName, 'public');

                $ordine->update([
                    'utente_modifica' => $utenteModifica,
                    'note_ulti_mod' => now(),
                    'file_fin' => 1,
                    'file_fin_nome' => $newFileName,
                ]);

                $fileCaricato = true;
            }

            // Se la richiesta contiene delle note interne, aggiorna l'ordine con le nuove informazioni
            if (!empty($request->note_int)) {
                $ordine->update([
                    'utente_modifica' => $utenteModifica,
                    'note_ulti_mod' => now(),
                    'note_int' => $request->note_int
                ]);

                $noteModificate = true;
            }

            if ($fileCaricato && $noteModificate) {
                $message = "File di lavorazione caricato e note modificate con successo!";
            } elseif ($fileCaricato) {
                $message = "File di lavorazione caricato con successo!";
            } else {
                $message = "Note modificate con successo!";
            }

            return redirect('/operatore/dashboard?tipo=inCorso')->with(['success' => $message]);

        } catch (ValidationException $e) {
            $errors = $e->validator->errors();

            return redirect()->back()->with(["error" => "Errore durante il caricamento della lavorazione", "validation_errors" => $errors])->withErrors($errors)->withInput();

        } catch (Exception $e) {
            $error = $e->getMessage();

            return redirect()->back()->with("error", $error)->withErrors($error)->withInput();
        }
    }
}
