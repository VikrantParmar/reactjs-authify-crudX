import {
  Typography,
  Paper,
} from "@mui/material";
const Banner = () => {
  return (
    <Paper className="home-banner">
      <Typography variant="h2" gutterBottom>
        Welcome to {import.meta.env.VITE_APP_NAME} !
      </Typography>
      <Typography variant="h6">
        Designing Innovative Solutions Inspired by Excellence
      </Typography>
    </Paper>
  );
};
export default Banner;
