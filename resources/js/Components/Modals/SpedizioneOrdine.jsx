import React, { useCallback, useRef } from "react";
import { ActionModal } from "./ActionModal";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";

/**
 * Componente per la conferma della spedizione di un ordine.
 * Mostra una modale di conferma che permette all'operatore di spedire l'ordine, rendendo irreversibile l'operazione.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {number} props.ordine - ID dell'ordine da spedire.
 *
 * @returns {JSX.Element} La UI per confermare la spedizione di un ordine.
 */
export default function EliminazioneOrdine({ ordine }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    /**
     * Chiude la modale di conferma eliminazione in modo sicuro.
     */
    const closeModal = useCallback(() => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    }, [modalRef]);

    const { handleIncarico, loading } = useLavori(); // Funzione utilizzata per spedire l'incarico

    return (
        <ActionModal.Wrapper modalRef={modalRef} title={"Spedizione ordine"}>
            <ActionModal.Message>
                Sei sicuro di voler spedire la lavorazione?
            </ActionModal.Message>

            <ActionModal.Reminder>
                ATTENZIONE: una volta spedito, l'ordine non potrà più essere
                ritirato
            </ActionModal.Reminder>

            <ActionModal.Buttons
                action={() =>
                    handleIncarico(ordine, "forward", closeModal, [
                        "lavori",
                        "flash",
                    ])
                }
                closeModal={closeModal}
                processing={loading}
            />
        </ActionModal.Wrapper>
    );
}
