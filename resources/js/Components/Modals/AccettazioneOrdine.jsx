import React, { useCallback, useRef } from "react";
import { ActionModal } from "./ActionModal";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import "../../../css/modal.css";

/**
 * Componente per la gestione della presa in carico di un ordine.
 * Mostra una modale di conferma che permette all'operatore di accettare un incarico.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {number} props.ordine - ID dell'ordine da prendere in carico.
 *
 * @returns {JSX.Element} La UI per la conferma della presa in carico di un ordine.
 */
export default function AccettazioneOrdine({ ordine }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    /**
     * Chiude la modale di conferma eliminazione in modo sicuro.
     */
    const closeModal = useCallback(() => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    }, [modalRef]);

    const { handleIncarico, loading } = useLavori(); // Funzione utilizzata per accettare l'incarico

    return (
        <ActionModal.Wrapper
            modalRef={modalRef}
            title={"Presa in carico ordine"}
        >
            <ActionModal.Message>
                Sei sicuro di voler prendere in carico l'ordine?
            </ActionModal.Message>

            <ActionModal.Reminder color="primary">
                Una volta accettato l'ordine, potrai comunque ripristinarlo.
            </ActionModal.Reminder>

            <ActionModal.Buttons
                action={() => handleIncarico(ordine, "forward", closeModal)}
                closeModal={closeModal}
                processing={loading}
            />
        </ActionModal.Wrapper>
    );
}
