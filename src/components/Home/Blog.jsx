import {
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Box,
  CardActions,
} from "@mui/material";

const Blog = () => {
  return (
    <>
      <section style={{ padding: "50px 0" }}>
        <Typography variant="h4" gutterBottom align="center">
          Blog Articles
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ flexWrap: "wrap", justifyContent: "center" }}
        >
          {[1, 2, 3].map((blog) => (
            <Box
              key={blog}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 16px)",
                  md: "calc(33.33% - 16px)",
                },
                marginBottom: { xs: 4, sm: 0 },
              }}
            >
              <Card sx={{ maxWidth: 345, margin: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://via.placeholder.com/400x140?text=Image1`}
                  alt={blog}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Blog Title {blog}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="primary">
                    Read More
                  </Button>
                  <Button size="small" variant="outlined" color="secondary">
                    View
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Stack>
      </section>

      <Paper
        className="home-banner"
        sx={{ backgroundColor: "#BB2233 !important" }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to {import.meta.env.VITE_APP_NAME} !
        </Typography>
        <Typography variant="h6">
          Designing Innovative Solutions Inspired by Excellence
        </Typography>
      </Paper>
    </>
  );
};
export default Blog;
