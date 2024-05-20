import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../commponents/header.jsx";
import { CardList } from "../commponents/card-list.jsx";

export const Layout = () => {
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
