import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { getUsuario, logout, isAdmin } from "../hooks/useAuth";

const NavBar = () => {
  const [conta, setConta] = useState<string | null>(null);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = getUsuario();
    if (usuario) {
      setConta(usuario.conta);
      setAdmin(isAdmin());
    }
  }, []);

  const handleLogout = () => {
    logout();
    setConta(null);
    setAdmin(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1B4F72" }}>
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={Logo} alt="logo" style={{ width: "50px" }} />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/produtos">Produtos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/carrinho">Carrinho</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/favoritos">Favoritos</NavLink></li>
            {/* Apenas admins veem o link de cadastrar produto */}
            {admin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/produtos/novo">Cadastrar Produto</NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {conta ? (
              <>
                <li className="nav-item">
                  <span className="nav-link disabled"><strong>{conta}</strong>{admin && " (Admin)"}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>Sair</button>
                </li>
              </>
            ) : (
              <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
