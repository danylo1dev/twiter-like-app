import { Button, Card, CardContent, Typography } from "@mui/material";
import { Profile } from "./profile";
import { getImg } from "../firebase/storage";
import { useEffect, useState } from "react";
export const PostCard = ({
  userId,
  username,
  text,
  postedAt,
  onClick,
  fileUrl,
  userPhotoUrl,
  ...args
}) => {
  const [src, setSrc] = useState("");
  const getSrc = async () => {
    const res = await getImg(fileUrl);
    setSrc(res);
  };
  useEffect(() => {
    getSrc();
  }, [fileUrl]);
  return (
    <Card {...args} sx={{ minWidth: "320px", minHeight: "160px" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Profile avatarSrc={userPhotoUrl} fullName={username} userId={userId} />
        <Typography>{text}</Typography>
        {fileUrl && <img src={src} alt="foto" width="300px" />}
        {onClick && <Button onClick={() => onClick()}>Show more</Button>}
        <Typography variant="body2">Posted: {postedAt}</Typography>
      </CardContent>
    </Card>
  );
};
