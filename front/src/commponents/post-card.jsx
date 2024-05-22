import { Button, Card, CardContent, Typography } from "@mui/material";
import { Profile } from "./profile";
export const PostCard = ({
  userId,
  username,
  text,
  postedAt,
  onClick,
  ...args
}) => {
  console.log(onClick);
  return (
    <Card {...args} sx={{ minWidth: "320px", minHeight: "160px" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Profile avatarSrc={""} fullName={username} userId={userId} />
        <Typography>{text}</Typography>

        {onClick && <Button onClick={() => onClick()}>Show more</Button>}
        <Typography variant="body2">Posted: {postedAt}</Typography>
      </CardContent>
    </Card>
  );
};
