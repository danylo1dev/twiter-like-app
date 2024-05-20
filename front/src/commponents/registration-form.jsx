import { useFormik } from "formik";
import { authApi } from "../axios";
import { Form } from "./form";

export const RegistrationForm = () => {
  const submit = async (values) => {
    const res = await authApi.register();
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
