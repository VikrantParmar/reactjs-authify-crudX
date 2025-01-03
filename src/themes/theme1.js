import { createTheme } from "@mui/material/styles";

const theme1 = createTheme({
  palette: {
    primary: {
      main: "#0A0F24",
    },
    secondary: {
      main: "#FAE3CF",
    },
    background: {
      default: "#f4f6f8",
    },
    text: {
      primary: "#0A0F24",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme1;
