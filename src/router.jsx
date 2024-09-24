import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import { Layout } from "./components/Layout/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

export default router;
