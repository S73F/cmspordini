import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Tooltip,
} from "@mui/material";
import { usePasswordField } from "../../Hooks/Components/FormFields/usePasswordField";

/**
 * Campo input per la password con toggle per la visibilità.
 *
 * Usa un hook personalizzato per gestire lo stato di visibilità del testo.
 *
 * @component
 * @param {Object} props - Proprietà del componente.
 * @param {string} props.value - Valore corrente del campo password.
 * @param {function} props.onChange - Funzione chiamata al cambiamento del campo.
 * @param {string} [props.margin] - Margine del FormControl (es. 'none', 'dense', 'normal').
 * @param {...any} props - Altri props passati al componente OutlinedInput.
 * @returns {JSX.Element} Campo password con pulsante per mostrare/nascondere il contenuto.
 */
export const PasswordField = ({ value, onChange, margin, ...props }) => {
    const {
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
    } = usePasswordField(); // Custom hook per la gestione della visibilità della password

    return (
        <FormControl fullWidth variant="outlined" margin={margin}>
            <InputLabel htmlFor="outlined-adornment-password">
                Password
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={value}
                onChange={onChange}
                autoComplete="current-password"
                required
                endAdornment={
                    <InputAdornment position="end">
                        <Tooltip
                            title={
                                showPassword
                                    ? "Nascondi password"
                                    : "Mostra password"
                            }
                        >
                            <IconButton
                                aria-label={
                                    showPassword
                                        ? "Nascondi password"
                                        : "Mostra password"
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                }
                label="Password"
                {...props}
            />
        </FormControl>
    );
};
