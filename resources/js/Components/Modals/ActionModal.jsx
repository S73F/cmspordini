import { Modal } from "@inertiaui/modal-react";
import React from "react";
import { Content } from "../Content";
import { Box, Button, Stack, Typography } from "@mui/material";
import { formBtnStyle } from "../../styles/formStyles";

/**
 * Componente wrapper per una modale d'azione.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {React.RefObject} props.modalRef - Riferimento alla modale per la gestione dell'apertura e chiusura.
 * @param {string} props.title - Titolo della modale.
 * @param {React.ReactNode} props.children - Contenuto della modale.
 *
 * @returns {JSX.Element} Il componente modale con titolo e contenuto.
 */
const Wrapper = ({ modalRef, title, children }) => {
    return (
        <Modal ref={modalRef}>
            <Content.Layout title={title} />

            <Box sx={{ textAlign: "center" }}>{children}</Box>
        </Modal>
    );
};

/**
 * Componente per visualizzare un titolo di sezione all'interno della modale.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {React.ReactNode} props.children - Testo del titolo della sezione.
 *
 * @returns {JSX.Element} Il contenitore del titolo della sezione.
 */
const SectionTitle = ({ children }) => {
    return (
        <Typography variant="h6" sx={{ mb: 2 }}>
            {children}
        </Typography>
    );
};

/**
 * Componente per visualizzare un messaggio all'interno della modale.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {React.ReactNode} props.children - Contenuto del messaggio.
 *
 * @returns {JSX.Element} Il contenitore del messaggio.
 */
const Message = ({ children }) => {
    return <Typography sx={{ mb: 1 }}>{children}</Typography>;
};

/**
 * Componente per visualizzare un messaggio di avviso o promemoria con un colore personalizzato.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {React.ReactNode} props.children - Contenuto del messaggio di avviso.
 * @param {string} [props.color="error"] - Colore del testo (default: "error").
 *
 * @returns {JSX.Element} Il messaggio evidenziato con il colore specificato.
 */
const Reminder = ({ children, color = "error" }) => {
    return (
        <Typography color={color} fontWeight="500" mb={3}>
            {children}
        </Typography>
    );
};

/**
 * Componente per i pulsanti di azione all'interno della modale.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Function} props.action - Funzione da eseguire quando l'utente conferma l'azione (cliccando il primo pulsante).
 * @param {Function} props.closeModal - Funzione per chiudere la modale (cliccando il secondo pulsante).
 * @param {string} [props.firstBtnColor="primary"] - Colore del primo pulsante (default: "primary").
 * @param {string} [props.secondBtnColor="secondary"] - Colore del secondo pulsante (default: "secondary").
 * @param {string} [props.firstBtnText="Si"] - Testo del primo pulsante (default: "Si").
 * @param {string} [props.secondBtnText="No"] - Testo del secondo pulsante (default: "No").
 * @param {boolean} [props.processing=false] - Se fornito, disabilita il pulsante di conferma per evitare azioni ripetute.
 *
 * @returns {JSX.Element} Un set di due pulsanti: uno per confermare e uno per annullare l'azione.
 */
const Buttons = ({
    action,
    closeModal,
    firstBtnColor = "primary",
    secondBtnColor = "secondary",
    firstBtnText = "Si",
    secondBtnText = "No",
    processing = false,
}) => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, md: 3 }}
            justifyContent="center"
        >
            <Button
                variant="contained"
                color={firstBtnColor}
                onClick={action}
                sx={formBtnStyle}
                loading={processing}
                disabled={processing}
            >
                {firstBtnText}
            </Button>
            <Button
                variant="outlined"
                color={secondBtnColor}
                onClick={closeModal}
                sx={formBtnStyle}
                disabled={processing}
            >
                {secondBtnText}
            </Button>
        </Stack>
    );
};

/**
 * Oggetto che raccoglie i componenti della modale d'azione.
 */
export const ActionModal = {
    Wrapper,
    SectionTitle,
    Message,
    Reminder,
    Buttons,
};
