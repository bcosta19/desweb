import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Produto } from "../interface/Produto";
import useCarrinho from "../hooks/useCarrinho";

const FavoritosPage = () => {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const {
    produtos: produtosCarrinho,
    carregando: carregandoCarrinho,
    erro: erroCarrinho,
    alterarQuantidade,
    removerProduto,
  } = useCarrinho();

  useEffect(() => {
    const usuarioJSON = localStorage.getItem("usuario");
    if (!usuarioJSON) {
      navigate("/login");
      return;
    }

    const usuario = JSON.parse(usuarioJSON);
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

  if (carregando || carregandoCarrinho) {
    return <div className="text-center mt-4">Carregando...</div>;
  }

  if (erro) return <div className="alert alert-danger mt-4">{erro}</div>;
  if (erroCarrinho) return <div className="alert alert-danger mt-4">{erroCarrinho}</div>;
  if (favoritos.length === 0) return <div className="mt-4">Você ainda não possui produtos favoritos.</div>;

  const adicionarProduto = (produto: Produto) => {
    const produtoNoCarrinho = produtosCarrinho.find(p => p.id === produto.id);
    const novaQuantidade = produtoNoCarrinho ? produtoNoCarrinho.quantidade + 1 : 1;
    alterarQuantidade(produto.id, novaQuantidade);
  };

  const subtrairProduto = (produto: Produto) => {
    const produtoNoCarrinho = produtosCarrinho.find(p => p.id === produto.id);
    if (!produtoNoCarrinho) return;
    const novaQuantidade = produtoNoCarrinho.quantidade - 1;
    novaQuantidade <= 0
      ? removerProduto(produto.id)
      : alterarQuantidade(produto.id, novaQuantidade);
  };

  const removerFavorito = async (produtoId: number) => {
    const usuarioJSON = localStorage.getItem("usuario");
    if (!usuarioJSON) return;
    const usuario = JSON.parse(usuarioJSON);

    try {
      const resp = await fetch(`http://localhost:8080/usuarios/${usuario.id}/favoritos/${produtoId}`, {
        method: "DELETE",
      });

      if (!resp.ok) throw new Error(await resp.text());

      setFavoritos((prev) => prev.filter((p) => p.id !== produtoId));
    } catch (err) {
      alert("Erro ao remover favorito");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Meus Favoritos</h2>
      <div className="row">
        {favoritos.map((produto) => {
          const produtoNoCarrinho = produtosCarrinho.find(p => p.id === produto.id);
          const quantidade = produtoNoCarrinho ? produtoNoCarrinho.quantidade : 0;

          return (
            <div key={produto.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={`/${produto.imagem}`}
                  className="card-img-top"
                  alt={produto.nome}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text">{produto.descricao}</p>
                    <p className="fw-bold">R$ {produto.preco?.toFixed(2)}</p>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-2">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => subtrairProduto(produto)}
                      disabled={quantidade === 0}
                      aria-label={`Diminuir quantidade de ${produto.nome}`}
                    >
                      −
                    </button>

                    <span>{quantidade}</span>

                    <button
                      className="btn btn-outline-primary"
                      onClick={() => adicionarProduto(produto)}
                      aria-label={`Aumentar quantidade de ${produto.nome}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-outline-danger btn-sm mt-3"
                    onClick={() => removerFavorito(produto.id)}
                  >
                    Remover dos Favoritos
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritosPage;

