import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commentApi } from "../axios";
import { convertDateFromSecondsToString } from "../utils/convertDate";
import { CardList } from "./card-list";
import { PostCard } from "./post-card";
export const CommentList = ({ ...args }) => {
  const [data, setData] = useState([]);
  const { postId } = useParams();
  const getComments = async () => {
    console.log(postId);
    const res = await commentApi.getAll(postId);
    setData(res.data);
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <CardList
      data={data?.map(({ createdAt, ...rest }) => {
        return {
          postedAt: convertDateFromSecondsToString(createdAt._seconds),
          ...rest,
        };
      })}
      component={PostCard}
      {...args}
    />
  );
};
