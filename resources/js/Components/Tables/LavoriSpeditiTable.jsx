import React, { useMemo } from "react";
import { Content } from "../Content";
import { DataTable } from "./DataTable";
import {
    Allegati,
    mapOrders,
    MedicoAndRagioneSociale,
    TableColumn,
} from "../TableFields";

/**
 * Componente che visualizza la tabella dei lavori spediti.
 *
 * Gestisce la visualizzazione di vari dettagli sui lavori, come medico ordinante, paziente, data ordine, data spedizione, allegati e operatore.
 *
 * @param {Object[]} lavori - Lista dei lavori da visualizzare nella tabella. Ogni lavoro è un oggetto con informazioni come medico ordinante, paziente, data ordine, ecc.
 * @param {Function} handleFile - Funzione per gestire i file allegati.
 * @returns {JSX.Element} Una sezione che contiene la tabella dei lavori spediti.
 */
const LavoriSpeditiTable = ({ lavori, handleFile }) => {
    // Memoizzazione della cella, per evitare ricalcoli inutili
    const medicoAndRagioneSocialeCell = useMemo(
        () => (params) => MedicoAndRagioneSociale(params.row),
        []
    );

    const allegatiCell = useMemo(
        () => (params) => Allegati(params.row, "operatore", handleFile),
        [handleFile]
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
            TableColumn("data", "Data ordine", 140, 140),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                140,
                140
            ),
            TableColumn("data_spedizione", "Data spedizione", 140, 140),
            TableColumn("Operatore", "Operatore", 110, ""),
            TableColumn(
                "Allegati",
                "Allegati",
                110,
                "",
                allegatiCell,
                false,
                false
            ),
        ],
        []
    );

    // Memoizzazione della mappatura dei lavori, per evitare ricalcoli inutili
    const mappedLavori = useMemo(() => mapOrders(lavori), [lavori]);

    return (
        <>
            {/* Titolo della tabella */}
            <Content.Layout title={"Lavori spediti"} />
            {/* Tabella dei lavori spediti, passando le righe e le colonne */}
            <DataTable.Table rows={mappedLavori} columns={columns} />;
        </>
    );
};

export default LavoriSpeditiTable;
