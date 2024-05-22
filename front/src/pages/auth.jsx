import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { GoogleLoginButton } from "../commponents/google-login-button";
import { LoginForm } from "../commponents/login-form";
import { RegistrationForm } from "../commponents/registration-form";
export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "520px",
        }}
      >
        <Button
          onClick={() => {
            setIsLogin((prev) => !prev);
          }}
          variant="contained"
        >
          Move to {isLogin ? "Registration" : "Login"}
        </Button>
        {isLogin ? <LoginForm /> : <RegistrationForm />}
        <GoogleLoginButton />
      </Box>
    </Container>
  );
};
