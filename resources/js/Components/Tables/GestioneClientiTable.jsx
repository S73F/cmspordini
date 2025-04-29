import React, { useMemo } from "react";
import { Button, Link, Typography } from "@mui/material";
import { DataTable } from "./DataTable";
import { ModalLink } from "@inertiaui/modal-react";
import { AddBox as AddBoxIcon } from "@mui/icons-material";
import {
    AzioniCliente,
    EmailCliente,
    mapClienti,
    RagioneSociale,
    TableColumn,
} from "../TableFields";
import { creazioneClienteBtn } from "../../styles/appStyles";

/**
 * Componente che gestisce la visualizzazione e l'interazione con la tabella dei clienti.
 *
 * Mostra una lista di clienti con la possibilità di aggiungerne di nuovi,
 * modificare quelli già esistenti oppure eliminarli.
 *
 * @param {Array} clienti - Lista dei clienti da visualizzare nella tabella
 * @returns {JSX.Element} Una sezione che contiene la tabella dei clienti e un pulsante per aggiungere un nuovo cliente
 */
export default function GestioneClientiTable({ clienti }) {
    // Memoizzazione della cella, per evitare ricalcoli inutili
    const ragioneSocialeCell = useMemo(
        () => (params) => RagioneSociale(params.row),
        []
    );

    const emailClienteCell = useMemo(
        () => (params) => EmailCliente(params.row),
        []
    );

    const azioniClienteCell = useMemo(
        () => (params) => AzioniCliente(params.row),
        []
    );

    // Definizione delle colonne della tabella
    const columns = useMemo(
        () => [
            TableColumn(
                "ragione_sociale",
                "Ragione sociale",
                180,
                "",
                ragioneSocialeCell
            ),
            TableColumn("Nome", "Nome", 100),
            TableColumn("Cognome", "Cognome", 100),
            TableColumn("emailcliente", "Email", 250, "", emailClienteCell),
            TableColumn("Username", "Username", 100),
            TableColumn("Azioni", "Azioni", 100, "", azioniClienteCell),
        ],
        []
    );

    // Memoizzazione della mappatura dei clienti, per evitare ricalcoli inutili
    const mappedClienti = useMemo(() => mapClienti(clienti), [clienti]);

    return (
        <>
            {/* Link per aprire la modale di creazione cliente */}
            <Button
                component={ModalLink}
                href="/operatore/gestione-clienti/creazione"
                title="Crea cliente"
                variant="contained"
                color="primary"
                startIcon={<AddBoxIcon />}
                sx={creazioneClienteBtn}
            >
                CREA CLIENTE
            </Button>

            {/* Tabella dei clienti con i dati passati */}
            <DataTable.Table rows={mappedClienti} columns={columns} />
        </>
    );
}
