<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <title>Ordine #{{ $ordine->numero }}</title>

    <style>
        body {
            font-family: "Helvetica", sans-serif;
            font-size: 12px;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }

        header {
            width: 100%;
        }

        header img {
            height: 8%;
            float: left;
            margin-right: 2rem;
        }

        header #header-content {
            display: inline-block;
            font-size: 0.6rem;
            line-height: 0.85rem;
            float: left;
            vertical-align: top;
            margin-bottom: 2rem;
        }

        header #header-content * {
            margin: 0;
            padding: 0;
        }

        header #header-content h2 {
            margin-bottom: 0.4rem;
        }

        main {
            clear: both;
            word-wrap: break-word;

        }

        #lavorazione-title {
            text-align: center;
            font-size: 22px;
            color: #444;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 16px;
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-top: 20px;
        }

        p {
            margin: 5px 0;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .info-table th,
        .info-table td {
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: 1px solid #ddd;
        }

        .info-table th {
            background-color: #f4f4f4;
            font-weight: bold;
            color: #333;
        }

        .info-table td {
            background-color: #fff;
        }

        #note-container {
            background-color: #fdf8d3;
            border: 1px solid #f1e7a3;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
        }

        .last-modified {
            font-size: 11px;
            color: #666;
            margin-top: 10px;
        }

        #lavorazione-details .separator {
            height: 0.3rem;
        }
    </style>
</head>

<body>
    <header>
        <img src="{{ public_path('/assets/img/centromedicosanpietro-logo.svg') }}" alt="Logo CMSP">
        <div id="header-content">
            <h2>Gruppo C.M.S.P.</h2>
            <p>Dental Milling Center</p>
            <p>Via Circonvallazione 126 - 10072 Caselle T.se (TO)</p>
            <p>Tel e Fax 011 5678204</p>
            <p>Cod Fisc. 09775230015 - P. Iva 09775230015</p>
            <p>Codice Ministero Sanità ITCA 01029970</p>
        </div>
    </header>

    <main>
        <h1 id="lavorazione-title">Scheda di lavorazione: Ordine n° {{ $ordine->numero }}</h1>
        <p><strong>Data ordine:</strong> {{ $ordine->data }}</p>

        <table class="info-table">
            <tr>
                <th>Ordinante</th>
                <th>Paziente</th>
            </tr>
            <tr>
                <td class="ordinante">
                    <p>Prescrivente: <strong>{{ ucfirst($ordine->medicoOrdinante) }}</strong></p>
                    <p>Ragione Sociale: <strong>{{ $ordine->cliente->ragione_sociale }}</strong></p>
                    <p>Indirizzo: <strong>{{ $ordine->cliente->indirizzo }}, {{ $ordine->cliente->citta }} -
                            {{ $ordine->cliente->provincia }}</strong></p>
                </td>
                <td class="paziente">
                    <p>Nome: <strong>{{ ucfirst($ordine->PazienteNome) }}</strong></p>
                    <p>Cognome: <strong>{{ ucfirst($ordine->PazienteCognome) }}</strong></p>
                    <p>Indirizzo Spedizione: <strong>{{ $ordine->IndirizzoSpedizione }}</strong></p>
                </td>
            </tr>
        </table>

        <div id="lavorazione-details">
            <h3 class="section-title">Dettagli Lavorazione</h3>
            <p><strong>Lavorazione: </strong>{!! $ordine->lavorazione !!}</p>

            <div class="separator"></div>

            <p><strong>Colorazione:</strong>
            <p>{{ $ordine->colore }}</p>

            <div class="separator"></div>

            <p><strong>Piattaforma Impianti: </strong>
                {!! $ordine->piattaforma !!}</p>

            <div class="separator"></div>

            <p><strong>Data di Consegna:</strong>
            <p>{{ $ordine->data_cons }} alle {{ $ordine->ora_cons }}</p>
            </p>
        </div>

        @if($ordine->note)
            <h3 class="section-title">Note Cliente</h3>
            <div id="note-container">
                {!! $ordine->note !!}
            </div>
        @endif

        @if ($ordine->utente_modifica && $ordine->utente_modifica !== "-")
            <h3 class="section-title">Ultima Modifica</h3>
            <p class="last-modified">L'ultima modifica è stata effettuata da:
                <strong>{{ $ordine->utente_modifica }}</strong> il <strong>{{ $ordine->note_ulti_mod }}</strong>
            </p>
        @endif

        @if ($ordine->note_int)
            <h3 class="section-title">Note Interne</h3>
            <div id="note-container">
                <p class="note-int">{!! $ordine->note_int !!}</p>
            </div>
        @endif
    </main>
</body>

</html>