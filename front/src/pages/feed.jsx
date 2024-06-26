import { Button } from "@mui/material";
import { PostList } from "../commponents/post-list.jsx";
import { useNavigate } from "react-router-dom";
export const FeedPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => navigate("/feed/add-post")}
        variant="contained"
        component="label"
        fullWidth
      >
        Create post
      </Button>
      <PostList />
    </>
  );
};
