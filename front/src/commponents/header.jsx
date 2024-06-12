/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Typography, useTheme } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { authApi } from "../axios";
import { Profile } from "./profile";
import { Link } from "react-router-dom";
export const Header = () => {
  const theme = useTheme();
  const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState();
  const getMe = async () => {
    const res = await authApi.getProfile(userId);
    console.log(res.data);
    setProfile(res.data);
  };
  useEffect(() => {
    const storedToken = sessionStorage.getItem("jwt_token");
    const decoded = jwtDecode(storedToken);
    setUserId(decoded.sub);
  }, []);
  useEffect(() => {
    if (userId) {
      getMe();
    }
  }, [userId]);

  return (
    <Box
      component={"header"}
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: "8px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Twiter</Typography>
        <Box>
          {profile && (
            <Profile
              fullName={
                profile ? profile.firstName + " " + profile.lastName : "Loading"
              }
              userId={userId}
              avatarSrc={profile.photoURL}
              provider={profile.provider}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};
