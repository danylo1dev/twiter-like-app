import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authApi } from "../axios";
import { signInWithGoogleAndReturnCredential } from "../firebase/auth";
export const GoogleLoginButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={async () => {
        try {
          const cred = await signInWithGoogleAndReturnCredential();
          const response = await authApi.authByGoogle(cred);
          // eslint-disable-next-line eqeqeq
          if (response.status == 200) {
            sessionStorage.setItem("jwt_token", response.data.token);
            navigate("/feed");
          }
        } catch {}
      }}
      variant="contained"
    >
      Login by Google
    </Button>
  );
};
