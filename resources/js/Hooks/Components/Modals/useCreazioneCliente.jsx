import { useForm } from "@inertiajs/react";

/**
 * Hook personalizzato per la creazione di un cliente.
 *
 * @param {Object} params - Parametri del hook.
 * @param {Object} params.modalRef - Riferimento alla modale di creazione cliente.
 * @returns {Object} Oggetto con funzioni per gestire il form del cliente.
 * @returns {Object} data - Stato del form contenente i dati del cliente.
 * @returns {boolean} processing - Indica se la richiesta è in elaborazione.
 * @returns {Function} handleChange - Gestisce il cambiamento dei campi del form.
 * @returns {Function} handleSubmit - Invia il form per creare un nuovo cliente.
 * @returns {Function} handleDelete - Resetta i dati del form.
 * @returns {Function} closeModal - Chiude la modale di creazione cliente.
 */
export const useCreazioneCliente = ({ modalRef }) => {
    const { data, setData, post, processing } = useForm({
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

    /**
     * Gestisce il cambiamento dei campi di input aggiornando lo stato del form.
     *
     * @param {Event} e - Evento di input change.
     */
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    /**
     * Invia il form per creare un nuovo cliente.
     *
     * @param {Event} e - Evento di submit del form.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/operatore/gestione-clienti/creazione", {
            only: ["clienti", "flash"], // Ricarica solo i dati relativi ai clienti e ai messaggi flash
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => closeModal(),
            onError: () => {
                console.log("Errore nella creazione del cliente");
            },
        });
    };

    /**
     * Resetta i dati del form, riportandolo allo stato iniziale.
     */
    const handleDelete = () => {
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
     * Chiude la modale di creazione cliente.
     */
    const closeModal = () => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    };

    return {
        data,
        processing,
        handleChange,
        handleSubmit,
        handleDelete,
        closeModal,
    };
};
