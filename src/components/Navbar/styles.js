import { createTheme } from "@mui/material/styles";
import purple from "@mui/material/colors/purple";

export const theme = createTheme({
  palette: {
    // primary: { main: green["A700"] },
    secondary: { main: purple["A200"] },
  },
});

const sx = {
  IconButton: {
    padding: "5px",
    border: "1px solid",
    borderRadius: (theme) => theme.spacing(1),
  },

  SearchButton: {
    textTransform: "none",
    justifyContent: "space-between",
    minWidth: 200,
    borderColor: "#fff",
    color: "#fff",
    borderRadius: "12px !important",
    padding: "5px",
    margin: 0,
    width: "100%",
    "& #hotkey-search": {
      padding: "0 5px !important",
      border: (theme) => `1px solid #fff`,
      borderRadius: (theme) => theme.spacing(1),
    },
  },

  SearchPlaceholder: {
    display: "flex",
    alignItems: "center",
  },
};

export default sx;
