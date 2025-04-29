import { router } from "@inertiajs/react";
import { useState } from "react";

/**
 * Hook personalizzato per l'eliminazione di un ordine.
 *
 * @param {Object} params - Parametri del hook.
 * @param {number|string} params.ordine - ID dell'ordine da eliminare.
 * @param {string} params.stato - Stato attuale dell'ordine.
 * @param {Object} params.modalRef - Riferimento alla modale per la conferma eliminazione.
 * @returns {Object} Oggetto con le funzioni per eliminare l'ordine e chiudere la modale.
 * @returns {Function} handleDelete - Funzione per eliminare l'ordine.
 * @returns {Function} closeModal - Funzione per chiudere la modale di conferma eliminazione.
 */
export const useEliminazioneOrdine = ({ ordine, stato, modalRef }) => {
    const [loading, setLoading] = useState(false);

    /**
     * Effettua una richiesta DELETE per eliminare un ordine.
     *
     * @param {Event} e - Evento del submit form.
     */
    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(`/operatore/lavori/eliminazione/${ordine}`, {
            only: ["lavori", "flash", "numLavoriNuovi"], // Aggiorna solo gli elementi necessari
            preserveScroll: true,
            preserveState: true,
            data: { stato: stato },

            onStart: () => setLoading(true),
            onSuccess: () => {
                closeModal();
            },
            onFinish: () => setLoading(false),
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    /**
     * Chiude la modale di conferma eliminazione in modo sicuro.
     */
    const closeModal = () => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    };

    return { handleDelete, closeModal, loading };
};
