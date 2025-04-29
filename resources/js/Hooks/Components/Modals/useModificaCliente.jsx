import { useForm } from "@inertiajs/react";

/**
 * Hook personalizzato per la modifica di un cliente.
 *
 * @param {Object} params - Parametri del hook.
 * @param {Object} params.cliente - Dati del cliente da modificare.
 * @param {Object} params.modalRef - Riferimento alla modale di modifica cliente.
 * @returns {Object} Oggetto con le funzioni per gestire la modifica del cliente e lo stato.
 * @returns {Object} data - I dati del form.
 * @returns {Function} handleChange - Funzione per gestire il cambiamento dei campi del form.
 * @returns {Function} handleSubmit - Funzione per inviare il form e aggiornare i dati del cliente.
 * @returns {Function} handleDelete - Funzione per resettare i dati del form.
 * @returns {Function} closeModal - Funzione per chiudere la modale di modifica cliente.
 * @returns {boolean} processing - Stato che indica se il form è in fase di elaborazione.
 * @returns {Object} placeholderData - Dati placeholder per il cliente, usati per precompilare il form.
 */
export const useModificaCliente = ({ cliente, modalRef }) => {
    // Inizializza il form con i dati del cliente
    const { data, setData, patch, processing } = useForm({
        ragione_sociale: "",
        nome: "",
        cognome: "",
        partitaIVA: "",
        indirizzo: "",
        citta: "",
        cap: "",
        provincia: "",
        emailcliente: "",
        username: "",
        password: "",
    });

    // Placeholder per i campi del form, utile nella UI per indicare i valori preesistenti
    const placeholderData = {
        ragione_sociale: cliente.ragione_sociale || "",
        nome: cliente.nome || "",
        cognome: cliente.cognome || "",
        partitaIVA: cliente.partitaIVA || "",
        indirizzo: cliente.indirizzo || "",
        citta: cliente.citta || "",
        cap: cliente.cap || "",
        provincia: cliente.provincia || "",
        emailcliente: cliente.emailcliente || "",
        username: cliente.username || "",
        password: "*************", // Indica che la password esiste ma non è visibile, per motivi di privacy
    };

    /**
     * Gestisce il cambiamento dei campi del form.
     *
     * @param {Event} e - Evento dell'input.
     */
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    /**
     * Invia il form per aggiornare i dati del cliente.
     *
     * @param {Event} e - Evento del submit form.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/operatore/gestione-clienti/modifica/${cliente.IDcliente}`, {
            only: ["clienti", "flash"], // Aggiorna solo i dati necessari
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => closeModal(),
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    /**
     * Resetta i dati del form ai valori iniziali.
     */
    const handleReset = () => {
        setData({
            ragione_sociale: "",
            nome: "",
            cognome: "",
            partitaIVA: "",
            indirizzo: "",
            citta: "",
            cap: "",
            provincia: "",
            emailcliente: "",
            username: "",
            password: "",
        });
    };

    /**
     * Funzione per chiudere la modale di modifica cliente.
     */
    const closeModal = () => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    };

    return {
        data,
        processing,
        placeholderData,
        handleChange,
        handleSubmit,
        handleReset,
        closeModal,
    };
};
