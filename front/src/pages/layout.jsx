import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../commponents/header.jsx";

export const Layout = () => {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};
