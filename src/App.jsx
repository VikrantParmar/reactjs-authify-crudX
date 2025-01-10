import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box, CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import HeaderMenu from "./components/Layout/HeaderMenu";
import Footer from "./components/Layout/Footer";
import { SnackbarProvider } from "notistack";
import routes from "@/routes/routesConfig";
import {
  PublicRoute,
  GuestRoute,
  AuthenticatedRoute,
  PrivateRoute,
} from "@/routes/CustomRoutes";
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";

function App() {
  const [currentTheme, setCurrentTheme] = React.useState("dark");
  const themes = { light: lightTheme, dark: darkTheme };

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
            onThemeChange={setCurrentTheme}
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
                {routes.map(
                  ({
                    path,
                    element: Component,
                    isPublic,
                    guestOnly,
                    authRequired,
                    roles,
                  }) => {
                    if (isPublic)
                      return (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <PublicRoute>
                              <Component />
                            </PublicRoute>
                          }
                        />
                      );
                    if (guestOnly)
                      return (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <GuestRoute>
                              <Component />
                            </GuestRoute>
                          }
                        />
                      );
                    if (authRequired)
                      return (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <AuthenticatedRoute>
                              <Component />
                            </AuthenticatedRoute>
                          }
                        />
                      );
                    if (roles)
                      return (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <PrivateRoute roles={roles}>
                              <Component />
                            </PrivateRoute>
                          }
                        />
                      );
                    return null;
                  }
                )}
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
