import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddPostForm } from "../commponents/add-post-form";

export const AddPostPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => navigate("/feed")}
        variant="contained"
        component="label"
        fullWidth
        sx={{ marginBottom: "16px" }}
      >
        back to feed
      </Button>
      <AddPostForm />
    </>
  );
};
