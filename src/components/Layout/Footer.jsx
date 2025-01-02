import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
//import reactLogo from '../../assets/react.svg';
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

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
        color: "secondary.main",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="center" alignItems="left">
          <Grid item xs={12} sm={4} textAlign="left">
            <Typography variant="h5" sx={{ mb: 1 }} className="header-app-name">
              About Us
            </Typography>
            <Divider sx={{ borderColor: "#fff" }} />
            <Typography variant="body2" sx={{ color: "#fff", mt: 2 }}>
              {import.meta.env.VITE_APP_NAME} is a platform to explore, share,
              and learn.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h5" sx={{ mb: 1 }} className="header-app-name">
              Follow Us
            </Typography>
            <Divider sx={{ borderColor: "#fff" }} />
            <Typography variant="body2" sx={{ color: "#fff", mt: 2 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                <Instagram />
              </IconButton>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="right">
            <Typography variant="h5" sx={{ mb: 1 }} className="header-app-name">
              Contact Us
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
            <Typography variant="body2">
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
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
