import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImg } from "../firebase/storage";
export const Profile = ({ avatarSrc, fullName, userId, provider }) => {
  const navigate = useNavigate();
  const [src, setSrc] = useState("");
  const getSrc = async () => {
    if (avatarSrc) {
      if (avatarSrc.includes("googleusercontent")) {
        setSrc(avatarSrc);
        return;
      }
      console.log(avatarSrc);
      const res = await getImg(avatarSrc);
      setSrc(res);
    }
  };
  useEffect(() => {
    getSrc();
  }, [avatarSrc]);
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
        src={src}
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
