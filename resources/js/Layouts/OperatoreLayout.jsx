import React from "react";
import Layout from "./Layout";

/**
 * Componente di layout per la pagina dell'operatore.
 *
 * Estende il layout principale (`Layout`) aggiungendo dei pulsanti specifici per l'operatore.
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del layout.
 * @returns {JSX.Element} - Il layout dell'operatore con il menu laterale e i pulsanti di navigazione.
 */
export default function OperatoreLayout({ children }) {
    /**
     * Renderizza il layout dell'operatore, includendo il menu laterale e la navbar modificati, e il contenuto.
     *
     * @returns {JSX.Element} - Il layout completo con navigazione e contenuti.
     */
    return (
        <Layout
            type={"operatore"} // Passa gli elementi del menu laterale di "operatore" al Layout predefinito
        >
            {children}
        </Layout>
    );
}
