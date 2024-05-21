import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postApi } from "../axios";
import { CommentList } from "../commponents/comment-list";
import { PostCard } from "../commponents/post-card";
import { convertDateFromSecondsToString } from "../utils/convertDate";

export const PostPage = () => {
  const [data, setData] = useState(null);
  const { postId } = useParams();
  const getPost = async () => {
    const res = await postApi.getOneById(postId);
    console.log(res.data);
    setData(res.data);
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      {data && (
        <PostCard
          {...data}
          postedAt={convertDateFromSecondsToString(data?.createdAt?._seconds)}
        />
      )}
      <Typography>Comments</Typography>
      <CommentList />
    </>
  );
};
