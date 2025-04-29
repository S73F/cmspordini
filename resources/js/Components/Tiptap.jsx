import React, { useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuButtonUnderline,
    MenuButtonStrikethrough,
    MenuButtonBulletedList,
    MenuButtonOrderedList,
    MenuButtonUndo,
    MenuButtonRedo,
    MenuSelectHeading,
    MenuControlsContainer,
    MenuDivider,
    RichTextEditor,
} from "mui-tiptap";

/**
 * Componente per l'editor di testo MUI Tiptap.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {string} props.tipo - Tipo di contenuto (usato per identificare il contenuto).
 * @param {string} props.titolo - Testo placeholder che viene visualizzato quando l'editor è vuoto.
 * @param {string} props.htmlContent - Contenuto HTML pre-caricato da visualizzare nell'editor.
 * @param {Function} props.onEditorContentSave - Funzione di callback per salvare il contenuto dell'editor.
 */
export default function Tiptap({
    tipo,
    titolo,
    htmlContent,
    onEditorContentSave,
}) {
    const rteRef = useRef(null); // Riferimento per il componente dell'editor
    const [currentColor, setCurrentColor] = useState("#000000"); // Stato per il colore del testo

    /**
     * Gestisce la modifica del colore del testo nell'editor.
     *
     * @param {Event} event - L'evento del cambiamento del colore del testo.
     */
    const handleColorChange = (event) => {
        const color = event.target.value;
        setCurrentColor(color); // Aggiorna lo stato del colore
        rteRef.current?.editor?.chain().focus().setColor(color).run(); // Applica il colore all'editor
    };

    /**
     * Gestisce l'aggiornamento del contenuto dell'editor e lo salva tramite la callback.
     */
    const handleEditorUpdate = () => {
        if (onEditorContentSave && rteRef.current?.editor) {
            const content = rteRef.current.editor.getHTML(); // Ottieni il contenuto HTML dell'editor
            onEditorContentSave(tipo, content); // Salva il contenuto tramite la callback
        }
    };

    return (
        <div style={{ textAlign: "left", wordBreak: "break-word" }}>
            <RichTextEditor
                ref={rteRef} // Collegamento al riferimento dell'editor
                extensions={[
                    StarterKit,
                    Underline,
                    TextStyle,
                    Color,
                    Placeholder.configure({
                        placeholder: titolo,
                    }),
                ]} // Estensioni dell'editor
                content={htmlContent || ""} // Imposta il contenuto iniziale
                onUpdate={handleEditorUpdate} // Salvataggio automatico del contenuto ad ogni modifica
                renderControls={() => (
                    <MenuControlsContainer>
                        {/* Controlli per la formattazione del testo */}
                        <MenuSelectHeading />
                        <MenuDivider />
                        <MenuButtonBold />
                        <MenuButtonItalic />
                        <MenuButtonUnderline />
                        <MenuButtonStrikethrough />
                        <MenuDivider />
                        <MenuButtonBulletedList />
                        <MenuButtonOrderedList />
                        <MenuDivider />

                        <IconButton component="label">
                            <ColorLensIcon />
                            <input
                                type="color"
                                onChange={handleColorChange}
                                style={{ display: "none" }}
                            />
                        </IconButton>

                        {/* Visualizza il colore attualmente selezionato */}
                        <Box
                            sx={{
                                width: "40px",
                                height: "40px",
                                padding: "8px",
                                display: "flex",
                                flexDirection: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    backgroundColor: currentColor,
                                    border: "1px solid #ccc",
                                    margin: "0 auto",
                                }}
                            />
                        </Box>

                        <MenuDivider />
                        <MenuButtonUndo />
                        <MenuButtonRedo />
                    </MenuControlsContainer>
                )}
            />
        </div>
    );
}
