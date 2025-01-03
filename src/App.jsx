import React, { useState, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline, Box, CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import HeaderMenu from "./components/Layout/HeaderMenu";
import Footer from "./components/Layout/Footer";
import { SnackbarProvider } from "notistack";
import lightTheme from "@/themes/lightTheme";
import darkTheme from "./themes/darkTheme";
import "./App.css";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/Auth/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/Auth/RegisterPage"));
const ProfilePage = React.lazy(() => import("@/pages/Profile/ProfilePage"));
const NotFoundPage = React.lazy(() => import("./pages/ErrorPages/Page404"));
const ProfilePage2 = React.lazy(() =>
  import("@/components/Profile/ProfileForm")
);
function App() {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const themes = {
    light: lightTheme,
    dark: darkTheme,
  };
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <ThemeProvider theme={themes[currentTheme]}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <HeaderMenu
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
          />
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
                <Route path="/my-profile" element={<ProfilePage />} />
                <Route path="/me" element={<ProfilePage2 />} />
                <Route path="/update-password" element={<ProfilePage />} />
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
