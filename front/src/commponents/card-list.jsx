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
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {data.length &&
        data.map(({ id, username, text, createdAt, userId }) => {
          const date = new Date(createdAt._seconds * 1000);
          const month =
            (date.getMonth() + 1).length > 1
              ? date.getMonth() + 1
              : `0${date.getMonth() + 1}`;
          return (
            <PostCard
              key={id}
              text={text}
              username={username}
              userId={userId}
              createAt={`${date.getDate()}.${month}.${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`}
            />
          );
        })}
    </Box>
  );
};
