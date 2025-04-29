import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Hook personalizzato per gestire il login.
 *
 * @returns {Object} Oggetto contenente lo stato del form e le funzioni per gestirlo.
 * @returns {Object} data - Stato del form contenente i dati di login.
 * @returns {boolean} processing - Indica se la richiesta è in elaborazione.
 * @returns {Function} handleChange - Gestisce il cambiamento nei campi di input.
 * @returns {Function} handleSubmit - Gestisce l'invio del form.
 */
export const useLogin = () => {
    const { flash } = usePage().props; // Ottiene i messaggi flash dalla risposta del server

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
            history.replaceState({}, document.title); // Rimuove il messaggio dalla cronologia per evitare la ricomparsa al refresh della pagina
        }

        if (flash?.error) {
            toast.error(flash.error);
            history.replaceState({}, document.title);
        }

        if (flash?.validation_errors) {
            // Se ci sono errori di validazione, li mostra come notifiche individuali
            Object.values(flash.validation_errors).forEach((errors) => {
                errors.forEach((error) => {
                    toast.error(error);
                });
            });
            history.replaceState({}, document.title);
        }
    }, [flash]);

    // Inizializza il form con il form helper di Inertia.js
    const { data, processing, setData, post } = useForm({
        username: "",
        password: "",
    });

    /**
     * Funzione per gestire il cambiamento dei campi del form.
     * @param {Event} e - Evento del change input.
     */
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    /**
     * Funzione per gestire l'invio del form.
     * @param {Event} e - Evento del submit form.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        !data.username && !data.password
            ? toast.error("I campi username e password sono obbligatori")
            : !data.username
            ? toast.error("Il campo username è obbligatorio")
            : !data.password
            ? toast.error("Il campo password è obbligatorio")
            : post("/login");
    };

    return { data, processing, handleChange, handleSubmit };
};
