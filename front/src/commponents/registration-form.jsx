import { useFormik } from "formik";
import { authApi } from "../axios";
import { Form } from "./form";
import { useNavigate } from "react-router-dom";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const submit = async (values) => {
    const res = await authApi.register();
    if (res.status === 201) {
      sessionStorage.setItem("jwt_token", res.data.token);
      navigate("/dashboard");
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: submit,
  });
  return <Form formik={formik} />;
};
