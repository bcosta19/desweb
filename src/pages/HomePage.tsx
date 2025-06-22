import { NavLink, Outlet } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="row">
      <div className="col-lg-2">
        <nav className="nav nav-pills d-flex flex-column">
          <h5>Categorias</h5>

          <NavLink className="nav-link" aria-current="page" to="/desweb">
            Todos
          </NavLink>

          <NavLink className="nav-link" to="/varas">
            Varas
          </NavLink>

          <NavLink className="nav-link" to="/linhas">
            Linhas
          </NavLink>

          <NavLink className="nav-link" to="/carretilhas">
            Carretilhas
          </NavLink>

          <NavLink className="nav-link" to="/chumbadas">
            Chumbadas
          </NavLink>
        </nav>
        <div className="col-lg-10">
          <Outlet />
        </div>
      </div>

    </div>



  )
}

export default HomePage
