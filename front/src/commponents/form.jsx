import { Box, Button, TextField } from "@mui/material";
export const Form = ({ formik }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
      {Object.keys(formik.values).map((name) => {
        return (
          <TextField
            key={`${name}`}
            id={`${name}`}
            label={`${name}`}
            type={`${name}`}
            name={`${name}`}
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
        );
      })}
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};
