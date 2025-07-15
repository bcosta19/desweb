import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Logo from "../assets/logo.png"
const NavBar = () => {
  const [usuario, setUsuario] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const nomeUsuario = localStorage.getItem("usuario");
    setUsuario(nomeUsuario);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
  };


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
              <NavLink className="nav-link" aria-current="page" to="/carrinho">
                Carrinho
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/contatos">
                Contatos
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link disabled">
                    <strong>{usuario}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                    Sair
                  </button>
                </li>
              </>
            ) :

              (<li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/login">
                  Login
                </NavLink>
              </li>)}
          </ul>

        </div>

      </div>
    </nav>
  )

}

export default NavBar;
