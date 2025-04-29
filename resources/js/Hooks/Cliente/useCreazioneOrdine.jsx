import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * Hook personalizzato per la gestione della creazione di un ordine.
 *
 * @returns {Object} Oggetto contenente lo stato del form e le funzioni per gestirlo.
 * @returns {Object} data - Stato del form contenente i dati dell'ordine.
 * @returns {Function} setData - Funzione per aggiornare i dati del form.
 * @returns {number} editorKey - Chiave dell'editor di testo Tiptap per forzarne il reset.
 * @returns {string} fileName - Nome del file caricato.
 * @returns {Function} handleChange - Gestisce il cambiamento nei campi di input.
 * @returns {Function} handleFileChange - Gestisce il caricamento di un file.
 * @returns {Function} handleSubmit - Gestisce l'invio del form.
 * @returns {Function} handleEditorContentSave - Salva il contenuto dell'editor nel form.
 * @returns {Function} handleReset - Resetta il form e forza il reset dell'editor.
 * @returns {boolean} processing - Indica se la richiesta è in elaborazione.
 */
export const useCreazioneOrdine = () => {
    const [editorKey, setEditorKey] = useState(0); // Stato della chiave dell'editor di testo Tiptap (utile per forzarne il reset)

    const [fileName, setFileName] = useState("");

    // Inizializza il form con i campi dell'ordine
    const { data, setData, post, processing } = useForm({
        medico_ordinante: "",
        paziente_nome: "",
        paziente_cognome: "",
        indirizzo_spedizione: "",
        lavorazione: "",
        colore: "",
        data_cons: "",
        ora_cons: "",
        piattaforma: "",
        note: "",
        userfile: null,
    });

    /**
     * Funzione per gestire il cambiamento nei campi di input del form.
     * @param {Event} e - Evento del change input.
     */
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    /**
     * Funzione che gestisce il cambiamento del file selezionato.
     * @param {Event} e - Evento del change input file.
     */
    const handleFileChange = (e) => {
        const file = e.target.files[0] || null;
        setFileName(file ? file.name : null);
        setData("userfile", file);
    };

    /**
     * Funzione per la gestione dell'invio del form.
     * @param {Event} e - Evento del submit form.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (fileName) {
            post("/cliente/ordini/creazione", {
                preserveScroll: true,
                forceFormData: true,
            });
        } else {
            toast.error("Il caricamento del file allegato è obbligatorio");
        }
    };

    /**
     * Funzione per salvare il contenuto dell'editor.
     * @param {string} tipo - Tipo di dato da salvare.
     * @param {string} html - Contenuto HTML da salvare.
     */
    const handleEditorContentSave = (tipo, html) => {
        setData(tipo, html);
    };

    /**
     * Funzione per resettare il form.
     */
    const handleReset = () => {
        setData({
            medico_ordinante: "",
            paziente_nome: "",
            paziente_cognome: "",
            indirizzo_spedizione: "",
            colore: "",
            data_cons: "",
            ora_cons: "",
            userfile: null,
        });

        // Incrementa la chiave dell'editor per forzarne il reset
        setEditorKey((prevKey) => prevKey + 1);
    };

    return {
        data,
        setData,
        editorKey,
        fileName,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEditorContentSave,
        handleReset,
        processing,
    };
};
