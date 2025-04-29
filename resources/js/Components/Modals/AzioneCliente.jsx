import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/modal.css";
import { Box, Button, Grid2, Stack, TextField } from "@mui/material";
import { Content } from "../Content";
import { formBtnStack, formBtnStyle } from "../../styles/formStyles";
import { useCliente } from "../../Hooks/Components/Modals/useCliente";
import { PasswordField } from "../FormFields/PasswordField";

/**
 * Componente modale per la gestione dei clienti.
 *
 * Permette la creazione o la modifica di un cliente attraverso un modulo interattivo.
 * I campi del modulo includono: ragione sociale, nome, cognome, partita IVA, indirizzo,
 * città, CAP, provincia, email, username e password.
 *
 * @component
 * @param {Object} props - Proprietà del componente.
 * @param {"creazione" | "modifica"} props.action - Determina se la modale viene usata per creare o modificare un cliente.
 * @param {Object} [props.cliente] - Dati del cliente da modificare (opzionale, usato solo in modalità modifica).
 *
 * @returns {JSX.Element} Modale con il modulo per la creazione o modifica di un cliente.
 */
export default function AzioneCliente({ action, cliente }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    // Hook per la logica di creazione o modifica del cliente
    const {
        data,
        processing,
        placeholderData,
        handleChange,
        handleCreateCliente,
        handleEditCliente,
        handleReset,
        closeModal,
    } = useCliente({ cliente, modalRef });

    return (
        <Modal ref={modalRef}>
            {/* Titolo della modale */}
            <Content.Layout
                title={
                    action === "creazione"
                        ? "Creazione cliente"
                        : action === "modifica"
                        ? "Modifica cliente"
                        : ""
                }
            />

            {/* Contenuto della modale */}
            <Box
                component="form"
                onSubmit={
                    action === "creazione"
                        ? handleCreateCliente
                        : action === "modifica"
                        ? handleEditCliente
                        : ""
                }
                encType="multipart/form-data"
            >
                <Grid2
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {/* Campo per la ragione sociale */}
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            label="Ragione sociale"
                            name="ragione_sociale"
                            variant="outlined"
                            value={data.ragione_sociale}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.ragione_sociale,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per il nome */}
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="nome"
                            variant="outlined"
                            value={data.nome}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.nome,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per il cognome */}
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Cognome"
                            name="cognome"
                            variant="outlined"
                            value={data.cognome}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.cognome,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per la partita IVA */}
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            label="Partita IVA"
                            name="partitaIVA"
                            variant="outlined"
                            value={data.partitaIVA}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.partitaIVA,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per l'indirizzo */}
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Indirizzo"
                            name="indirizzo"
                            variant="outlined"
                            value={data.indirizzo}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.indirizzo,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per la città */}
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Città"
                            name="citta"
                            variant="outlined"
                            value={data.citta}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.citta,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per il CAP */}
                    <Grid2 size={{ xs: 12, md: 2 }}>
                        <TextField
                            fullWidth
                            label="Cap"
                            name="cap"
                            variant="outlined"
                            value={data.cap}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.cap,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per la provincia */}
                    <Grid2 size={{ xs: 12, md: 2 }}>
                        <TextField
                            fullWidth
                            label="Provincia"
                            name="provincia"
                            variant="outlined"
                            value={data.provincia}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.provincia,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per l'email */}
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="emailcliente"
                            variant="outlined"
                            value={data.emailcliente}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.emailcliente,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per lo username */}
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            variant="outlined"
                            value={data.username}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.username,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>

                    {/* Campo per la password */}
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <PasswordField
                            value={data.password}
                            onChange={handleChange}
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.password,
                                required: false,
                            })}
                        />
                    </Grid2>
                </Grid2>

                {/* Stack per i pulsanti del modulo */}
                <Stack sx={formBtnStack}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={processing}
                        loading={processing}
                        sx={formBtnStyle}
                    >
                        {action === "creazione"
                            ? "Crea"
                            : action === "modifica"
                            ? "Modifica"
                            : ""}{" "}
                        cliente
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="reset"
                        onClick={handleReset}
                        sx={formBtnStyle}
                    >
                        Azzera campi
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={closeModal}
                        sx={formBtnStyle}
                    >
                        Chiudi
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
