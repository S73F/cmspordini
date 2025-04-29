import React, { useCallback, useRef } from "react";
import { ActionModal } from "./ActionModal";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";

/**
 * Componente per la gestione del ripristino di un ordine.
 * Mostra una modale di conferma che permette all'operatore di annullare un incarico e ripristinare l'ordine allo stato iniziale.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {number} props.ordine - ID dell'ordine da ripristinare.
 *
 * @returns {JSX.Element} La UI per confermare il ripristino di un ordine.
 */
export default function ResetOrdine({ ordine }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    /**
     * Chiude la modale di conferma eliminazione in modo sicuro.
     */
    const closeModal = useCallback(() => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    }, [modalRef]);

    const { handleIncarico, loading } = useLavori(); // Funzione utilizzata per ripristinare l'incarico

    return (
        <ActionModal.Wrapper modalRef={modalRef} title={"Ripristino ordine"}>
            <ActionModal.Message>
                Sei sicuro di voler annullare l'incarico?
            </ActionModal.Message>

            <ActionModal.Reminder>
                ATTENZIONE: l'ordine verrà totalmente ripristinato e tutte le
                modifiche ad esso effettuate andranno perse
            </ActionModal.Reminder>

            <ActionModal.Buttons
                action={() => handleIncarico(ordine, "back", closeModal)}
                closeModal={closeModal}
                firstBtnColor="error"
                processing={loading}
            />
        </ActionModal.Wrapper>
    );
}
