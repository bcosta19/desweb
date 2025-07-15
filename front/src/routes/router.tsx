import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage"
import ProdutosPage from "../pages/ProdutosPage";
import ProdutoPage from "../pages/ProdutoPage";
import LoginPage from "../pages/LoginPage";
import ContatosPage from "../pages/ContatosPage";
import CardsPorSlugCategoriaPage from "../pages/CardsPorSlugCategoriaPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import CadastroUsuario from "../pages/CadastroUsuario";
import FavoritosPage from "../pages/FavoritosPage";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>Erro ao carregar a página</div>,
      children: [
        {
          path: "", element: <HomePage />,
          children: [
            {
              path: "",
              element: <CardsPorSlugCategoriaPage />
            },
            { path: "categoria/:slugCategoria", element: <CardsPorSlugCategoriaPage /> },
          ]
        },
        { path: "produtos", element: <ProdutosPage /> },
        { path: "produto/:id", element: <ProdutoPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "contatos", element: <ContatosPage /> },
        { path: "carrinho", element: <CarrinhoPage /> },
        { path: "cadastro", element: <CadastroUsuario /> },
        { path: "favoritos", element: <FavoritosPage /> }
      ],
    },
  ]
);

export default router;
