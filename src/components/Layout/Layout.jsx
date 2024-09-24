import { Header } from "../Header/Header";
import { Outlet, useMatch } from "react-router-dom";

export const Layout = () => {
  const match = useMatch("/product/*");

  return (
    <main className="app">
      <Header hideSearch={match} />
      <div className="container mb-2">
        <Outlet />
      </div>
    </main>
  );
};
