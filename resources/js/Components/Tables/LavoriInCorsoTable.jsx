import React, { useMemo } from "react";
import { Content } from "../Content";
import { DataTable } from "./DataTable";
import {
    Allegati,
    Azioni,
    DataInizioLavorazione,
    mapOrders,
    MedicoAndRagioneSociale,
    TableColumn,
} from "../TableFields";

/**
 * Componente che visualizza la tabella dei lavori in corso.
 *
 * Gestisce la visualizzazione di vari dettagli sui lavori, come medico ordinante, paziente, operatore, data di inizio lavorazione e allegati.
 *
 * @param {Object[]} lavori - Lista dei lavori da visualizzare nella tabella
 * @param {Function} handleFile - Funzione per la gestione dei file allegati
 * @param {Function} handleIncarico - Funzione per la gestione delle azioni sugli incarichi
 * @returns {JSX.Element} Una sezione che contiene la tabella dei lavori in corso
 */
const LavoriInCorsoTable = ({ lavori, handleFile, handleIncarico }) => {
    // Memoizzazione della cella, per evitare ricalcoli inutili
    const medicoAndRagioneSocialeCell = useMemo(
        () => (params) => MedicoAndRagioneSociale(params.row),
        []
    );

    const dataInizioLavorazioneCell = useMemo(
        () => (params) => DataInizioLavorazione(params.row)
    );

    const allegatiCell = useMemo(
        () => (params) => Allegati(params.row, "operatore", handleFile),
        [handleFile]
    );

    const azioniCell = useMemo(
        () => (params) => Azioni(params.row, "inCorso", handleIncarico),
        [handleIncarico]
    );

    // Definizione delle colonne della tabella
    const columns = useMemo(
        () => [
            TableColumn(
                "medicoOrdinante",
                "Medico ordinante",
                220,
                "",
                medicoAndRagioneSocialeCell
            ),
            TableColumn("Paziente", "Paziente", 170, ""),
            TableColumn("Operatore", "Operatore", 110, ""),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                170,
                "",
                dataInizioLavorazioneCell
            ),
            TableColumn("Allegati", "Allegati", 110, "", allegatiCell, false),
            TableColumn("Azioni", "Azioni", 140, "", azioniCell, false),
        ],
        []
    );

    // Memoizzazione della mappatura dei lavori, per evitare ricalcoli inutili
    const mappedLavori = useMemo(() => mapOrders(lavori), [lavori]);

    return (
        <>
            {/* Titolo della tabella */}
            <Content.Layout title={"Lavori in corso"} />

            {/* Tabella dei lavori in corso, passando le righe e le colonne */}
            <DataTable.Table rows={mappedLavori} columns={columns} />
        </>
    );
};

export default LavoriInCorsoTable;
