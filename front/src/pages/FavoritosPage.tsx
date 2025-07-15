import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Produto } from "../interface/Produto";

const FavoritosPage = () => {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const usuarioJSON = localStorage.getItem("usuarioLogado");
    if (!usuarioJSON) {
      navigate("/login");
      return;
    }

    const usuario = JSON.parse(usuarioJSON);
    console.log(usuario);
    const id = usuario.id;

    fetch(`http://localhost:8080/usuarios/${id}/favoritos`)
      .then(async (resp) => {
        if (!resp.ok) throw new Error(await resp.text());
        return resp.json();
      })
      .then((dados: Produto[]) => {
        setFavoritos(dados);
        setCarregando(false);
      })
      .catch((err) => {
        setErro(err.message || "Erro ao buscar favoritos");
        setCarregando(false);
      });
  }, [navigate]);

  if (carregando) {
    return <div className="text-center mt-4">Carregando favoritos...</div>;
  }

  if (erro) {
    return <div className="alert alert-danger mt-4">{erro}</div>;
  }

  if (favoritos.length === 0) {
    return <div className="mt-4">Você ainda não possui produtos favoritos.</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Meus Favoritos</h2>
      <div className="row">
        {favoritos.map((produto) => (
          <div key={produto.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={`/${produto.imagem}`}
                className="card-img-top"
                alt={produto.nome}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text">{produto.descricao}</p>
                <p className="fw-bold">R$ {produto.preco?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritosPage;

