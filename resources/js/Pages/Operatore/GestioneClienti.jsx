import React from "react";
import GestioneClientiTable from "../../Components/Tables/GestioneClientiTable";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { Content } from "../../Components/Content";
import { Typography } from "@mui/material";
import { Head } from "@inertiajs/react";

/**
 * Pagina per la gestione dei clienti dell'operatore.
 * Mostra una lista di clienti attraverso una tabella, se presente nel database.
 * Visualizza un messaggio di fallback nel caso in cui non ci siano clienti.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Array} props.clienti - Lista dei clienti da visualizzare nella tabella.
 * @returns {JSX.Element} La UI per la gestione dei clienti.
 */
export default function GestioneClienti({ clienti }) {
    return (
        <>
            <Head>
                <title>Gestione clienti - CMSPordini</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Pagina di gestione dei clienti."
                />
            </Head>

            <Content.Container>
                <Content.Layout
                    title={"Gestione clienti"}
                    marginBottom={{ xs: 4, sm: 2 }}
                />

                {/* Mostra la tabella solo se sono presenti clienti nel database */}
                {clienti?.length > 0 && (
                    <GestioneClientiTable clienti={clienti} />
                )}

                {/* Messaggio di fallback nel caso non ci siano clienti */}
                {clienti?.length === 0 && (
                    <Typography
                        variant="h5"
                        component={"p"}
                        sx={{ mt: 4, textAlign: "center" }}
                    >
                        Nessun cliente trovato
                    </Typography>
                )}
            </Content.Container>
        </>
    );
}

/**
 * Imposta il layout specifico per la gestione clienti, utilizzando il layout OperatoreLayout.
 *
 * @param {JSX.Element} page - Il contenuto della pagina da inserire nel layout.
 * @returns {JSX.Element} La pagina avvolta dal layout OperatoreLayout.
 */
GestioneClienti.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
