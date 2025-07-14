import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage"
import ProdutosPage from "../pages/ProdutosPage";
import ProdutoPage from "../pages/ProdutoPage";
import LoginPage from "../pages/LoginPage";
import ContatosPage from "../pages/ContatosPage";
import CardsPorSlugCategoriaPage from "../pages/CardsPorSlugCategoriaPage";
import CarrinhoPage from "../pages/CarrinhoPage";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>Erro ao carregar a página</div>,
      children: [
        {
          path: "",
          element: <HomePage />,
          children: [
            {
              path: ":slugCategoria?",
              element: <CardsPorSlugCategoriaPage />,
            },
          ],
        },
        { path: "produtos", element: <ProdutosPage /> },
        { path: "produto/:id", element: <ProdutoPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "contatos", element: <ContatosPage /> },
        { path: "carrinho", element: <CarrinhoPage /> }
      ],
    },
  ]
);

export default router;
