import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

const router = createBrowserRouter(
  [
    {
      path: "desweb/",
      element: <Layout />,



    }
  ]

);

export default router;
