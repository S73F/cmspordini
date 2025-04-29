import { useState } from "react";

/**
 * Hook personalizzato per gestire la visibilità del campo password.
 *
 * Fornisce lo stato booleano `showPassword` e le funzioni di gestione per toggle,
 * mouse down e mouse up sull'icona di visibilità.
 *
 * @returns {Object} Oggetto contenente lo stato e le funzioni di gestione.
 * @returns {boolean} return.showPassword - Indica se la password è visibile.
 * @returns {Function} return.handleClickShowPassword - Gestisce il toggle della visibilità.
 * @returns {Function} return.handleMouseDownPassword - Previene l'azione di default al mouse down.
 * @returns {Function} return.handleMouseUpPassword - Previene l'azione di default al mouse up.
 */
export const usePasswordField = () => {
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Gestisce il toggle della visibilità del campo password.
     */
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    /**
     * Previene il comportamento di default al mouse down sull'icona della password.
     *
     * @param {React.MouseEvent<HTMLButtonElement>} event - Evento del mouse.
     */
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    /**
     * Previene il comportamento di default al mouse up sull'icona della password.
     *
     * @param {React.MouseEvent<HTMLButtonElement>} event - Evento del mouse.
     */
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return {
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
    };
};
