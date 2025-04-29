import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

/**
 * Hook personalizzato per gestire la tabella dello storico ordini.
 *
 * @returns {Object} Oggetto contenente lo stato del filtro e la funzione per aggiornarlo.
 * @returns {string|null} tempo - Valore selezionato per il filtro temporale.
 * @returns {Function} handleChange - Funzione per aggiornare il valore del filtro temporale.
 */
export const useStoricoOrdini = () => {
    const [tempo, setTempo] = useState(null);

    /**
     * Funzione per aggiornare il lasso di tempo quando cambia il valore selezionato.
     *
     * @param {Event} e - Evento del change input.
     */
    const handleChange = (e) => {
        setTempo(e.target.value);
    };

    useEffect(() => {
        if (tempo) {
            router.visit(`/cliente/ordini/storico/${tempo}`, {
                only: ["ordini"], // Ricarica solo la parte relativa agli ordini, ottimizzando la richiesta
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    }, [tempo]);

    return { tempo, handleChange };
};
