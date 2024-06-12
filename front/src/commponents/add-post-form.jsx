import React from "react";
import { Formik, useField } from "formik";
import { TextareaAutosize, Button, Box } from "@mui/material";
import { postApi } from "../axios";

export const AddPostForm = () => {
  const [image, setImage] = React.useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Formik
      initialValues={{
        text: "",
        image: null,
      }}
      onSubmit={(values) => {
        postApi.create(values);
      }}
    >
      {({ values, handleSubmit, errors, touched }) => (
        <Box
          component={"form"}
          sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          onSubmit={handleSubmit}
        >
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder="Minimum 3 rows"
            id="text"
            name="text"
            label="Текст"
            required={true}
            value={values.text}
            onChange={(event) => (values.text = event.target.value)}
            error={errors.text && touched.text}
            helperText={errors.text && touched.text && errors.text}
          />

          <Button variant="contained" component="label">
            Оберіть зображення
            <input
              type="file"
              required={true}
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {image && <img src={image} alt="Завантажене зображення" />}

          <Button type="submit" variant="contained">
            Відправити
          </Button>
        </Box>
      )}
    </Formik>
  );
};
