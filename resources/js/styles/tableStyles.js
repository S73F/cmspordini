export const dataTableStyle = {
    "& .headerColumn": {
        bgcolor: "#00a55f",
        color: "#fff",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        whiteSpace: "normal",
        lineHeight: "1.2",
        wordBreak: "break-word",
        textAlign: "left",
    },
    "& .MuiDataGrid-cell": {
        whiteSpace: "normal",
        lineHeight: "1.4",
        wordBreak: "break-word",
        display: "flex",
        alignItems: "center",
    },
    "& .MuiDataGrid-selectedRowCount": {
        display: "none",
    },
};

export const iconStyle = {
    color: "inherit",
    "&:hover": { color: "#00a55f" },
    mr: 1.5,
    transition: "color 0.2s ease",
};

export const anchorStyle = {
    color: "inherit",
    textDecoration: "none",
    "&:hover": { color: "#00a55f " },
    transition: "color 0.2s ease",
};

export const chipStyle = {
    height: 32,
    fontWeight: 550,
    fontSize: "0.875rem",
    width: 110,
    borderRadius: "16px",
    pl: 0.5,
    pr: 0.5,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
};

export const chipColors = {
    nuovo: { backgroundColor: "#ffe6e6" },
    inCorso: { backgroundColor: "#fffbb5" },
    spedito: { backgroundColor: "#b5ffb5" },
};

export const circleStyles = {
    nuovo: { fill: "#ff0000", width: 20 },
    inCorso: { fill: "#ffbf00", width: 20 },
    spedito: { fill: "#00c400", width: 20 },
};
