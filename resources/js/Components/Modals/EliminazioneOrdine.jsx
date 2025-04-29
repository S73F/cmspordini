import React, { useRef } from "react";
import { useEliminazioneOrdine } from "../../Hooks/Components/Modals/useEliminazioneOrdine";
import "../../../css/modal.css";
import { ActionModal } from "./ActionModal";

/**
 * Componente per la modale di eliminazione di un ordine.
 *
 * Gestisce la conferma dell'eliminazione di un ordine.
 * L'eliminazione è irreversibile.
 *
 * @param {Object} ordine - Dati dell'ordine che si vuole eliminare.
 * @param {string} stato - Stato dell'ordine (utile per logica di gestione).
 * @returns {JSX.Element} La UI per la conferma dell'eliminazione di un ordine.
 */
export default function EliminazioneOrdine({ ordine, stato }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    // Funzioni per la gestione dell'eliminazione e chiusura della modale
    const { handleDelete, closeModal, loading } = useEliminazioneOrdine({
        ordine,
        modalRef,
        stato,
    });

    return (
        <ActionModal.Wrapper modalRef={modalRef} title={"Eliminazione ordine"}>
            <ActionModal.Message>
                Sei sicuro di voler eliminare l'ordine?
            </ActionModal.Message>

            <ActionModal.Reminder>
                ATTENZIONE: l'eliminazione dell'ordine non è reversibile
            </ActionModal.Reminder>

            <ActionModal.Buttons
                action={handleDelete}
                closeModal={closeModal}
                firstBtnColor="error"
                processing={loading}
            />
        </ActionModal.Wrapper>
    );
}
