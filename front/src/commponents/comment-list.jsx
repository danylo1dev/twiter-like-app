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
    const res = await commentApi.getAll(postId);
    setData(res.data);
  };
  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
