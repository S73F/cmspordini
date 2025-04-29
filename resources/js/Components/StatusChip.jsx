import React from "react";
import { Circle } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { chipColors, chipStyle, circleStyles } from "../styles/tableStyles";

/**
 * Componente che visualizza un chip con un'icona di cerchio e un'etichetta personalizzata.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {string} props.label - Testo da visualizzare all'interno del chip.
 * @param {string} props.prop - Chiave per determinare lo stile del chip (es. "nuovo", "inCorso", "spedito").
 *
 * @returns {JSX.Element} Un chip con il label e l'icona corrispondente.
 */
export const StatusChip = ({ label, prop }) => (
    <Chip
        label={label}
        icon={<Circle sx={circleStyles[prop]} />}
        sx={{
            ...chipStyle,
            ...chipColors[prop],
        }}
    />
);
