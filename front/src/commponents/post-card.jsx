import { Card, CardContent, Typography } from "@mui/material";
import { Profile } from "./profile";
export const PostCard = ({ userId, username, text, createAt }) => {
  return (
    <Card sx={{ minWidth: "320px", minHeight: "160px" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Profile avatarSrc={""} fullName={username} userId={userId} />
        <Typography>{text}</Typography>
        <Typography variant="body2">Posted: {createAt}</Typography>
      </CardContent>
    </Card>
  );
};
