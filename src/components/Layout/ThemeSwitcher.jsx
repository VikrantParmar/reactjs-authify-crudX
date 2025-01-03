import React from "react";
import { Box, IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const handleToggleTheme = () => {
    onThemeChange(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <Box>
      <IconButton onClick={handleToggleTheme} color="inherit">
        {currentTheme === "light" ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Box>
  );
};

export default ThemeSwitcher;
