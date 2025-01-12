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
  IconButton,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, resetBlogs, deleteBlog } from "@/store/blogs/blogSlice";
import AnimateButton from "@/components/@extended/AnimateButton";
import { _loader } from "@/utils/loaderHelper";
import { useAuth } from "@/hooks/useAuth";
import { AddOutlined, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { NotificationMessage } from "@/components/@extended/NotificationMessage";
import AlertRecordDelete from "./AlertRecordDelete";
import config from "@/config";
const MyBlog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const adminRoleId = config.roles.ADMIN_ROLE_ID;
  const { blogs, isLoading, rowCount } = useSelector((state) => state.blogs);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [isFetching, setIsFetching] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user.role_id === adminRoleId);
  // Modal states for deleting a blog
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    dispatch(resetBlogs());
  }, []);
  // Fetch blogs whenever the `page` changes
  useEffect(() => {
    const fetchBlogsData = async () => {
      setIsFetching(true);
      await dispatch(
        fetchBlogs({
          pageIndex: pageIndex,
          pageSize: pageSize,
          isAuthenticated: isAuthenticated,
          isAdmin: isAdmin,
        })
      );
      setIsFetching(false);
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
  const handleAddArticle = () => {
    navigate("/article-post");
  };
  const handleEditClick = (blog) => {
    navigate(`/article-post/${blog?.id}`, { state: { blog } });
  };
  const handleDeleteClick = (blog) => {
    setSelectedRecord(blog);
    setIsModalDeleteOpen(true);
  };

  const handleDeleteBlog = (deletedBlog) => {
    if (deletedBlog) {
      dispatch(
        fetchBlogs({
          pageIndex: pageIndex,
          pageSize: pageSize,
          isAuthenticated: isAuthenticated,
          isAdmin: isAdmin,
        })
      );
    }
  };
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
                  {isAdmin ? (
                    <span>All Articles</span>
                  ) : (
                    <span>My Articles</span>
                  )}
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
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    {!isAdmin && (
                      <AnimateButton>
                        <Button
                          onClick={handleAddArticle}
                          variant="contained"
                          startIcon={<AddOutlined />}
                        >
                          Add Article
                        </Button>
                      </AnimateButton>
                    )}
                  </Grid>

                  <Grid item>
                    <Typography variant="h6" textAlign="right" sx={{ mt: 2 }}>
                      <Chip
                        sx={{
                          px: 1,
                          fontWeight: "bold",
                          height: 50,
                          fontSize: "1rem",
                        }}
                        avatar={
                          <Avatar className="avatar-art-count">
                            {rowCount}
                          </Avatar>
                        }
                        label="Total Records"
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Grid container spacing={5} justifyContent="left">
                {!isAdmin && (
                  <Grid item xs={12} sm={12} md={12} key={"A"}>
                    <NotificationMessage
                      data={{
                        status: false,
                        message:
                          "The article you created should not be published due to data publishing restrictions.<br/>It is currently only accessible to you under your account.",
                      }}
                    />
                  </Grid>
                )}

                {blogs.length > 0
                  ? blogs.map((blog, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className="article-card">
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={
                                isAdmin
                                  ? blog.blog_image_url?.original ||
                                    "https://placehold.co/600x400?text=No+Image"
                                  : `https://placehold.co/600x400?text=${blog.title}`
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
                                &nbsp; {blog.formatted_created_at || "N/A"}
                              </Typography>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                {!isAdmin && (
                                  <>
                                    <AnimateButton>
                                      <IconButton
                                        color="primary"
                                        onClick={() => handleEditClick(blog)}
                                      >
                                        <Edit />
                                      </IconButton>
                                    </AnimateButton>
                                    <AnimateButton>
                                      <IconButton
                                        color="error"
                                        onClick={() => handleDeleteClick(blog)}
                                      >
                                        <Delete />
                                      </IconButton>
                                    </AnimateButton>
                                  </>
                                )}
                              </Box>
                            </Box>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  : !isFetching && (
                      <Grid item xs={12} textAlign="center">
                        <Typography variant="h6" color="text.secondary">
                          No articles are available at the moment.
                        </Typography>
                      </Grid>
                    )}
              </Grid>
              {isFetching && _loader({ type: "" })}
            </Container>
          </Box>
        </Container>
      </Box>
      <AlertRecordDelete
        id={Number(selectedRecord?.id)}
        onClose={() => setIsModalDeleteOpen(false)}
        recordData={selectedRecord}
        open={isModalDeleteOpen}
        onSuccess={handleDeleteBlog}
      />
    </section>
  );
};

export default MyBlog;
