import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#FAE3CF",
    },
    secondary: {
      main: "#0A0F24",
    },
    other: {
      white: "#fff",
      black: "#000",
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      color: "#0A0F24", // Font color for h1
    },
    body1: {
      fontSize: "1rem",
      color: "#0A0F24", // Font color for body1
    },
    // Optionally, you can apply color to other typography variants here as well
  },
});

export default lightTheme;
