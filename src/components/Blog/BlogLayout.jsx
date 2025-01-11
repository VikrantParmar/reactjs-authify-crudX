import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  CardMedia,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, resetBlogs } from "@/store/blogs/blogSlice"; // Make sure the path is correct
import AnimateButton from "../@extended/AnimateButton";
import { _loader } from "@/utils/loaderHelper";

const BlogLayout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { blogs, isLoading, rowCount } = useSelector((state) => state.blogs);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [isFetching, setIsFetching] = useState(false); // Control API call throttling

  useEffect(() => {
    dispatch(resetBlogs());
  }, []);
  // Fetch blogs whenever the `page` changes
  useEffect(() => {
    const fetchBlogsData = async () => {
      setIsFetching(true); // Mark as fetching to prevent duplicate calls
      await dispatch(fetchBlogs({ pageIndex: pageIndex, pageSize: pageSize }));
      setIsFetching(false); // Mark as not fetching after the API call
    };

    fetchBlogsData();
  }, [dispatch, pageIndex]);

  // Handle scroll event for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const isBottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50; // Add a buffer of 50px to avoid strict edge issues
      // Only load the next page if conditions are met
      if (
        isBottomReached &&
        blogs.length < rowCount &&
        !isFetching &&
        !isLoading
      ) {
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blogs, rowCount, isFetching, isLoading]);

  return (
    <section className="blogs-page">
      <Box className="blogs">
        <Container maxWidth="lg">
          <Box className="blog-list">
            <Container>
              <Box
                className="section-head"
                sx={{ marginBottom: 6, textAlign: "center" }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, position: "relative", mb: 5 }}
                >
                  <span>Articles</span>
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
                  To implement pagination for articles using infinite scroll on
                  a webpage, <br />
                  dynamically load additional content as the user scrolls
                  downward.
                </Typography>
                <Divider />
                <Typography variant="h6" textAlign="right" sx={{ mt: 2 }}>
                  <Chip
                    sx={{
                      px: 1,
                      fontWeight: "bold",
                      height: 50,
                      fontSize: "1rem",
                    }}
                    avatar={
                      <Avatar
                        sx={{
                          backgroundColor: "primary.main",
                          color: "#FAE3CF !important",
                          fontWeight: "bold",
                          width: "36px !important",
                          height: "36px !important",

                          fontSize: "1rem !important",
                        }}
                      >
                        {rowCount}
                      </Avatar>
                    }
                    label="Total Records"
                  />
                </Typography>
              </Box>
              {/* Blog List */}
              <Grid container spacing={5} justifyContent="left">
                {blogs.length > 0
                  ? blogs.map((blog, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                          sx={{
                            backgroundColor: "#FFF",
                            color: "primary.main",
                            boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 0 4px #0A0F24",
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={
                                blog.blog_image_url.original ||
                                `https://placehold.co/600x400?text=No+Image`
                              }
                              alt={blog.title}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://placehold.co/600x400?text=No+Image";
                              }}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {blog.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                              >
                                {blog.content}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <Typography variant="body2">
                                {blog.formatted_created_at || "N/A"}
                              </Typography>
                              <AnimateButton>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                  disabled={isLoading}
                                >
                                  View
                                </Button>
                              </AnimateButton>
                            </Box>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  : !isFetching && (
                      <Grid item xs={12} textAlign="center">
                        <Typography variant="h6" color="text.secondary">
                          No blogs available
                        </Typography>
                      </Grid>
                    )}
              </Grid>
              {isFetching && _loader({ type: "" })}
            </Container>
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default BlogLayout;
