import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { authApi } from "../axios";
import { Form } from "./form";

export const LoginForm = () => {
  const navigate = useNavigate();
  const submit = async (values) => {
    const res = await authApi.login(values.email, values.password);
    if (res.status === 200) {
      sessionStorage.setItem("jwt_token", res.data.token);
      navigate("/dashboard");
    }
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
