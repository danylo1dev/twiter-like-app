import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postApi } from "../axios";
import { CommentForm } from "../commponents/comment-form";
import { CommentList } from "../commponents/comment-list";
import { PostCard } from "../commponents/post-card";
import { convertDateFromSecondsToString } from "../utils/convertDate";
export const PostPage = () => {
  const [data, setData] = useState(null);
  const { postId } = useParams();
  const getPost = async () => {
    const res = await postApi.getOneById(postId);
    setData(res.data);
  };
  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {data && (
        <PostCard
          {...data}
          postedAt={convertDateFromSecondsToString(data?.createdAt?._seconds)}
        />
      )}
      <Typography>Comments</Typography>
      <CommentList sx={{ paddingLeft: "16px" }} />
      <Typography>You can leave comment here</Typography>
      <CommentForm />
    </Box>
  );
};
