import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../commponents/header.jsx";
import { CardList } from "../commponents/card-list.jsx";
import { useIsLogin } from "../hooks/useIsLogin.js";

export const Layout = () => {
  useIsLogin();
  return (
    <div>
      <Header />
      <Container>
        <CardList />
        <Outlet />
      </Container>
    </div>
  );
};
