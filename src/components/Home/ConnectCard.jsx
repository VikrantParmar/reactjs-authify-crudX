import React from "react";
import PropTypes from "prop-types";
import { Container, Typography, Grid, Avatar, Paper } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { useTheme } from "@mui/material/styles";
import {
  History,
  SupportAgent,
  AttachMoney,
  Web,
  Code,
  Storage,
  AutoMode,
  Schedule,
  People,
  TipsAndUpdates,
  Devices,
  VerifiedUser,
  IntegrationInstructions,
  TrendingUp,
  AppRegistration,
  DeviceHub,
  ThumbUp,
} from "@mui/icons-material";
import { useInView } from "react-intersection-observer";

const ConnectCard = ({ feature }) => {
  const theme = useTheme();

  const [isHovered, setHovered] = React.useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const iconAnimation = useSpring({
    transform: isHovered ? "translateY(-10px)" : "translateY(0px)",
    config: { mass: 1, tension: 200, friction: 15 },
  });

  const paperAnimation = useSpring({
    transform: inView ? "scale(1)" : "scale(0.5)",
    opacity: inView ? 1 : 0,
  });
  const renderLink = (type, contact) => {
    const linkStyles = {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        color: "#fff",
      },
    };

    switch (type) {
      case "email":
        return (
          <a href={`mailto:${contact}`} style={linkStyles}>
            {contact}
          </a>
        );
      case "call":
        return (
          <a href={`tel:${contact}`} style={linkStyles}>
            {contact}
          </a>
        );
      case "skype":
        return (
          <a href={`skype:${contact}?call`} style={linkStyles}>
            {contact}
          </a>
        );
      default:
        return <span style={linkStyles}>{contact}</span>;
    }
  };

  return (
    <Grid item xs={12} sm={6} lg={4} ref={ref}>
      <animated.div style={paperAnimation}>
        <Paper
          sx={{
            background: theme.palette.background.paper,
            textAlign: "center",
            padding: 3,
            boxShadow: "0 0px 25px rgba(0, 0, 0, 0.07)",
            borderRadius: "20px",
            border: `5px solid rgba(0, 0, 0, 0.07)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.5s ease",
            /*  "&:hover": {
              background: theme.palette.primary.main,
              boxShadow: "0 8px 20px 0px rgba(0, 0, 0, 0.2)",
              "& .icon": {
                background: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
              "& h6, & p": {
                color: theme.palette.common.white,
              },
            }, */
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <animated.div style={iconAnimation}>
            <Avatar
              className="icon"
              sx={{
                fontSize: 40,
                marginBottom: 2,
                background: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                width: 90,
                height: 90,
                lineHeight: "96px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {feature.icon}
            </Avatar>
          </animated.div>
          <Typography variant="h6" component="h6" sx={{ marginBottom: 0 }}>
            {feature.title}
          </Typography>
          <Typography variant="h6" component="h6" sx={{ marginBottom: 2 }}>
            {renderLink(feature.type, feature.connect)}
          </Typography>
          <Typography variant="body2">{feature.content}</Typography>
        </Paper>
      </animated.div>
    </Grid>
  );
};

ConnectCard.propTypes = {
  feature: PropTypes.any,
};

export default ConnectCard;
