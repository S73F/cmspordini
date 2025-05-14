import { router } from "@inertiajs/react";
import { useState, useCallback } from "react";

/**
 * Hook personalizzato per la gestione della dashboard e dei lavori.
 *
 * @returns {Object} Oggetto contenente le funzioni e gli stati per gestire i lavori e il pulsante di caricamento.
 * @returns {Function} handleLavori - Funzione per gestire la visualizzazione dei lavori.
 * @returns {string|null} loadingButton - Stato che indica il tipo di lavoro in caricamento, o `null` se non c'è nessun lavoro in corso.
 */
export const useDashboard = () => {
    // Stato per tracciare quale lavoro è in fase di caricamento (utile per l'animazione del pulsante)
    const [loadingButton, setLoadingButton] = useState(null);

    /**
     * Gestisce la selezione del tipo di lavori da visualizzare nella dashboard.
     *
     * @param {string} tipoLavori - Tipo di lavoro da visualizzare (ad esempio "nuovi", "in corso", ecc.)
     */
    const handleLavori = useCallback((tipoLavori) => {
        router.get(
            `/operatore/dashboard`,
            { tipo: tipoLavori }, // Passa il tipo di lavori come query string alla pagina
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                only: ["tipo", "lavori"], // Ricarica solo i dati necessari
                onStart: () => {
                    setLoadingButton(tipoLavori);
                },
                onFinish: () => {
                    setLoadingButton(null);
                },
            }
        );
    }, []);

    return {
        handleLavori,
        loadingButton,
    };
};
