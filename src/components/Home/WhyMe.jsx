import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { useTheme } from "@mui/material/styles";
import FeatureCard from "./FeatureCard";
import {
  History,
  SupportAgent,
  AttachMoney,
  Web,
  Code,
  Storage,
  Schedule,
  People,
  Devices,
  DataUsage,
  TrendingUp,
  AppRegistration,
  DeviceHub,
  ThumbUp,
  AutoMode,
  TipsAndUpdates,
  VerifiedUser,
  IntegrationInstructions,
} from "@mui/icons-material";
const WhyMe = () => {
  const theme = useTheme();

  const fadeInUp = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1500 },
  });

  const features = [
    {
      title: "10+ Years of Expertise",
      icon: <History fontSize="large" />,
      content:
        "A decade of delivering innovative solutions and successful outcomes.",
    },
    {
      title: "24/7 Customer Support",
      icon: <SupportAgent fontSize="large" />,
      content:
        "Access reliable support anytime, ensuring peace of mind for you.",
    },
    {
      title: "Cost-Effective Solutions",
      icon: <AttachMoney fontSize="large" />,
      content:
        "Affordable services without compromising on quality or performance.",
    },
    {
      title: "Complete Fullstack Development",
      icon: <Web fontSize="large" />,
      content:
        "End-to-end solutions, from frontend to backend, to meet all your needs.",
    },
    {
      title: "Dynamic Frontend Development",
      icon: <Code fontSize="large" />,
      content:
        "Designing user-friendly and interactive interfaces for seamless experiences.",
    },
    {
      title: "Robust Backend Development",
      icon: <Storage fontSize="large" />,
      content:
        "Crafting scalable and secure backend systems to power your business.",
    },
    {
      title: "Agile Methodology",
      icon: <AutoMode fontSize="large" />,
      content:
        "Adapting quickly to change for fast and efficient project delivery.",
    },
    {
      title: "Guaranteed On-Time Delivery",
      icon: <Schedule fontSize="large" />,
      content: "Delivering projects on schedule without compromising quality.",
    },
    {
      title: "Collaborative Partnership",
      icon: <People fontSize="large" />,
      content:
        "Working closely with clients to bring their vision to life and ensure success.",
    },
    {
      title: "Tailored Solutions",
      icon: <TipsAndUpdates fontSize="large" />,
      content:
        "Custom solutions designed to meet your unique business challenges.",
    },
    {
      title: "Next-Gen Technology Stack",
      icon: <Devices fontSize="large" />,
      content:
        "Utilizing the latest technologies for superior performance and security.",
    },
    {
      title: "Top-Notch Security",
      icon: <VerifiedUser fontSize="large" />,
      content:
        "Implementing advanced security protocols to protect your data and application.",
    },
    {
      title: "Clean & High-Quality Code",
      icon: <IntegrationInstructions fontSize="large" />,
      content:
        "Writing maintainable, efficient, and high-standard code for long-term success.",
    },
    {
      title: "Scalable Infrastructure",
      icon: <DataUsage fontSize="large" />,
      content:
        "Building scalable solutions that grow seamlessly with your business.",
    },
    {
      title: "Business Growth Enablement",
      icon: <TrendingUp fontSize="large" />,
      content:
        "Helping businesses scale successfully with tailored strategies and solutions.",
    },
    {
      title: "Rapid Prototyping",
      icon: <AppRegistration fontSize="large" />,
      content:
        "Quick prototypes to gather feedback and accelerate project iterations.",
    },
    {
      title: "Cross-Platform Expertise",
      icon: <DeviceHub fontSize="large" />,
      content:
        "Developing applications that deliver consistent performance across all platforms.",
    },
    {
      title: "Client-Centric Approach",
      icon: <ThumbUp fontSize="large" />,
      content:
        "Focused on providing exceptional service and exceeding client expectations.",
    },
  ];

  return (
    <section className="home-why-me">
      <Box className="why-me">
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
                    <span>Why Choose</span> Me?
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
                    With a decade of excellence in web development, partnering
                    with me ensures you benefit from my proven expertise and
                    innovative solutions.
                  </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                  {features.map((feature, index) => (
                    <FeatureCard
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      content={feature.content}
                    />
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
