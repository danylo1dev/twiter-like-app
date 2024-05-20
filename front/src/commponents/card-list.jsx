import { useEffect, useState } from "react";
import { postApi } from "../axios";
import { PostCard } from "./post-card";
import { Box } from "@mui/material";
export const CardList = ({ posts = [] }) => {
  const [data, setData] = useState([]);
  const getPosts = async () => {
    const res = await postApi.getAll();
    setData(res.data);
  };
  useEffect(() => {
    getPosts();
  }, []);
  console.log(data);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {data.length &&
        data.map(({ id, text, updatedAt }) => {
          return <PostCard key={id} text={text} createAt={updatedAt} />;
        })}
    </Box>
  );
};
