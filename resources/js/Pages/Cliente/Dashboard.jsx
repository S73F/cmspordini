import React from "react";
import { Head, Link } from "@inertiajs/react";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { Button, Typography } from "@mui/material";
import { Content } from "../../Components/Content";
import { Messages } from "../../Components/Messages";

/**
 * Componente della Dashboard del Cliente.
 *
 * Mostra un messaggio di benvenuto personalizzato e un pulsante per creare un nuovo ordine.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Object} props.user - Oggetto che rappresenta l'utente, contenente informazioni come nome e cognome.
 * @returns {JSX.Element} La UI della dashboard del cliente con un messaggio di benvenuto e un link per creare un ordine.
 */
export default function Dashboard({ user }) {
    return (
        <>
            <Head>
                <title>Home - CMSPordini</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Home page della dashboard cliente."
                />
            </Head>

            <Content.Container>
                {/* Messaggio di benvenuto personalizzato in base ai dati dell'utente */}
                <Messages.Welcome user={user} />

                <Button
                    size="large"
                    component={Link}
                    href="/cliente/ordini/creazione"
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: "bold", px: 3, py: 1 }}
                >
                    Crea ordine
                </Button>
            </Content.Container>
        </>
    );
}

/**
 * Imposta il layout per la dashboard del cliente, utilizzando il layout specifico ClienteLayout.
 *
 * @param {JSX.Element} page - Il contenuto della pagina da inserire nel layout.
 * @returns {JSX.Element} La pagina avvolta dal layout ClienteLayout.
 */
Dashboard.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
