import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FormControl, InputLabel, Select } from "@mui/material";
import { dataTableStyle } from "../../styles/tableStyles";

/**
 * Componente Selector che rende una tendina con opzioni selezionabili.
 *
 * Permette all'utente di selezionare un'opzione e attiva una funzione di gestione quando la selezione cambia.
 *
 * @param {string} inputLabel - Etichetta da visualizzare per il campo Select
 * @param {function} handleChange - Funzione che gestisce i cambiamenti del valore selezionato
 * @param {ReactNode} children - Le opzioni da visualizzare all'interno del Select
 * @returns {JSX.Element} Una tendina con opzioni selezionabili
 */
const Selector = ({ inputLabel, handleChange, children }) => {
    return (
        <>
            <FormControl sx={{ width: "100%", mb: 4 }}>
                {/* InputLabel utilizzato per visualizzare l'etichetta sopra il campo Select */}
                <InputLabel id="input-label">{inputLabel}</InputLabel>

                {/* Select crea una lista a tendina con opzioni */}
                <Select
                    labelId="selector-label"
                    id="selector"
                    defaultValue="" // Valore iniziale vuoto
                    label={inputLabel}
                    onChange={handleChange} // Chiamata alla funzione handleChange quando cambia il valore selezionato
                    sx={{ textAlign: "left" }}
                >
                    {/* Qui vengono renderizzate le opzioni (children) */}
                    {children}
                </Select>
            </FormControl>
        </>
    );
};

const paginationModel = { page: 0, pageSize: 5 }; // Paginazione predefinita: parte da pagina 1, 5 righe per pagina

/**
 * Componente Table che renderizza il DataGrid (tabella) di MUI con le righe e le colonne fornite.
 *
 * @param {Array} rows - I dati da visualizzare nella tabella
 * @param {Array} columns - La definizione delle colonne della tabella
 * @returns {JSX.Element} La tabella avvolta in un componente Paper con paginazione e stile personalizzato
 */
const Table = ({ rows, columns }) => {
    return (
        <Paper elevation={5} sx={{ width: "100%", margin: "0 auto" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }} // Imposta la paginazione iniziale
                pageSizeOptions={[5, 10, 25, 50]} // Opzioni per il numero di righe visualizzabili
                columnHeaderHeight={70} // Altezza delle intestazioni delle colonne
                rowHeight={90} // Altezza delle righe
                sx={dataTableStyle}
            />
        </Paper>
    );
};

export const DataTable = { Selector, Table };
