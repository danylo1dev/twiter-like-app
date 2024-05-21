import { useEffect, useState } from "react";
import { commentApi, postApi } from "../axios";
import { convertDateFromSecondsToString } from "../utils/convertDate";
import { CardList } from "./card-list";
import { PostCard } from "./post-card";
import { useSearchParams, useParams } from "react-router-dom";
export const CommentList = ({ posts = [] }) => {
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
    />
  );
};
