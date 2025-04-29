import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

/**
 * Hook personalizzato per la gestione dei lavori.
 *
 * @returns {Object} Oggetto contenente le funzioni per gestire il download dei file e l'assegnazione degli incarichi.
 * @returns {Function} handleFile - Funzione per gestire il download dei file.
 * @returns {Function} handleIncarico - Funzione per gestire l'assegnazione o la riassegnazione di un incarico.
 */
export const useLavori = () => {
    const [loading, setLoading] = useState(false);

    /**
     * Funzione per gestire il download dei file.
     *
     * @param {string} user - Tipo di utente ("operatore" o "cliente").
     * @param {string} tipo - Tipo di file da scaricare ("sorgente" o "finale").
     * @param {number} IDordine - ID dell'ordine associato al file.
     */
    const handleFile = useCallback((user, tipo, IDordine) => {
        if (user === "operatore") {
            if (tipo === "sorgente") {
                window.location.href = `/operatore/ordini-clienti/download/${IDordine}`;
            } else if (tipo === "finale") {
                window.location.href = `/operatore/ordini-clienti/download-finale/${IDordine}`;
            }
        }

        if (user === "cliente") {
            if (tipo === "sorgente") {
                window.location.href = `/cliente/ordini/download/${IDordine}`;
            } else if (tipo === "finale") {
                window.location.href = `/cliente/ordini/download-finale/${IDordine}`;
            }
        }

        setTimeout(() => {
            toast.success("Download del file in corso...", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "dark",
            });
        }, 1000);
    }, []);

    /**
     * Gestisce l'assegnazione o la riassegnazione di un incarico per un ordine specifico.
     *
     * La funzione invia una richiesta PATCH per aggiornare lo stato dell'ordine e supporta il refresh di determinati dati nella UI.
     *
     * @param {number} IDordine - L'ID dell'ordine da assegnare o riassegnare.
     * @param {string} [option="forward"] - L'opzione di assegnazione. Può essere "forward" (avanza allo stato successivo) o "back" (torna allo stato precedente). Default: "forward".
     * @param {Function|null} [closeModal=null] - Funzione che, se fornita, chiude la modale al termine dell'operazione. Default: null.
     * @param {string[]} [refresh=["lavori", "flash", "numLavoriNuovi"]] - Array di chiavi che determinano quali parti della UI devono essere aggiornate dopo la richiesta.
     */
    const handleIncarico = useCallback(
        (
            IDordine,
            option = "forward",
            closeModal = null,
            refresh = ["lavori", "flash", "numLavoriNuovi"]
        ) => {
            router.patch(
                `/operatore/ordini-clienti/update/${IDordine}/${option}`,
                {},
                {
                    only: refresh,
                    preserveScroll: true,
                    preserveState: true,

                    onStart: () => setLoading(true),
                    ...(closeModal
                        ? {
                              onFinish: () => {
                                  closeModal();
                                  setLoading(false);
                              },
                          }
                        : {}),
                }
            );
        },
        []
    );

    return {
        handleFile,
        handleIncarico,
        loading,
    };
};
