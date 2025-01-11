import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  CardMedia,
  Card,
  CardContent,
} from "@mui/material";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@mui/material/styles";
const AboutApp = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const fadeInUp = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1500 },
  });
  const bounceIn = useSpring({
    transform: inView ? "scale(1)" : "scale(0.5)",
    opacity: inView ? 1 : 0,
    config: { tension: 170, friction: 26 },
  });
  return (
    <section className="home-about-tech">
      <Box className="why-tech">
        <Container maxWidth="lg">
          <animated.div style={fadeInUp}>
            <Box className="about-tech">
              <Container>
                <Box
                  className="section-head"
                  sx={{ marginBottom: 6, textAlign: "center" }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, position: "relative", mb: 5 }}
                  >
                    <span>Credits</span>
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
                    This platform leverages the power of ReactJS, Laravel, and
                    Material UI to deliver a seamless, dynamic, and highly
                    interactive experience. <br />
                    It empowers users to explore innovative ideas, exchange
                    valuable insights, and elevate their learning journey in an
                    inspiring and engaging manner.
                  </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center" ref={ref}>
                  <Grid item xs={12} sm={6} md={4}>
                    <animated.div style={bounceIn}>
                      <Card
                        sx={{
                          backgroundColor: "#FFF",
                          // backgroundColor: "primary.main",
                          color: "primary.main",
                          boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 0 4px rgba(0, 158, 255, 1)",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image="/react.svg"
                          alt="React Logo"
                          sx={{
                            objectFit: "fill",
                          }}
                        />
                        <CardContent
                          sx={{
                            backgroundColor: "secondary.main",
                            color: "primary.main",
                          }}
                        >
                          <Typography variant="h6" component="div">
                            ReactJS
                          </Typography>
                          <Typography variant="body2" color="text.main">
                            A powerful JavaScript library for building dynamic
                            and responsive user interfaces, driving seamless
                            frontend panel experiences.
                          </Typography>
                        </CardContent>
                      </Card>
                    </animated.div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <animated.div style={bounceIn}>
                      <Card
                        sx={{
                          //backgroundColor: "#FF2D20",
                          backgroundColor: "#FFF",
                          // backgroundColor: "primary.main",
                          color: "primary.main",
                          boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 0 4px rgba(255, 45, 32, 1)",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image="/laravel.svg"
                          alt="Laravel Logo"
                          sx={{
                            objectFit: "fill",
                          }}
                        />
                        <CardContent
                          sx={{
                            backgroundColor: "secondary.main",
                            color: "primary.main",
                          }}
                        >
                          <Typography variant="h6" component="div">
                            Laravel
                          </Typography>
                          <Typography variant="body2" color="text.main">
                            A robust PHP framework designed to build scalable,
                            high-performance web applications and RESTful APIs
                            with ease.
                          </Typography>
                        </CardContent>
                      </Card>
                    </animated.div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <animated.div style={bounceIn}>
                      <Card
                        sx={{
                          backgroundColor: "#FFF",
                          // backgroundColor: "primary.main",
                          color: "primary.main",
                          boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 0 4px rgba(25, 118, 210, 1)",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image="/material-ui.svg"
                          alt="Material UI Logo"
                          sx={{
                            objectFit: "fill",
                          }}
                        />
                        <CardContent
                          sx={{
                            backgroundColor: "secondary.main",
                            color: "primary.main",
                          }}
                        >
                          <Typography variant="h6" component="div">
                            Material UI
                          </Typography>
                          <Typography variant="body2" color="text.main">
                            A premier React UI framework for creating sleek,
                            modern, and responsive interfaces with consistent
                            design
                          </Typography>
                        </CardContent>
                      </Card>
                    </animated.div>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </animated.div>
        </Container>
      </Box>
    </section>
  );
};

export default AboutApp;
