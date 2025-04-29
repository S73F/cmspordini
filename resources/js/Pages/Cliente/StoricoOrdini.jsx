import React from "react";
import StoricoOrdiniTable from "../../Components/Tables/StoricoOrdiniTable";
import { useStoricoOrdini } from "../../Hooks/Cliente/useStoricoOrdini";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { MenuItem, Typography } from "@mui/material";
import { Content } from "../../Components/Content";
import { DataTable } from "../../Components/Tables/DataTable";
import { Messages } from "../../Components/Messages";
import { Head } from "@inertiajs/react";

/**
 * Componente per visualizzare lo storico degli ordini del cliente.
 *
 * Permette di filtrare gli ordini in base a un intervallo di tempo e visualizza una tabella
 * con i dati degli ordini.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Array} props.ordini - Array di ordini da visualizzare nella tabella.
 * @returns {JSX.Element} La UI per visualizzare lo storico ordini con il filtro temporale.
 */
export default function StoricoOrdini({ ordini }) {
    const { handleChange } = useStoricoOrdini(); // Custom hook per gestire il cambiamento del filtro temporale

    return (
        <>
            <Head>
                <title>Storico ordini - CMSPordini</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Pagina di storico degli ordini del cliente."
                />
            </Head>

            <Content.Container>
                <Content.Layout title={"Storico ordini"}>
                    {/* Selettore per filtrare gli ordini in base al lasso di tempo selezionato */}
                    <DataTable.Selector
                        inputLabel={"Lasso di tempo"}
                        handleChange={handleChange}
                    >
                        <MenuItem value={30}>30 giorni</MenuItem>
                        <MenuItem value={60}>60 giorni</MenuItem>
                        <MenuItem value={"tutto"}>Tutto</MenuItem>
                    </DataTable.Selector>
                </Content.Layout>

                {/* Mostra la tabella solo se ci sono ordini disponibili */}
                {ordini?.length > 0 && <StoricoOrdiniTable ordini={ordini} />}

                {/* Messaggio di fallback nel caso non ci siano ordini */}
                {ordini?.length === 0 && <Messages.Fallback item={"ordine"} />}
            </Content.Container>
        </>
    );
}

/**
 * Imposta il layout per lo storico ordini del cliente, utilizzando il layout specifico ClienteLayout.
 *
 * @param {JSX.Element} page - Il contenuto della pagina da inserire nel layout.
 * @returns {JSX.Element} La pagina avvolta dal layout ClienteLayout.
 */
StoricoOrdini.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
