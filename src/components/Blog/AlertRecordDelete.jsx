import PropTypes from "prop-types";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  Avatar,
  Typography,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { _loader } from "@/utils/loaderHelper";
import { PopupTransition } from "@/components/@extended/Transitions";
import AnimateButton from "@/components/@extended/AnimateButton";
import { useShowNotification } from "@/hooks/useShowNotification";
import { deleteBlog } from "@/store/blogs/blogSlice";

export default function BlogDeleteAlert({
  id,
  onClose,
  recordData,
  open,
  onSuccess,
}) {
  const { showNotification } = useShowNotification();
  const dispatch = useDispatch();
  const { isLoadingDelete: isLoading } = useSelector((state) => state.blogs);
  const deleteHandler = async () => {
    try {
      const response = await dispatch(deleteBlog(id)).unwrap();
      showNotification(
        response?.message || "Blog deleted successfully.",
        "success"
      );
      if (onSuccess) {
        onSuccess(response);
      }
      onClose();
    } catch (error) {
      showNotification(error?.message || "Blog could not be deleted.", "error");
    } finally {
      onClose();
    }
  };

  const blogTitle = recordData ? recordData.title : "";
  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="blog-delete-title"
      aria-describedby="blog-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar
            sx={{
              width: 72,
              height: 72,
              fontSize: "1.75rem",
              bgcolor: (theme) => theme.palette.error.main,
            }}
          >
            <DeleteOutlined />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Are you sure you want to delete this blog?
            </Typography>
            <Typography align="center">
              <Typography variant="subtitle1" component="span">
                &quot; {blogTitle} &quot;{" "}
              </Typography>
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimateButton>
              <Button
                fullWidth
                onClick={onClose}
                color="dark"
                variant="outlined"
              >
                Cancel
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button
                fullWidth
                color="error"
                variant="contained"
                onClick={deleteHandler}
                autoFocus
                sx={{ minWidth: "5vw" }}
                disabled={isLoading}
              >
                {_loader({
                  type: "btn",
                  isSubmitting: isLoading,
                  btnTitle: "Delete",
                })}
              </Button>
            </AnimateButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

BlogDeleteAlert.propTypes = {
  id: PropTypes.number,
  recordData: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};
