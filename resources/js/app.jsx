import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { renderApp } from "@inertiaui/modal-react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ActiveButtonProvider } from "./Contexts/ActiveButtonContext";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const components = import.meta.glob("./Components/**/*.jsx", {
            eager: true,
        });

        return (
            pages[`./Pages/${name}.jsx`] ||
            components[`./Components/${name}.jsx`]
        );
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ActiveButtonProvider>{renderApp(App, props)}</ActiveButtonProvider>
        );
    },
    progress: {
        // The color of the progress bar...
        color: "#fff",
    },
});
