import { Box } from "@mui/material";

export const CardList = ({
  data = [],
  cardProps = {},
  component = "div",
  children = "",
  ...args
}) => {
  const Component = component;
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
      {...args}
    >
      {data.length &&
        data.map((elem) => {
          return (
            <Component {...cardProps} key={elem?.id} {...elem}>
              {children}
            </Component>
          );
        })}
    </Box>
  );
};
