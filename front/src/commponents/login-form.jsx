import { Button, Input } from "@mui/material";
import { useFormik } from "formik";
import { authApi } from "../axios";
import { Form } from "./form";

export const LoginForm = () => {
  const submit = async (values) => {
    const res = await authApi.login(values.email, values.password);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submit,
  });
  return <Form formik={formik} />;
};
