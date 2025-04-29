import React from "react";
import { Box, Button } from "@mui/material";
import {
    navbarActiveBtnStyles,
    navbarButtonStyles,
} from "../../styles/appStyles";
import { Link } from "@inertiajs/react";
import {
    Home as HomeIcon,
    History as HistoryIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
} from "@mui/icons-material";

/**
 * Componente che renderizza il set di pulsanti della navbar di default:
 * "Home", "Logout" e eventuali pulsanti aggiuntivi passati come figli.
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {Function} props.handleLogout - Funzione chiamata al click su "Logout".
 * @param {string} props.activeBtn - Nome del pulsante attualmente attivo.
 * @param {Function} props.setActiveBtn - Funzione per aggiornare il pulsante attivo.
 * @param {React.ReactNode} props.children - Pulsanti aggiuntivi da visualizzare.
 * @returns {JSX.Element} Elemento React.
 */
export const DefaultNavbarButtons = ({
    handleLogout,
    activeBtn,
    setActiveBtn,
    children,
}) => {
    return (
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button
                component={Link}
                href="/"
                title="Home"
                onClick={() => setActiveBtn("Home")}
                sx={
                    activeBtn === "Home"
                        ? navbarActiveBtnStyles
                        : navbarButtonStyles
                }
            >
                <HomeIcon />
                Home
            </Button>

            {children}

            <Button
                onClick={handleLogout}
                title="Logout"
                sx={navbarButtonStyles}
            >
                <LogoutIcon />
                Logout
            </Button>
        </Box>
    );
};

/**
 * Pulsanti dedicati all'utente di tipo "cliente".
 * Visualizza i pulsanti "Home", "Storico" e "Logout".
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {Function} props.handleLogout - Funzione chiamata al click su "Logout".
 * @param {string} props.activeBtn - Nome del pulsante attualmente attivo.
 * @param {Function} props.setActiveBtn - Funzione per aggiornare il pulsante attivo.
 * @returns {JSX.Element} Elemento React.
 */
export const ClienteNavbarButtons = ({
    handleLogout,
    activeBtn,
    setActiveBtn,
}) => {
    return (
        <DefaultNavbarButtons
            handleLogout={handleLogout}
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
        >
            <>
                <Button
                    component={Link}
                    href="/cliente/ordini/storico"
                    title="Storico ordini"
                    onClick={() => setActiveBtn("Storico")}
                    sx={
                        activeBtn === "Storico"
                            ? navbarActiveBtnStyles
                            : navbarButtonStyles
                    }
                >
                    <HistoryIcon />
                    Storico
                </Button>
            </>
        </DefaultNavbarButtons>
    );
};

/**
 * Pulsanti dedicati all'utente di tipo "operatore".
 * Visualizza i pulsanti "Home", "Storico", "Clienti" e "Logout".
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {Function} props.handleLogout - Funzione chiamata al click su "Logout".
 * @param {string} props.activeBtn - Nome del pulsante attualmente attivo.
 * @param {Function} props.setActiveBtn - Funzione per aggiornare il pulsante attivo.
 * @returns {JSX.Element} Elemento React.
 */
export const OperatoreNavbarButtons = ({
    handleLogout,
    activeBtn,
    setActiveBtn,
}) => {
    return (
        <DefaultNavbarButtons
            handleLogout={handleLogout}
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
        >
            <>
                <Button
                    component={Link}
                    href="/operatore/ordini-clienti"
                    title="Storico ordini clienti"
                    onClick={() => setActiveBtn("Storico")}
                    sx={
                        activeBtn === "Storico"
                            ? navbarActiveBtnStyles
                            : navbarButtonStyles
                    }
                >
                    <HistoryIcon />
                    Storico
                </Button>
                <Button
                    component={Link}
                    href="/operatore/gestione-clienti"
                    title="Gestione clienti"
                    onClick={() => setActiveBtn("Gestione clienti")}
                    sx={
                        activeBtn === "Gestione clienti"
                            ? navbarActiveBtnStyles
                            : navbarButtonStyles
                    }
                >
                    <PersonIcon />
                    Clienti
                </Button>
            </>
        </DefaultNavbarButtons>
    );
};
