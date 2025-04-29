import React from "react";
import LavoriNuoviTable from "./LavoriNuoviTable";
import LavoriInCorsoTable from "./LavoriInCorsoTable";
import LavoriSpeditiTable from "./LavoriSpeditiTable";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import { Box, Typography } from "@mui/material";
import { Messages } from "../Messages";

/**
 * Componente che gestisce il contenitore delle tabelle dei lavori.
 *
 * Mostra una delle tre tabelle (nuovi, in corso, spediti) in base al tipo passato tramite la prop `tipoLavori`.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {string} props.tipoLavori - Il tipo di lavori da visualizzare ("nuovi", "inCorso", "spediti").
 * @param {Array} props.lavori - La lista dei lavori da visualizzare nella tabella.
 * @returns {JSX.Element} - Un componente che renderizza la tabella dei lavori in base al tipo passato.
 */
export const LavoriTableContainer = ({ tipoLavori, lavori }) => {
    const { handleFile, handleIncarico } = useLavori(); // Hook personalizzato per gestire i file e l'incarico

    // Se non ci sono lavori, mostra un messaggio che indica che non ci sono lavori trovati
    if (lavori?.length === 0) {
        if (tipoLavori === "nuovi")
            return <Messages.Fallback item={"lavoro nuovo"} marginTop={7} />;
        if (tipoLavori === "inCorso")
            return <Messages.Fallback item={"lavoro in corso"} marginTop={7} />;
        if (tipoLavori === "spediti")
            return <Messages.Fallback item={"lavoro spedito"} marginTop={7} />;
    } else {
        return (
            // Contenitore della tabella
            <Box mt={8} sx={{ width: "100%" }}>
                {/* Renderizza la tabella dei lavori in base al tipo */}
                {tipoLavori === "nuovi" && (
                    <LavoriNuoviTable
                        lavori={lavori}
                        handleFile={handleFile}
                        handleIncarico={handleIncarico}
                    />
                )}

                {tipoLavori === "inCorso" && (
                    <LavoriInCorsoTable
                        lavori={lavori}
                        handleFile={handleFile}
                        handleIncarico={handleIncarico}
                    />
                )}

                {tipoLavori === "spediti" && (
                    <LavoriSpeditiTable
                        lavori={lavori}
                        handleFile={handleFile}
                    />
                )}
            </Box>
        );
    }
};
