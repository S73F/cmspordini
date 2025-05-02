import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ToastContainer } from "react-toastify";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { useLayout } from "../Hooks/Layouts/useLayout";
import { useActiveButton } from "../Contexts/ActiveButtonContext";
import {
    ClienteDrawerContent,
    OperatoreDrawerContent,
} from "../Components/Layouts/DrawerContent";
import {
    ClienteNavbarButtons,
    OperatoreNavbarButtons,
} from "../Components/Layouts/NavbarButtons";

const drawerWidth = 240;

/**
 * Componente di layout principale che gestisce la struttura dell'applicazione,
 * includendo una barra di navigazione, un menu a scomparsa (drawer) e il contenuto principale.
 *
 * @component
 * @param {Object} props - Proprietà del componente.
 * @param {function} [props.window] - Funzione opzionale per ottenere l'oggetto window, utile per rendering in iframe.
 * @param {React.ReactNode} props.children - Contenuto principale da visualizzare nella pagina.
 * @param {"cliente"|"operatore"} props.type - Tipo di utente che determina la navigazione visibile.
 *
 * @returns {JSX.Element} Il layout dell'applicazione.
 */
function Layout({ window, children, type }) {
    const { activeBtn, setActiveBtn } = useActiveButton();
    const [mobileOpen, setMobileOpen] = useState(false); // Alterna apertura/chiusura del drawer

    const { handleLogout } = useLayout(); // Recupera la funzione di logout dall'hook

    /**
     * Alterna l'apertura o chiusura del menu drawer su dispositivi mobili.
     */
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>

            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: "block",
                                userSelect: "none",
                            }}
                        >
                            <Link
                                href="/"
                                title="Logo CMSPordini"
                                onClick={() => setActiveBtn("Home")}
                            >
                                CMSPordini
                            </Link>
                        </Typography>

                        {type === "cliente" && (
                            <ClienteNavbarButtons
                                handleLogout={handleLogout}
                                activeBtn={activeBtn}
                                setActiveBtn={setActiveBtn}
                            />
                        )}
                        {type === "operatore" && (
                            <OperatoreNavbarButtons
                                handleLogout={handleLogout}
                                activeBtn={activeBtn}
                                setActiveBtn={setActiveBtn}
                            />
                        )}
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: "block", md: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                    >
                        {type === "cliente" && (
                            <ClienteDrawerContent
                                handleDrawerToggle={handleDrawerToggle}
                                handleLogout={handleLogout}
                                activeBtn={activeBtn}
                                setActiveBtn={setActiveBtn}
                            />
                        )}
                        {type === "operatore" && (
                            <OperatoreDrawerContent
                                handleDrawerToggle={handleDrawerToggle}
                                handleLogout={handleLogout}
                                activeBtn={activeBtn}
                                setActiveBtn={setActiveBtn}
                            />
                        )}
                    </Drawer>
                </nav>
                <Box
                    component="main"
                    sx={{
                        p: 3,
                        width: "100%",
                        flexGrow: 1,
                        overflowX: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Spazio per compensare l'AppBar fissa */}
                    <Toolbar />

                    {children}

                    <ToastContainer position="bottom-right" closeOnClick />
                </Box>
            </Box>
        </>
    );
}

export default Layout;
