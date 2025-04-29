import React from "react";
import Layout from "./Layout";

/**
 * Componente di layout per la pagina del cliente.
 *
 * Estende il layout principale (`Layout`) aggiungendo dei pulsanti specifici per il cliente.
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del layout.
 * @returns {JSX.Element} - Il layout del cliente con il menu laterale e i pulsanti di navigazione.
 */
export default function ClienteLayout({ children }) {
    /**
     * Renderizza il layout del cliente, includendo il menu laterale e la navbar modificati, e il contenuto.
     *
     * @returns {JSX.Element} - Il layout completo con navigazione e contenuti.
     */
    return (
        <Layout
            type={"cliente"} // Passa gli elementi del menu laterale di "cliente" al Layout predefinito
        >
            {/* Renderizza i componenti figli passati al ClienteLayout */}
            {children}
        </Layout>
    );
}
