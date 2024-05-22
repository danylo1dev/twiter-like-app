import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { commentApi } from "../axios";
import { Form } from "./form";

export const CommentForm = () => {
  const { postId } = useParams();
  const submit = async (values) => {
    await commentApi.create({ postId, ...values });
  };
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: submit,
  });
  return <Form formik={formik} />;
};
