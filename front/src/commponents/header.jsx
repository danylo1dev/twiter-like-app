import { Box, Container, Typography, useTheme } from "@mui/material";
import { Profile } from "./profile";
export const Header = () => {
  const theme = useTheme();
  console.log(theme.palette.primary);
  return (
    <Box
      component={"header"}
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: "8px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Twiter</Typography>
        <Box>
          <Profile avatarSrc={""} fullName={"Cool Dude"} userId={"dkaskdks"} />
        </Box>
      </Container>
    </Box>
  );
};
