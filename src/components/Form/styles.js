const sx = {
  Paper: { padding: (theme) => theme.spacing(2) },

  LabelBtnUpload: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "0 8px",
    overflow: "hidden",
  },

  BoxFormFlex: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& .MuiTextField-root": {
      margin: (theme) => theme.spacing(1),
    },
  },

  TypographyFormHeader: {
    fontFamily: "Commissioner, sans-serif",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "inherit",
    textDecoration: "none",
  },

  BoxFormFileBase: {
    margin: (theme) => theme.spacing(1),
    marginLeft: (theme) => theme.spacing(1),
    width: "100%",
  },

  FormFooterCreateBtn: { margin: (theme) => theme.spacing(1) },

  FormFooterResetBtn: {
    margin: (theme) => theme.spacing(1),
    marginTop: 0,
  },

  OverflowText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
};

export default sx;
