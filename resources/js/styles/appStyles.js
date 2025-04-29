export const contentContainer = {
    width: "100%",
    height: "100%",
    display: "flex",
    // flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    px: 6,
    py: 6,
};

export const badgeStyle = {
    "& .MuiBadge-badge": {
        width: 27,
        height: 27,
        border: "2px solid #fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        userSelect: "none",
        fontSize: 12,
        fontWeight: "600",
    },
};

export const buttonStyles = {
    fontWeight: "bold",
    px: 3,
    py: 1,
    width: 170,
    textAlign: "left",
    gap: 1,
};

export const creazioneClienteBtn = {
    textDecoration: "none",
    "&:hover": {
        opacity: "0.8",
    },
    transition: "all 0.2s ease",
    alignSelf: { xs: "center", sm: "end" },
    mb: { xs: 3, sm: 2 },
    borderRadius: 1,
    boxShadow: 2,
    fontWeight: 600,
};

export const navbarButtonStyles = {
    color: "#fff",
    "&:hover": { backgroundColor: "#1565c0" },
    width: 110,
    gap: 1,
};

export const navbarActiveBtnStyles = {
    ...navbarButtonStyles,
    backgroundColor: "#1565c0",
};

export const mobileActiveBtnStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
};
