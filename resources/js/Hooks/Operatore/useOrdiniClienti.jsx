import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

/**
 * Hook personalizzato per gestire la visualizzazione degli ordini per un cliente.
 *
 * @returns {Object} Oggetto contenente la funzione per gestire il cambiamento del cliente selezionato.
 * @returns {Function} handleChange - Funzione per gestire il cambiamento del cliente selezionato.
 */
export const useOrdiniClienti = () => {
    const [clienteID, setClienteID] = useState(null); // Stato per memorizzare l'ID del cliente selezionato

    /**
     * Gestisce il cambiamento del cliente selezionato.
     *
     * @param {Event} e - Evento del campo di selezione del cliente.
     */
    const handleChange = (e) => {
        setClienteID(e.target.value);
    };

    useEffect(() => {
        if (clienteID) {
            router.visit(`/operatore/ordini-clienti/${clienteID}`, {
                only: ["ordini"],
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    }, [clienteID]);

    return { handleChange };
};
