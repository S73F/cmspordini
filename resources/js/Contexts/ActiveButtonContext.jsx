import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Context per la gestione del pulsante attivo nella navigazione.
 * Permette di condividere e aggiornare lo stato del pulsante attivo tra i componenti.
 */
const ActiveButtonContext = createContext();

/**
 * Hook personalizzato per accedere al contesto ActiveButtonContext.
 *
 * @returns {{ activeBtn: string, setActiveBtn: function }} Oggetto contenente il valore del pulsante attivo e la funzione per aggiornarlo.
 */
export const useActiveButton = () => useContext(ActiveButtonContext);

/**
 * Provider che avvolge l'applicazione, fornendo lo stato condiviso del pulsante attivo.
 *
 * Salva e ripristina il valore del pulsante attivo utilizzando il sessionStorage,
 * in modo da mantenerlo durante il ciclo di vita della sessione del browser.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli che avranno accesso al contesto.
 * @returns {JSX.Element} Il provider del contesto.
 */
export const ActiveButtonProvider = ({ children }) => {
    const [activeBtn, setActiveBtn] = useState("Home");

    // Al primo render, cerca il valore salvato in sessionStorage
    useEffect(() => {
        const stored = sessionStorage.getItem("activeBtn");
        if (stored) {
            setActiveBtn(stored);
        }
    }, []);

    // Ogni volta che cambia, salva su sessionStorage il pulsante attivo
    useEffect(() => {
        sessionStorage.setItem("activeBtn", activeBtn);
    }, [activeBtn]);

    return (
        <ActiveButtonContext.Provider value={{ activeBtn, setActiveBtn }}>
            {children}
        </ActiveButtonContext.Provider>
    );
};
