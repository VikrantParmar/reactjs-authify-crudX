import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Email, GitHub, LinkedIn, Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        py: 2,
        mt: "auto",
      }}
    >
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="left">
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h5" sx={{ mb: 1 }} className="header-app-name">
              About {import.meta.env.VITE_APP_NAME}
            </Typography>
            <Divider sx={{ borderColor: "#fff" }} />
            <Typography variant="body2" sx={{ color: "#fff", mt: 2 }}>
              This is a platform to explore, share and learn.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h5" sx={{ mb: 1 }} className="header-app-name">
              Follow Us
            </Typography>
            <Divider sx={{ borderColor: "#fff" }} />
            <Typography variant="body2" sx={{ color: "#fff", mt: 2 }}>
              <IconButton
                href="https://github.com/VikrantParmar"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/vikrantrp/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                <LinkedIn />
              </IconButton>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h5" sx={{ mb: 1 }} className="header-app-name">
              Hire Me
            </Typography>
            <Divider sx={{ borderColor: "#fff" }} />

            <Typography
              variant="body2"
              textAlign="right"
              sx={{ color: "#fff", mt: 2 }}
            >
              <a
                href="mailto:vikrant.parmar91@gmail.com"
                style={{ color: "#fff" }}
              >
                vikrant.parmar91@gmail.com
              </a>
              <IconButton sx={{ color: "#fff" }}>
                <Email />
              </IconButton>
            </Typography>
            <Typography variant="body2" textAlign="right">
              <a href="tel:+918000255245" style={{ color: "#fff" }}>
                +91 8000255245
              </a>
              <IconButton sx={{ color: "#fff" }}>
                <Phone />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2" className="header-app-name">
            © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
