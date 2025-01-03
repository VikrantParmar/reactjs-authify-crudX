import { Box, CircularProgress, Stack, Button } from "@mui/material";
//export function _loader({type = 1, isSubmitting = false, isAdd = true, btnTitle = ''}) {
export function _loader({
  type,
  isSubmitting = false,
  isAdd = 1,
  btnTitle = "",
}) {
  if (type === "body") {
    return (
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgcolor="rgba(255, 255, 255, 0.8)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={1}
      >
        <CircularProgress />
      </Box>
    );
  } else if (type === "crud") {
    return isSubmitting ? (
      <CircularProgress color="inherit" size={20} />
    ) : Boolean(isAdd) ? (
      "Update"
    ) : (
      "Add"
    );
  } else if (type === "btn") {
    return isSubmitting ? (
      <>
        <CircularProgress color="inherit" size={20} />
        &nbsp;{btnTitle}
      </>
    ) : (
      btnTitle
    );
  } else if (type === "w") {
    return isSubmitting ? (
      <CircularProgress color="inherit" size={20} />
    ) : (
      "Next"
    );
  } else {
    return (
      <Box sx={{ p: 5 }}>
        <Stack direction="row" justifyContent="center">
          <CircularProgress color="inherit" size={20} />
          &nbsp;Loading...
        </Stack>
      </Box>
    );
  }
}
