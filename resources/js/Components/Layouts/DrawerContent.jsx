import React from "react";
import { Link } from "@inertiajs/react";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { Home as HomeIcon, Logout as LogoutIcon } from "@mui/icons-material";
import {
    History as HistoryIcon,
    Person as PersonIcon,
} from "@mui/icons-material";

import { mobileActiveBtnStyles } from "../../styles/appStyles";

/**
 * Componente che rappresenta il contenuto del drawer (menu mobile) predefinito.
 * Include pulsanti per "Home", "Logout" e pulsanti personalizzati passati come figli.
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {Function} props.handleDrawerToggle - Funzione per chiudere il drawer al click.
 * @param {Function} props.handleLogout - Funzione chiamata al click su "Logout".
 * @param {string} props.activeBtn - Nome del pulsante attualmente attivo.
 * @param {Function} props.setActiveBtn - Funzione per aggiornare il pulsante attivo.
 * @param {React.ReactNode} props.children - Voci di menu aggiuntive da renderizzare nel drawer.
 * @returns {JSX.Element} Elemento React.
 */
export const DefaultDrawerContent = ({
    handleDrawerToggle,
    handleLogout,
    activeBtn,
    setActiveBtn,
    children,
}) => {
    return (
        <Box
            onClick={handleDrawerToggle}
            sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Typography variant="h6" sx={{ my: 2 }}>
                <Link
                    href="/"
                    title="Logo CMSPordini"
                    onClick={() => setActiveBtn("Home")}
                >
                    Ordini GruppoCMSP
                </Link>
            </Typography>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/"
                        title="Home"
                        onClick={() => setActiveBtn("Home")}
                        sx={activeBtn === "Home" ? mobileActiveBtnStyles : {}}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                {/* Renderizza eventuali voci di menu aggiuntive */}
                {children}

                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout} title="Logout">
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>

            {/* Contenitore per il logo CMSP nel drawer */}
            <Box
                sx={{
                    mt: "auto", // Margine superiore automatico per spingere l'immagine in basso
                    mb: 5,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    component="a"
                    title="Sito WEB Centro Medico San Pietro"
                    href="https://www.centromedicosanpietro.it/"
                    target="_blank"
                >
                    <Box
                        component="img"
                        src="/assets/img/ODONTOTECNICA-LOGO.svg"
                        loading="lazy" // Abilita il caricamento lazy per l'immagine
                        sx={{
                            width: 150,
                            "&:hover": {
                                opacity: "0.7", // Cambia l'opacità al passaggio del mouse
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

/**
 * Contenuto del drawer specifico per l'utente di tipo "cliente".
 * Include "Home", "Storico ordini" e "Logout".
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {Function} props.handleDrawerToggle - Funzione per chiudere il drawer al click.
 * @param {Function} props.handleLogout - Funzione chiamata al click su "Logout".
 * @param {string} props.activeBtn - Nome del pulsante attualmente attivo.
 * @param {Function} props.setActiveBtn - Funzione per aggiornare il pulsante attivo.
 * @returns {JSX.Element} Elemento React.
 */
export const ClienteDrawerContent = ({
    handleDrawerToggle,
    handleLogout,
    activeBtn,
    setActiveBtn,
}) => {
    return (
        <DefaultDrawerContent
            handleDrawerToggle={handleDrawerToggle}
            handleLogout={handleLogout}
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
        >
            <ListItem disablePadding>
                <ListItemButton
                    component={Link}
                    href="/cliente/ordini/storico"
                    title="Storico ordini"
                    onClick={() => setActiveBtn("Storico")}
                    sx={activeBtn === "Storico" ? mobileActiveBtnStyles : {}}
                >
                    {/* Icona che rappresenta lo storico ordini */}
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>

                    {/* Testo della voce di menu */}
                    <ListItemText primary="Storico ordini" />
                </ListItemButton>
            </ListItem>
        </DefaultDrawerContent>
    );
};

/**
 * Contenuto del drawer specifico per l'utente di tipo "operatore".
 * Include "Home", "Storico ordini clienti", "Gestione clienti" e "Logout".
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {Function} props.handleDrawerToggle - Funzione per chiudere il drawer al click.
 * @param {Function} props.handleLogout - Funzione chiamata al click su "Logout".
 * @param {string} props.activeBtn - Nome del pulsante attualmente attivo.
 * @param {Function} props.setActiveBtn - Funzione per aggiornare il pulsante attivo.
 * @returns {JSX.Element} Elemento React.
 */
export const OperatoreDrawerContent = ({
    handleDrawerToggle,
    handleLogout,
    activeBtn,
    setActiveBtn,
}) => {
    return (
        <DefaultDrawerContent
            handleDrawerToggle={handleDrawerToggle}
            handleLogout={handleLogout}
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
        >
            <ListItem disablePadding>
                <ListItemButton
                    component={Link}
                    href="/operatore/ordini-clienti"
                    title="Storico ordini clienti"
                    onClick={() => setActiveBtn("Storico")}
                    sx={activeBtn === "Storico" ? mobileActiveBtnStyles : {}}
                >
                    {/* Icona che rappresenta gli ordini dei clienti */}
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>

                    {/* Testo della voce di menu */}
                    <ListItemText primary="Storico ordini" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton
                    component={Link}
                    href="/operatore/gestione-clienti"
                    title="Gestione clienti"
                    onClick={() => setActiveBtn("Gestione clienti")}
                    sx={
                        activeBtn === "Gestione clienti"
                            ? mobileActiveBtnStyles
                            : {}
                    }
                >
                    {/* Icona che rappresenta la gestione clienti */}
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>

                    {/* Testo della voce di menu */}
                    <ListItemText primary="Gestione clienti" />
                </ListItemButton>
            </ListItem>
        </DefaultDrawerContent>
    );
};
