import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faFilePdf,
    faFileZipper,
    faPenToSquare,
    faShareFromSquare,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
    faFileZipper as faFileZipperSolid,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { anchorStyle, iconStyle } from "../styles/tableStyles";
import { Box, Link, Tooltip, Typography } from "@mui/material";
import { ModalLink } from "@inertiaui/modal-react";
import { StatusChip } from "./StatusChip";

/**
 * Crea una colonna della tabella con la configurazione specificata.
 *
 * @param {string} field - Il campo per il quale viene creata la colonna.
 * @param {string} headerName - Il nome della colonna da visualizzare nell'intestazione.
 * @param {number} minWidth - La larghezza minima della colonna.
 * @param {number} [maxWidth] - La larghezza massima della colonna (opzionale).
 * @param {Function} [renderCell] - Una funzione opzionale per personalizzare il rendering delle celle della colonna.
 * @param {boolean} [sortable=true] - Indica se la colonna è ordinabile (default è true).
 * @param {boolean} [filterable=true] - Indica se la colonna è filtrabile (default è true).
 * @returns {object} L'oggetto di configurazione della colonna.
 */
export const TableColumn = (
    field,
    headerName,
    minWidth,
    maxWidth,
    renderCell,
    sortable = true,
    filterable = true
) => ({
    field: field,
    headerName: headerName,
    flex: 1, // Imposta la larghezza flessibile della colonna
    ...(minWidth && { minWidth }), // Imposta la larghezza massima, se fornita
    ...(maxWidth && { maxWidth }), // Imposta la larghezza massima, se fornita
    sortable: sortable,
    filterable: filterable,
    headerClassName: "headerColumn", // Classe CSS per l'intestazione
    ...(renderCell && { renderCell }), // Aggiunge la funzione renderCell, se fornita
});

/**
 * Componente per il testo all'interno di un link che apre una modale.
 *
 * @param {object} props - Le props del componente.
 * @param {string} props.href - L'URL di destinazione del link.
 * @param {ReactNode} props.children - Il contenuto del link.
 * @returns {JSX.Element} Un componente Typography che avvolge il link.
 */
export const TableModalText = ({ href, children }) => {
    return (
        <Typography
            component={ModalLink}
            variant="p"
            href={href}
            sx={anchorStyle}
        >
            {children}
        </Typography>
    );
};

/**
 * Componente per un bottone all'interno della tabella che può essere un link o un bottone normale.
 *
 * @param {object} props - Le props del componente.
 * @param {string} props.btnType - Il tipo di bottone (es. "button", "a", "ModalLink").
 * @param {string} props.btnTitle - Il titolo del bottone (per l'attributo "title").
 * @param {object} props.icon - L'icona da visualizzare nel bottone.
 * @param {Function} [props.onClick] - La funzione da chiamare al clic del bottone (opzionale).
 * @param {string} [props.href] - L'URL di destinazione se il bottone è un link (opzionale).
 * @param {string} [props.target="_blank"] - L'attributo target per il link (default è "_blank").
 * @returns {JSX.Element} Un componente Link o Button che visualizza l'icona.
 */
export const TableFieldButton = ({
    btnType,
    btnTitle,
    icon,
    onClick,
    href,
    target = "_blank",
}) => {
    return (
        <Link
            component={btnType}
            {...(btnType === "button" && { onClick })}
            {...((btnType === "a" || btnType === ModalLink) && {
                href,
                target,
            })}
            sx={iconStyle}
        >
            <Tooltip title={btnTitle}>
                <FontAwesomeIcon icon={icon} size="xl" />
            </Tooltip>
        </Link>
    );
};

/**
 * Renderizza il nome della ragione sociale come un link che apre la modale per la modifica del cliente.
 *
 * @param {object} rowParams - I parametri della riga che contengono i dati.
 * @returns {JSX.Element} Un link che apre una modale per la modifica della ragione sociale.
 */
export const RagioneSociale = (rowParams) => {
    return (
        <TableModalText
            href={`/operatore/gestione-clienti/modifica/${rowParams.idCliente}`}
        >
            {rowParams.ragione_sociale}
        </TableModalText>
    );
};

/**
 * Renderizza il medico e la ragione sociale come un blocco di testo con due righe.
 *
 * @param {object} rowParams - I parametri della riga che contengono i dati.
 * @returns {JSX.Element} Un blocco di testo con il medico e la ragione sociale.
 */
export const MedicoAndRagioneSociale = (rowParams) => {
    return (
        <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography component="p" variant="p">
                {rowParams.medicoOrdinante}
            </Typography>
            <TableModalText
                href={`/operatore/gestione-clienti/modifica/${rowParams.idCliente}`}
            >
                {rowParams.ragione_sociale}
            </TableModalText>
        </Box>
    );
};

/**
 * Renderizza lo stato del lavoro come un chip che indica se è "Nuovo", "In Corso" o "Spedito".
 *
 * @param {object} rowParams - I parametri della riga che contengono lo stato.
 * @returns {JSX.Element} Un chip che rappresenta lo stato del lavoro.
 */
export const StatoLavoro = (rowParams) => {
    return (
        <>
            {rowParams.stato === 0 && (
                <StatusChip label={"Nuovo"} prop={"nuovo"} />
            )}
            {rowParams.stato === 1 && (
                <StatusChip label={"In corso"} prop={"inCorso"} />
            )}
            {rowParams.stato === 2 && (
                <StatusChip label={"Spedito"} prop={"spedito"} />
            )}
        </>
    );
};

/**
 * Renderizza la data di inizio lavorazione con eventuali note di modifica.
 *
 * @param {object} rowParams - I parametri della riga che contengono i dati.
 * @returns {JSX.Element} Un blocco di testo che mostra la data di inizio lavorazione ed eventuali modifiche.
 */
export const DataInizioLavorazione = (rowParams) => {
    return (
        <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography component="p" variant="p">
                {rowParams.data_inizioLavorazione}
            </Typography>
            {rowParams.note_ulti_mod && (
                <Box
                    sx={{
                        color: "#ff0000",
                    }}
                >
                    <Typography component="p" variant="p" fontWeight={500}>
                        Ultima modifica:
                    </Typography>
                    <Typography component="p" variant="p" fontWeight={500}>
                        {rowParams.note_ulti_mod}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

/**
 * Renderizza l'email del cliente come un link mailto.
 *
 * @param {object} rowParams - I parametri della riga che contengono l'email.
 * @returns {JSX.Element} Un link mailto con l'email del cliente.
 */
export const EmailCliente = (rowParams) => {
    return (
        <Link
            component="a"
            href={`mailto:${rowParams.emailcliente}`}
            sx={anchorStyle}
        >
            {rowParams.emailcliente}
        </Link>
    );
};

/**
 * Aggiunge i bottoni per gli allegati di un ordine, con opzioni diverse in base al tipo di utente.
 *
 * @param {object} rowParams - I parametri della riga che contengono gli allegati.
 * @param {string} user - Il tipo di utente (es. "operatore" o "cliente").
 * @param {Function} handleFile - La funzione per gestire il download dei file.
 * @returns {JSX.Element} I bottoni per visualizzare e scaricare i file.
 */
export const Allegati = (rowParams, user, handleFile) => {
    return (
        <>
            <TableFieldButton
                btnType={"button"}
                btnTitle={"File sorgente"}
                onClick={() => handleFile(user, "sorgente", rowParams.id)}
                icon={faFileZipper}
            />
            <TableFieldButton
                btnType={"a"}
                btnTitle={"File PDF"}
                href={
                    user === "operatore"
                        ? `/operatore/ordini-clienti/pdf/${rowParams.id}`
                        : `/cliente/ordini/pdf/${rowParams.id}`
                }
                icon={faFilePdf}
            />

            {((user === "operatore" && rowParams.file_fin === 1) ||
                (user === "cliente" &&
                    rowParams.stato === 2 &&
                    rowParams.file_fin === 1)) && (
                <TableFieldButton
                    btnType={"button"}
                    btnTitle={"File finale"}
                    onClick={() => handleFile(user, "finale", rowParams.id)}
                    icon={faFileZipperSolid}
                />
            )}
        </>
    );
};

/**
 * Renderizza i bottoni relativi alle azioni disponibili su un ordine, in base al tipo di lavoro selezionato.
 *
 * @param {object} rowParams - I parametri della riga che contengono le informazioni dell'ordine.
 * @param {string} tipoLavori - Il tipo di lavoro ("nuovi" o "inCorso").
 * @returns {JSX.Element} I bottoni per le azioni su un ordine.
 */
export const Azioni = (rowParams, tipoLavori) => {
    if (tipoLavori === "nuovi") {
        return (
            <>
                <TableFieldButton
                    btnType={ModalLink}
                    btnTitle={"Accetta incarico"}
                    href={`/operatore/lavori/accettazione/${rowParams.id}`}
                    icon={faCircleCheck}
                />
                <TableFieldButton
                    btnType={ModalLink}
                    btnTitle={"Elimina ordine"}
                    href={`/operatore/lavori/eliminazione/${rowParams.id}`}
                    icon={faTrashCan}
                />
            </>
        );
    } else if (tipoLavori === "inCorso") {
        return (
            <>
                <TableFieldButton
                    btnType={ModalLink}
                    btnTitle={"Modifica lavorazione"}
                    href={`/operatore/ordini-clienti/caricamento-lavorazione/${rowParams.id}`}
                    icon={faPenToSquare}
                />
                {rowParams.file_fin === 1 && (
                    <TableFieldButton
                        btnType={ModalLink}
                        btnTitle={"Spedisci lavorazione"}
                        href={`/operatore/lavori/spedizione/${rowParams.id}`}
                        icon={faShareFromSquare}
                    />
                )}
                <TableFieldButton
                    btnType={ModalLink}
                    btnTitle={"Elimina ordine"}
                    href={`/operatore/lavori/eliminazione/${rowParams.id}`}
                    icon={faTrashCan}
                />
                <TableFieldButton
                    btnType={ModalLink}
                    btnTitle={"Annulla incarico"}
                    href={`/operatore/lavori/reset/${rowParams.id}`}
                    icon={faRotateLeft}
                />
            </>
        );
    }
};

/**
 * Renderizza i bottoni per le azioni disponibili su un cliente, come modifica ed eliminazione.
 *
 * @param {object} rowParams - I parametri della riga che contengono le informazioni del cliente.
 * @returns {JSX.Element} I bottoni per modificare o eliminare un cliente.
 */
export const AzioniCliente = (rowParams) => {
    return (
        <>
            <TableFieldButton
                btnType={ModalLink}
                btnTitle={"Modifica cliente"}
                href={`/operatore/gestione-clienti/modifica/${rowParams.id}`}
                icon={faPenToSquare}
            />
            <TableFieldButton
                btnType={ModalLink}
                btnTitle={"Elimina cliente"}
                href={`/operatore/gestione-clienti/eliminazione/${rowParams.id}`}
                icon={faTrashCan}
            />
        </>
    );
};

/**
 * Mappa gli ordini e li trasforma in un array di oggetti con le proprietà richieste.
 *
 * @param {Array} ordini - L'array degli ordini da mappare.
 * @returns {Array} Un array di oggetti mappati da usare nella tabella.
 */
export const mapOrders = (ordini) =>
    ordini.map((ordine) => ({
        id: ordine.IDordine,
        ...(ordine.IDcliente && { idCliente: ordine.IDcliente }),
        ...(ordine.cliente?.ragione_sociale && {
            ragione_sociale: ordine.cliente.ragione_sociale,
        }),
        ...(ordine.medicoOrdinante && {
            medicoOrdinante: ordine.medicoOrdinante,
        }),
        ...(ordine.PazienteCognome &&
            ordine.PazienteNome && {
                Paziente: ordine.PazienteCognome + " " + ordine.PazienteNome,
            }),
        ...(ordine.IndirizzoSpedizione && {
            IndirizzoSpedizione: ordine.IndirizzoSpedizione,
        }),
        ...(ordine.operatore && {
            Operatore:
                (ordine.operatore?.nome || "") +
                " " +
                (ordine.operatore?.cognome || ""),
        }),
        ...(!ordine.operatore && {
            Operatore: "-",
        }),
        ...(ordine.data && {
            data: ordine.data || "-",
        }),
        data_inizioLavorazione: ordine.data_inizioLavorazione || "-",
        data_spedizione: ordine.data_spedizione || "-",
        stato: ordine.stato,
        ...(ordine.file_fin !== undefined && { file_fin: ordine.file_fin }),
        ...(ordine.note_ulti_mod && { note_ulti_mod: ordine.note_ulti_mod }),
    }));

/**
 * Mappa i clienti e li trasforma in un array di oggetti con le proprietà richieste.
 *
 * @param {Array} clienti - L'array dei clienti da mappare.
 * @returns {Array} Un array di oggetti mappati da usare nella tabella.
 */
export const mapClienti = (clienti) =>
    clienti.map((cliente) => ({
        id: cliente.IDcliente,
        idCliente: cliente.IDcliente,
        ragione_sociale: cliente.ragione_sociale,
        Nome: cliente.nome,
        Cognome: cliente.cognome,
        emailcliente: cliente.emailcliente,
        Username: cliente.username,
    }));
