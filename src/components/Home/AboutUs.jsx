import { Container, Typography, Stack, Box, Avatar } from "@mui/material";
import TeamIcon from "@mui/icons-material/Group";
const AboutUs = () => {
  return (
    <section className="home-about-us">
      <Box className="about-us">
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
          >
            About Me
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign="center"
            sx={{ mb: 4 }}
          >
            I am dedicated to providing innovative solutions to make your life
            easier. My mission is to deliver high-quality products that exceed
            expectations.
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            <Box textAlign="center" sx={{ maxWidth: 300 }}>
              <Avatar
                className="bg-demonix-red"
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                }}
              >
                <TeamIcon fontSize="large" className="text-secondary" />
              </Avatar>
              <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                My Mission
              </Typography>
              <Typography variant="body2" color="textSecondary">
                To create user-friendly, modern, and scalable solutions.
              </Typography>
            </Box>

            <Box textAlign="center" sx={{ maxWidth: 300 }}>
              <Avatar
                className="bg-demonix-red"
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                }}
              >
                <TeamIcon fontSize="large" className="text-secondary" />
              </Avatar>
              <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                My Vision
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Innovating the future, one step at a time.
              </Typography>
            </Box>

            <Box textAlign="center" sx={{ maxWidth: 300 }}>
              <Avatar
                className="bg-demonix-red"
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                }}
              >
                <TeamIcon fontSize="large" className="text-secondary" />
              </Avatar>
              <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                My Values
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Integrity, creativity, and commitment to excellence.
              </Typography>
            </Box>

            <Box textAlign="center" sx={{ maxWidth: 300 }}>
              <Avatar
                className="bg-demonix-red"
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                }}
              >
                <TeamIcon fontSize="large" className="text-secondary" />
              </Avatar>
              <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                Join Me
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Be a part of my journey toward meaningful impact.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </section>
  );
};
export default AboutUs;
