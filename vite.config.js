import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
<<<<<<< HEAD
            input: [ 'resources/js/app.jsx','resources/css/app.css','resources/css/modal.css'],
=======
            input: [
                "resources/js/app.jsx",
                "resources/css/app.css",
                "resources/css/modal.css",
            ],
>>>>>>> aea6915f2a51ed07f9d408e2cd8a8ea0b6176164
            refresh: true,
        }),
    ],
});
