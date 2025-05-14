import React from "react";
import { useDashboard } from "../../Hooks/Operatore/useDashboard";
import { LavoriTableContainer } from "../../Components/Tables/LavoriTableContainer";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { Content } from "../../Components/Content";
import { Badge, Button, Stack, Typography } from "@mui/material";
import {
    Loop as LoopIcon,
    NewReleases as NewReleasesIcon,
    Mail as MailIcon,
} from "@mui/icons-material";
import { buttonStyles, badgeStyle } from "../../styles/appStyles";
import { Messages } from "../../Components/Messages";
import { Head } from "@inertiajs/react";

/**
 * Componente per la dashboard dell'operatore.
 * Mostra una lista di lavori filtrati in base al tipo (nuovi, in corso, spediti).
 * Include pulsanti per cambiare il filtro e una tabella per visualizzare i lavori filtrati.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Object} props.user - Dati dell'utente, utilizzati per visualizzare un messaggio di benvenuto personalizzato.
 * @param {string} props.tipo - Tipo di lavori da visualizzare ("nuovi", "inCorso", "spediti").
 * @param {Array} props.lavori - Lista di lavori da visualizzare nella tabella.
 * @param {number} props.numLavoriNuovi - Numero di nuovi lavori da visualizzare nel badge.
 * @returns {JSX.Element} La UI della dashboard con la possibilità di filtrare i lavori.
 */
export default function Dashboard({ user, tipo, lavori, numLavoriNuovi }) {
    // Custom hook per gestire il cambio del tipo dei lavori e il loro stato di caricamento
    const { handleLavori, loadingButton } = useDashboard();

    return (
        <>
            <Head>
                <title>Home - Ordini CMSP</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Home page della dashboard operatore."
                />
            </Head>

            <Content.Container>
                {/* Messaggio di benvenuto personalizzato in base ai dati dell'utente */}
                <Messages.Welcome user={user} />

                {/* Stack di pulsanti per filtrare i lavori */}
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 2, md: 2, lg: 3 }}
                    justifyContent="center"
                >
                    {/* Pulsante con Badge per il numero di lavori nuovi */}
                    <Badge
                        badgeContent={numLavoriNuovi}
                        color="primary"
                        showZero={false} // Nasconde il badge se il numero è 0
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        max={99} // Limita il conteggio del badge a 99
                        sx={badgeStyle}
                    >
                        <Button
                            startIcon={<NewReleasesIcon />}
                            size="large"
                            onClick={() => handleLavori("nuovi")} // Cambia i lavori visualizzati in "nuovi"
                            variant="contained"
                            color="primary"
                            sx={buttonStyles}
                            loading={loadingButton === "nuovi"} // Mostra il pulsante in caricamento durante il fetching dei lavori nuovi
                            disabled={
                                tipo === "nuovi" && loadingButton === null
                            } // Disabilita il pulsante se il tipo di lavori è "nuovi" (dunque, se è già attivo)
                        >
                            Lavori nuovi
                        </Button>
                    </Badge>

                    <Button
                        startIcon={<LoopIcon />}
                        size="large"
                        onClick={() => handleLavori("inCorso")}
                        variant="contained"
                        color="primary"
                        sx={buttonStyles}
                        loading={loadingButton === "inCorso"}
                        disabled={tipo === "inCorso" && loadingButton === null}
                    >
                        Lavori in corso
                    </Button>
                    <Button
                        startIcon={<MailIcon />}
                        size="large"
                        onClick={() => handleLavori("spediti")}
                        variant="contained"
                        color="primary"
                        sx={buttonStyles}
                        loading={loadingButton === "spediti"}
                        disabled={tipo === "spediti" && loadingButton === null}
                    >
                        Lavori spediti
                    </Button>
                </Stack>

                {/* Contenitore per la tabella dei lavori filtrati */}
                <LavoriTableContainer lavori={lavori} tipoLavori={tipo} />
            </Content.Container>
        </>
    );
}

/**
 * Imposta il layout specifico per la dashboard dell'operatore, utilizzando il layout OperatoreLayout.
 *
 * @param {JSX.Element} page - Il contenuto della pagina da inserire nel layout.
 * @returns {JSX.Element} La pagina avvolta dal layout OperatoreLayout.
 */
Dashboard.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
