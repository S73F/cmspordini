import { useForm } from "@inertiajs/react";

/**
 * Hook personalizzato per la gestione del form dei clienti.
 *
 * Questo hook fornisce i dati del form, i placeholder, e le funzioni necessarie per
 * creare, modificare un cliente e resettare i campi, oltre a gestire la chiusura della modale.
 *
 * @param {Object} params - Parametri del hook.
 * @param {Object} [params.cliente] - Dati del cliente in caso di modifica.
 * @param {React.RefObject} params.modalRef - Riferimento alla modale per controllarne l'apertura/chiusura.
 * @returns {Object} Oggetto contenente i dati del form e le funzioni di gestione.
 */
export const useCliente = ({ cliente, modalRef }) => {
    // Inizializza il form con i dati del cliente
    const { data, setData, post, patch, processing } = useForm({
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
        ragione_sociale: cliente?.ragione_sociale || "",
        nome: cliente?.nome || "",
        cognome: cliente?.cognome || "",
        partitaIVA: cliente?.partitaIVA || "",
        indirizzo: cliente?.indirizzo || "",
        citta: cliente?.citta || "",
        cap: cliente?.cap || "",
        provincia: cliente?.provincia || "",
        emailcliente: cliente?.emailcliente || "",
        username: cliente?.username || "",
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
     * Invia il form per creare un nuovo cliente.
     *
     * @param {Event} e - Evento di submit del form.
     */
    const handleCreateCliente = (e) => {
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
     * Invia il form per aggiornare i dati del cliente.
     *
     * @param {Event} e - Evento del submit form.
     */
    const handleEditCliente = (e) => {
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
        placeholderData,
        processing,
        handleChange,
        handleCreateCliente,
        handleEditCliente,
        handleReset,
        closeModal,
    };
};
