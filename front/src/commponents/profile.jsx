import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export const Profile = ({ avatarSrc, fullName, userId }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <Link to={userId}>
        <Avatar
          alt="Remy Sharp"
          src={avatarSrc}
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {}}
        />
      </Link>
      <Link to={userId}>
        <Typography
          sx={{
            ":hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
          onClick={() => {}}
        >
          {fullName}
        </Typography>
      </Link>
    </Box>
  );
};
