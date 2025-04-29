import React from "react";
import { useCreazioneOrdine } from "../../Hooks/Cliente/useCreazioneOrdine";
import Tiptap from "../../Components/Tiptap";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { Content } from "../../Components/Content";
import {
    Box,
    Button,
    Grid2,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {
    formBtnStack,
    formBtnStyle,
    formFileReminder,
} from "../../styles/formStyles";
import { Head } from "@inertiajs/react";

/**
 * Componente per la creazione di un nuovo ordine da parte di un cliente.
 *
 * Gestisce l'invio di un modulo con vari campi, tra cui informazioni sul paziente,
 * medico ordinante, dati sulla lavorazione e file allegati.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Object} [props.InputLabelProps={}] - Opzioni aggiuntive per le etichette di input.
 * @returns {JSX.Element} La UI per la creazione dell'ordine.
 */
export default function CreazioneOrdine({ InputLabelProps = {} }) {
    // Custom hook per gestire la creazione dell'ordine
    const {
        data,
        editorKey,
        fileName,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEditorContentSave,
        handleReset,
        processing,
    } = useCreazioneOrdine();

    return (
        <>
            <Head>
                <title>Creazione ordine - CMSPordini</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Pagina di creazione di un nuovo ordine per il cliente."
                />
            </Head>

            <Content.Container>
                <Content.Layout title={"Spedisci nuovo ordine"}>
                    <Box
                        component="form"
                        id="form-ordine"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                    >
                        <Grid2
                            container
                            rowSpacing={{ xs: 3, md: 4 }}
                            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Grid2 size={12}>
                                <TextField
                                    fullWidth
                                    label="Medico ordinante"
                                    name="medico_ordinante"
                                    variant="outlined"
                                    required
                                    value={data.medico_ordinante}
                                    onChange={handleChange}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Nome paziente"
                                    name="paziente_nome"
                                    variant="outlined"
                                    required
                                    value={data.paziente_nome}
                                    onChange={handleChange}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Cognome paziente"
                                    name="paziente_cognome"
                                    variant="outlined"
                                    required
                                    value={data.paziente_cognome}
                                    onChange={handleChange}
                                />
                            </Grid2>

                            <Grid2 size={12}>
                                <TextField
                                    fullWidth
                                    label="Indirizzo spedizione"
                                    name="indirizzo_spedizione"
                                    variant="outlined"
                                    required
                                    value={data.indirizzo_spedizione}
                                    onChange={handleChange}
                                />
                            </Grid2>

                            <Grid2 size={12}>
                                <Tiptap
                                    key={editorKey} // Assegna una key all'editor Tiptap, la quale, una volta cambiata, permette di rigenerare il componente (utile per il reset del form)
                                    onEditorContentSave={
                                        handleEditorContentSave
                                    }
                                    tipo={"lavorazione"}
                                    titolo={"Lavorazione"}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Colore"
                                    name="colore"
                                    variant="outlined"
                                    required
                                    value={data.colore}
                                    onChange={handleChange}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Data consegna"
                                    type="date"
                                    name="data_cons"
                                    required
                                    slotProps={{
                                        inputLabel: {
                                            ...InputLabelProps,
                                            shrink: true,
                                        },
                                    }}
                                    value={data.data_cons}
                                    onChange={handleChange}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Ora consegna"
                                    type="time"
                                    name="ora_cons"
                                    required
                                    slotProps={{
                                        inputLabel: {
                                            ...InputLabelProps,
                                            shrink: true,
                                        },
                                    }}
                                    value={data.ora_cons}
                                    onChange={handleChange}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Tiptap
                                    key={editorKey}
                                    onEditorContentSave={
                                        handleEditorContentSave
                                    }
                                    tipo={"piattaforma"}
                                    titolo={"Piattaforma impianti"}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Tiptap
                                    key={editorKey}
                                    onEditorContentSave={
                                        handleEditorContentSave
                                    }
                                    tipo={"note"}
                                    titolo={"Note"}
                                />
                            </Grid2>

                            <Grid2 size={12}>
                                <Box sx={formFileReminder}>
                                    <Typography
                                        mb={2}
                                        color="error"
                                        fontWeight={500}
                                    >
                                        Si ricorda che è ammesso un solo file
                                        per volta per prenotazione, qualora si
                                        debba inviare più di un file per lo
                                        stesso paziente dovrete provvedere a
                                        zippare tutti i file e le cartelle in un
                                        unico archivio compresso .ZIP
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        component="label"
                                        sx={{ textTransform: "none" }}
                                    >
                                        Carica file allegato
                                        <input
                                            type="file"
                                            hidden
                                            name="userfile"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                    {fileName && (
                                        <Typography mt={2}>
                                            File selezionato: {fileName}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid2>
                        </Grid2>

                        <Stack sx={formBtnStack}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={processing}
                                sx={formBtnStyle}
                            >
                                Invia ordine
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                type="reset"
                                onClick={handleReset}
                                sx={formBtnStyle}
                            >
                                Azzera
                            </Button>
                        </Stack>
                    </Box>
                </Content.Layout>
            </Content.Container>
        </>
    );
}

/**
 * Imposta il layout per la pagina CreazioneOrdine, utilizzando il layout specifico `ClienteLayout`.
 *
 * @param {JSX.Element} page - Il contenuto della pagina da inserire nel layout.
 * @returns {JSX.Element} La pagina avvolta dal layout ClienteLayout.
 */
CreazioneOrdine.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
