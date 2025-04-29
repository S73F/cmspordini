import React, { useMemo } from "react";
import { DataTable } from "./DataTable";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import {
    Allegati,
    mapOrders,
    MedicoAndRagioneSociale,
    StatoLavoro,
    TableColumn,
} from "../TableFields";

/**
 * Componente che visualizza una tabella con gli ordini del cliente.
 *
 * Mostra le informazioni relative agli ordini, come il medico ordinante,
 * lo stato del lavoro, le date e gli allegati.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {Array} props.ordini - Gli ordini da visualizzare nella tabella.
 * @returns {JSX.Element} - Una tabella con le informazioni degli ordini.
 */
export default function OrdiniClienteTable({ ordini }) {
    const { handleFile } = useLavori(); // Hook personalizzato per gestire i download dei file

    // Memoizzazione della cella, per evitare ricalcoli inutili
    const medicoAndRagioneSocialeCell = useMemo(
        () => (params) => MedicoAndRagioneSociale(params.row),
        []
    );

    const statoLavoroCell = useMemo(
        () => (params) => StatoLavoro(params.row),
        []
    );

    const allegatiCell = useMemo(
        () => (params) => Allegati(params.row, "operatore", handleFile),
        [handleFile]
    );

    // Definisce le colonne della tabella
    const columns = useMemo(
        () => [
            TableColumn(
                "medicoOrdinante",
                "Medico ordinante",
                220,
                "",
                medicoAndRagioneSocialeCell
            ),
            TableColumn("Paziente", "Paziente", 170),
            TableColumn("stato", "Stato lavoro", 130, "", statoLavoroCell),
            TableColumn("data", "Data ordine", 100),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                100
            ),
            TableColumn("data_spedizione", "Data spedizione", 100),
            TableColumn("Operatore", "Operatore", 100),
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

    // Memoizzazione della mappatura degli ordini, per evitare ricalcoli inutili
    const mappedOrders = useMemo(() => mapOrders(ordini), [ordini]);

    // Renderizza la tabella con le righe e le colonne definite
    return <DataTable.Table rows={mappedOrders} columns={columns} />;
}
