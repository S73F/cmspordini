import { Paper, Typography } from "@mui/material";
import React from "react";
import { contentContainer } from "../styles/appStyles";

/**
 * Componente Layout che mostra un titolo e i contenuti passati come children.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {string} props.title - Il titolo da visualizzare nella parte superiore del layout.
 * @param {React.ReactNode} props.children - I contenuti da visualizzare sotto il titolo.
 * @returns {JSX.Element} Il layout con il titolo e i contenuti figli.
 */
const Layout = ({ title, children, marginBottom = 3 }) => {
    return (
        <>
            {/* Titolo principale del layout, con uno stile personalizzato */}
            <Typography
                component="h2"
                sx={{ mb: marginBottom, textAlign: "center", fontSize: 30 }}
            >
                {title}
            </Typography>

            {/* I contenuti figli vengono visualizzati qui */}
            {children}
        </>
    );
};

/**
 * Componente Container che avvolge i contenuti in un Paper con ombra e stile personalizzato.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I contenuti da visualizzare all'interno del Paper.
 * @returns {JSX.Element} Il Paper che avvolge i contenuti.
 */
const Container = ({ children }) => {
    return (
        <Paper elevation={5} sx={contentContainer}>
            {children}
        </Paper>
    );
};

// Esportazione dei componenti Layout e Container
export const Content = {
    Layout,
    Container,
};
