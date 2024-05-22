import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const Profile = ({ avatarSrc, fullName, userId }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <Avatar
        onClick={() => {
          navigate("/user/" + userId);
        }}
        alt="Remy Sharp"
        src={avatarSrc}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      />
      <Typography
        sx={{
          ":hover": {
            cursor: "pointer",
            textDecoration: "underline",
          },
        }}
        onClick={() => {
          navigate("/user/" + userId);
        }}
      >
        {fullName}
      </Typography>
    </Box>
  );
};
