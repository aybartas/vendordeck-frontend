import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  message?: string;
}

export default function Loading({ message }: Props) {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        invisible={true}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress size={100} color="inherit" />
          <Typography
            variant="h4"
            sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
          >
            {message}
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
}
