import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const useIsLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("jwt_token");
    if (storedToken) {
      navigate("feed");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
