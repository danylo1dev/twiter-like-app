import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1">Twiter Like App</Typography>
      <Link to="/auth">
        <Button variant="contained">Login</Button>
      </Link>
    </Box>
  );
};
