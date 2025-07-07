import { useLocation } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();

  // Função para verificar se a URL atual corresponde ao caminho do link
  const checkActive = (path: string) => {
    // Para "Todos", ele deve ser ativo apenas quando a URL for exatamente "/desweb/"
    if (location.pathname === path) return 'active';

    // Para as outras categorias, se a URL começa com "/desweb/{slugCategoria}", fica ativo
    if (location.pathname.startsWith(path)) return 'active';

    return '';
  };

  return (
    <div className="row">
      <div className="col-lg-2">
        <nav className="nav nav-pills d-flex flex-column">
          <h5>Categorias</h5>

          {/* Link para "Todos" */}
          <NavLink
            className={`nav-link ${checkActive("/desweb")}`}
            aria-current="page"
            to="/desweb"
          >
            Todos
          </NavLink>

          {/* Link para "Varas" */}
          <NavLink
            className={`nav-link ${checkActive("/desweb/varas")}`}
            to="/desweb/varas"
          >
            Varas
          </NavLink>

          {/* Link para "Linhas" */}
          <NavLink
            className={`nav-link ${checkActive("/desweb/linhas")}`}
            to="/desweb/linhas"
          >
            Linhas
          </NavLink>

          {/* Link para "Carretilhas" */}
          <NavLink
            className={`nav-link ${checkActive("/desweb/carretilhas")}`}
            to="/desweb/carretilhas"
          >
            Carretilhas
          </NavLink>

          {/* Link para "Chumbadas" */}
          <NavLink
            className={`nav-link ${checkActive("/desweb/chumbadas")}`}
            to="/desweb/chumbadas"
          >
            Chumbadas
          </NavLink>
        </nav>
      </div>
      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;

