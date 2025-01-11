import { Typography, Paper } from "@mui/material";
const AdminPanel = () => {
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
          This is ADMIN PANEL!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          Use this route to Manage Admin
        </Typography>
      </Paper>
    </>
  );
};
export default AdminPanel;
