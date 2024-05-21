import { useEffect, useState } from "react";
import { postApi } from "../axios";
import { PostCard } from "./post-card";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { convertDateFromSecondsToString } from "../utils/convertDate";
import { CardList } from "./card-list";
export const PostList = ({ posts = [] }) => {
  const [data, setData] = useState([]);
  const getPosts = async () => {
    const res = await postApi.getAll();
    setData(res.data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <CardList
        data={data?.map(({ createdAt, ...rest }) => {
          return {
            onClick: () => navigate(`/feed/post/${rest.id}`),
            postedAt: convertDateFromSecondsToString(createdAt._seconds),
            ...rest,
          };
        })}
        component={PostCard}
      />
    </Box>
  );
};
