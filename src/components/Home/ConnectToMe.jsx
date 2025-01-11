import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { useTheme } from "@mui/material/styles";
import ConnectCard from "./ConnectCard";
import { Email, Call, Videocam } from "@mui/icons-material";
const WhyMe = () => {
  const theme = useTheme();

  const fadeInUp = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1500 },
  });

  const features = [
    {
      title: "Email Communication",
      icon: <Email fontSize="large" />,
      type: "email",
      connect: "vikrant.parmar91@gmail.com",
      content:
        "You can reach me via email at. I am available to assist you with any inquiries or support requests.",
    },
    {
      title: "Phone/WhatsApp Support",
      icon: <Call fontSize="large" />,
      connect: "+91 8000255245",
      type: "call",
      content:
        "For immediate assistance, feel free to call or message me on WhatsApp. I am available for direct communication.",
    },
    {
      title: "Skype Consultation",
      icon: <Videocam fontSize="large" />,
      type: "skype",
      connect: "vikrant.parmar127",
      content:
        "For a more personal approach, you can connect with me via Skype. I'm available for video calls to discuss any questions or provide support.",
    },
  ];

  return (
    <section className="hire-me-connect">
      <Box className="connect-me">
        <Container maxWidth="lg">
          <animated.div style={fadeInUp}>
            <Box className="features">
              <Container>
                <Box
                  className="section-head"
                  sx={{ marginBottom: 6, textAlign: "center" }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, position: "relative", mb: 5 }}
                  >
                    <span>Get in Touch with </span>Me
                    <Box
                      sx={{
                        content: '""',
                        width: 60,
                        height: 3,
                        backgroundColor: theme.palette.primary.main,
                        position: "absolute",
                        left: 0,
                        right: 0,
                        margin: "0 auto",
                      }}
                    />
                  </Typography>
                  <Typography variant="body5" textAlign="center">
                    Let&apos;s Collaborate to Drive Innovation, Boost Your
                    Business Growth, and Build Seamless Solutions Together
                  </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                  {features.map((feature, index) => (
                    <ConnectCard key={index} feature={feature} />
                  ))}
                </Grid>
              </Container>
            </Box>
          </animated.div>
        </Container>
      </Box>
    </section>
  );
};

export default WhyMe;
