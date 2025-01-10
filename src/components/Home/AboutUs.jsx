import {
  Container,
  Typography,
  Stack,
  Box,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { useSpring, animated } from "react-spring";
import { Visibility, Star, PersonAdd, Rocket } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
const SectionCard = ({ title, subtitle, icon, content, delay }) => {
  const theme = useTheme();
  return (
    <animated.div
      style={useSpring({
        opacity: 1,
        transform: "translateY(0)",
        from: { opacity: 0, transform: "translateY(20px)" },
        delay: delay,
        config: { tension: 150, friction: 30 },
      })}
    >
      <Paper
        sx={{
          background: theme.palette.background.paper,
          padding: 3,
          boxShadow: "0 0px 25px rgba(75, 68, 68, 0.07)",
          borderRadius: "20px",
          border: `2px solid rgba(0, 0, 0, 0.07)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.5s ease",

          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Avatar
          className="about-me-icons"
          sx={{
            width: 70,
            height: 70,
            margin: "0 auto",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {content}
        </Typography>
      </Paper>
    </animated.div>
  );
};
const AboutUs = () => {
  const theme = useTheme();
  const fadeInUp = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  return (
    <section className="home-about-us">
      <Box className="about-us">
        <Container maxWidth="lg">
          <animated.div style={fadeInUp}>
            <Box className="features">
              <Container>
                <Box
                  className="section-head"
                  textAlign="center"
                  sx={{ marginBottom: 6 }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, position: "relative", mb: 5 }}
                  >
                    <span>About</span> Me
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
                    I am dedicated to providing innovative solutions to make
                    your life easier. My mission is to deliver high-quality
                    products that exceed expectations.
                  </Typography>
                </Box>

                <Grid container spacing={1} justifyContent="center">
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 4 }}
                  >
                    {[
                      {
                        title: "My Mission",
                        icon: <Rocket fontSize="large" />,
                        content:
                          "To create user-friendly, modern, and scalable solutions.",
                      },
                      {
                        title: "My Vision",
                        icon: <Visibility fontSize="large" />,
                        content: "Innovating the future, one step at a time.",
                      },
                      {
                        title: "My Values",
                        icon: <Star fontSize="large" />,
                        content:
                          "Integrity, creativity, and commitment to excellence.",
                      },
                      {
                        title: "Join Me",
                        icon: <PersonAdd fontSize="large" />,
                        content:
                          "Be a part of my journey toward meaningful impact.",
                      },
                    ].map((section, index) => (
                      <SectionCard
                        key={index}
                        title={section.title}
                        subtitle={section.title}
                        icon={section.icon}
                        content={section.content}
                        delay={index * 500}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Container>
            </Box>
          </animated.div>
        </Container>
      </Box>
    </section>
  );
};

export default AboutUs;
