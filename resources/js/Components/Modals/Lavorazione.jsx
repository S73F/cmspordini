import React, { useRef } from "react";
import { useLavorazione } from "../../Hooks/Components/Modals/useLavorazione";
import { Button, Typography } from "@mui/material";
import Tiptap from "../Tiptap";
import { ActionModal } from "./ActionModal";

/**
 * Componente per gestire la modale di modifica di una lavorazione.
 *
 * Permette all'utente di aggiungere note, caricare un file relativo alla lavorazione e inviare il tutto.
 *
 * @param {Object} ordine - Dati dell'ordine che si sta modificando.
 * @param {string} note_int - Note interne relative all'ordine che vengono visualizzate ed eventualmente modificate.
 * @returns {JSX.Element} La UI per la gestione delle modifiche alla lavorazione.
 */
const Lavorazione = ({ ordine, note_int }) => {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    // Hook per la gestione della logica di lavorazione
    const {
        fileName,
        handleFileChange,
        handleEditorContentSave,
        handleLavorazione,
        processing,
        closeModal,
    } = useLavorazione({ modalRef });

    return (
        <ActionModal.Wrapper modalRef={modalRef} title={"Modifica lavorazione"}>
            <form encType="multipart/form-data">
                {/* Titolo per la sezione delle note */}
                <ActionModal.SectionTitle>Note</ActionModal.SectionTitle>

                {/* Editor per la modifica delle note interne */}
                <Tiptap
                    onEditorContentSave={handleEditorContentSave} // Funzione per salvare il contenuto delle note
                    tipo="note_int" // Tipo di note (note interne)
                    htmlContent={note_int} // Contenuto iniziale delle note
                />

                {/* Pulsante per caricare un file relativo alla lavorazione */}
                <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    sx={{ textTransform: "none", mt: 3, mb: 3 }}
                >
                    Carica file lavorazione
                    <input
                        type="file"
                        hidden
                        name="userfile"
                        onChange={handleFileChange}
                    />
                </Button>

                {/* Se presente, mostra il nome del file selezionato */}
                {fileName && (
                    <Typography variant="body2" sx={{ mb: 3 }}>
                        File selezionato: {fileName}
                    </Typography>
                )}

                {/* Pulsanti di invio e chiusura */}
                <ActionModal.Buttons
                    action={(e) => handleLavorazione(e, ordine)}
                    closeModal={closeModal}
                    firstBtnText="Invia"
                    secondBtnText="Chiudi"
                    processing={processing}
                />
            </form>
        </ActionModal.Wrapper>
    );
};

export default Lavorazione;
