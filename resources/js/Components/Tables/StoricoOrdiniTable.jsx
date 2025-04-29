import React, { useMemo } from "react";
import { DataTable } from "./DataTable";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import { Allegati, mapOrders, StatoLavoro, TableColumn } from "../TableFields";

/**
 * Componente che visualizza la tabella dello storico degli ordini.
 *
 * Mostra informazioni relative agli ordini effettuato, come la data dell'ordine,
 * il medico richiedente, il paziente, lo stato del lavoro, e gli allegati.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {Array} props.ordini - Gli ordini da visualizzare nella tabella.
 * @returns {JSX.Element} Una tabella con le informazioni dello storico ordini.
 */
export default function StoricoOrdiniTable({ ordini }) {
    const { handleFile } = useLavori(); // Hook personalizzato per gestire i file

    // Memoizzazione della cella, per evitare ricalcoli inutili
    const statoLavoroCell = useMemo(
        () => (params) => StatoLavoro(params.row),
        []
    );

    const allegatiCell = useMemo(
        () => (params) => Allegati(params.row, "cliente", handleFile),
        [handleFile]
    );

    // Definizione delle colonne della tabella
    const columns = useMemo(
        () => [
            TableColumn("data", "Data ordine", 100),
            TableColumn("medicoOrdinante", "Richiedente", 100),
            TableColumn("Paziente", "Paziente", 100),
            TableColumn("stato", "Stato lavoro", 130, "", statoLavoroCell),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                100
            ),
            TableColumn("data_spedizione", "Data spedizione", 100),
            TableColumn("IndirizzoSpedizione", "Indirizzo spedizione", 100),
            TableColumn("Allegati", "Allegati", 110, "", allegatiCell, false),
        ],
        []
    );

    // Memoizzazione della mappatura degli ordini, per evitare ricalcoli inutili
    const mappedOrders = useMemo(() => mapOrders(ordini), [ordini]);

    // Renderizza la tabella con le righe e le colonne definite
    return <DataTable.Table rows={mappedOrders} columns={columns} />;
}
