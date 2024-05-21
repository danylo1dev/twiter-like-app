import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const useIsLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("jwt_token");
    if (storedToken) {
      navigate("dashboard");
    } else {
      navigate("/");
    }
  }, []);
};
