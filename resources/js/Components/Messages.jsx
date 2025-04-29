import React from "react";
import { Typography } from "@mui/material";

/**
 * Componente che visualizza un messaggio di benvenuto personalizzato per l'utente.
 *
 * Se il nome dell'utente è disponibile, verrà utilizzato per visualizzare un messaggio di benvenuto
 * personalizzato, altrimenti verrà utilizzato il cognome dell'utente o un valore predefinito.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Object} props.user - Oggetto contenente i dati dell'utente.
 * @param {string} props.user.nome - Nome dell'utente. Se presente, viene usato nel messaggio di benvenuto.
 * @param {string} props.user.cognome - Cognome dell'utente, usato se il nome non è disponibile.
 *
 * @returns {JSX.Element} Un messaggio di benvenuto personalizzato per l'utente, basato sul nome o cognome.
 */
const Welcome = ({ user }) => (
    <Typography component="h2" color="primary" mb={4} fontSize={40}>
        {user?.nome
            ? `Benvenuto ${user?.nome}`
            : `Benvenuto ${user?.cognome ?? "Utente"}`}
    </Typography>
);

/**
 * Componente che visualizza un messaggio di fallback personalizzato quando non ci sono elementi da mostrare per una determinata categoria
 * (es: ordini, clienti, prodotti).
 *
 * Il messaggio varia in base al genere (maschile, femminile o neutro) e all'elemento (come "ordine", "cliente", etc.).
 *
 * @param {Object} props - Proprietà del componente.
 * @param {string} props.item - L'elemento per cui non sono stati trovati risultati. Es: "ordine", "cliente", "prodotto".
 * @param {string} [props.gender="neutral"] - Il genere da utilizzare per personalizzare il messaggio. Es: "male"="Nessuno {item} trovato", "female"="Nessuna {item} trovata", DEFAULT: "neutral"="Nessun {item} trovato".
 *
 * @returns {JSX.Element} Un messaggio di fallback personalizzato che informa l'utente che non sono stati trovati risultati per l'elemento richiesto.
 */
const Fallback = ({ item, gender = "neutral", marginTop = 4 }) => {
    const messages = {
        male: `Nessuno ${item} trovato`,
        female: `Nessuna ${item} trovata`,
        neutral: `Nessun ${item} trovato`,
    };

    return (
        <Typography
            variant="h5"
            component={"p"}
            sx={{ mt: marginTop, textAlign: "center" }}
        >
            {messages[gender] || messages.neutral}
        </Typography>
    );
};

/**
 * Oggetto che raccoglie i componenti per i messaggi: Welcome e Fallback.
 *
 * Questi componenti vengono utilizzati per visualizzare messaggi personalizzati all'utente,
 * come un messaggio di benvenuto o un messaggio di fallback quando non ci sono elementi da mostrare.
 *
 * @type {Object}
 * @property {JSX.Element} Welcome - Componente che visualizza il messaggio di benvenuto per l'utente.
 * @property {JSX.Element} Fallback - Componente che visualizza un messaggio di fallback quando non ci sono elementi da mostrare.
 */
export const Messages = {
    Welcome,
    Fallback,
};
