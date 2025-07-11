import { NavLink } from "react-router-dom"
import Logo from "../assets/logo.png"
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark" style={{ backgroundColor: "#1B4F72" }}>
      <div className="container">
        <NavLink className="navbar-brand" aria-current="page" to={"/"}>
          <img
            src={Logo} alt="logo" style={{ width: "50px" }}
          />

        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/produtos">
                Produtos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/contatos">
                Contatos
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/login">
                Login
              </NavLink>
            </li>
          </ul>

        </div>

      </div>
    </nav>
  )

}

export default NavBar;
