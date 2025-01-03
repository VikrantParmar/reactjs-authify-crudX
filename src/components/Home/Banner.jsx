import { Typography, Paper } from "@mui/material";
const Banner = () => {
  return (
    <>
      <Paper className="home-banner">
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
          }}
        >
          Welcome To {import.meta.env.VITE_APP_NAME} !
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          Designing Innovative Solutions Inspired by Excellence
        </Typography>
      </Paper>
    </>
  );
};
export default Banner;
