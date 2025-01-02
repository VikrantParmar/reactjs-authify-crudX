import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline, Box, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeaderMenu from "./components/Layout/HeaderMenu";
import Footer from "./components/Layout/Footer";
import "./App.css";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/Auth/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/Auth/RegisterPage"));
const NotFoundPage = React.lazy(() => import("./pages/ErrorPages/Page404"));
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0A0F24",
    },
    secondary: {
      main: "#FAE3CF",
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
    fontFamily: "Roboto, Arial, sans-serif", //monospace
    h1: {
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
});
function App() {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <HeaderMenu />
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Suspense
              fallback={
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
