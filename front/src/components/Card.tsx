import { useEffect, useState } from "react";
import Produto from "../interface/Produto";
import { ProdCarrinho } from "../pages/CardsPorSlugCategoriaPage";

interface Props {
  produto: Produto;
  produtoNoCarrinho: ProdCarrinho | null;
  adicionarProduto: (produto: Produto) => void;
  subtrairProduto: (produto: Produto) => void;
}

const Card = ({ produto, adicionarProduto, subtrairProduto, produtoNoCarrinho }: Props) => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
  const [favoritado, setFavoritado] = useState<boolean>(false);

  useEffect(() => {
    if (usuarioLogado) {
      fetch(`http://localhost:8080/usuarios/${usuarioLogado.id}/favoritos`)
        .then(res => res.json())
        .then((produtosFavoritos: Produto[]) => {
          const estaFavoritado = produtosFavoritos.some((p) => p.id === produto.id);
          setFavoritado(estaFavoritado);
        });
    }
  }, [usuarioLogado, produto.id]);

  const alternarFavorito = async () => {
    if (!usuarioLogado) {
      console.log("Usuário não está logado");
      return
    };

    const metodo = favoritado ? "DELETE" : "POST";
    const url = `http://localhost:8080/usuarios/${usuarioLogado.id}/favoritos/${produto.id}`;

    try {
      const resp = await fetch(url, { method: metodo });
      if (resp.ok) {
        setFavoritado(!favoritado);
      } else {
        const erro = await resp.text();
        alert("Erro ao alterar favorito: " + erro);
      }
    } catch (error) {
      alert("Erro ao conectar com servidor");
    }
  };

  return (
    <div className="card h-100 border-0">
      <div className="position-relative">
        <img src={`/${produto.imagem}`} className="card-img-top" alt={produto.nome} />
        {usuarioLogado && (
          <button
            onClick={alternarFavorito}
            className="btn p-1 position-absolute top-0 end-0 m-2 bg-white border rounded-circle"
            style={{ width: "32px", height: "32px" }}
          >
            <img
              src={`icons/${favoritado ? "heart-fill.svg" : "heart.svg"}`}
              alt="Favorito"
              width="20"
              height="20"
            />
          </button>
        )}
      </div>

      <div className="card-body">
        <h5 className="card-title">{produto.nome}</h5>
        <p className="card-text">{produto.descricao}</p>
        <p className="card-text fw-bold" style={{ color: "rgb(220,60,60)" }}>
          R${" "}
          {produto.preco.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
          })}
        </p>
      </div>

      <div className="card-footer p-0 mb-4">
        {produtoNoCarrinho ? (
          <div className="btn-group w-100">
            <button onClick={() => subtrairProduto(produto)} type="button" className="btn btn-secondary btn-sm">-</button>
            <button type="button" className="btn btn-secondary btn-sm">{produtoNoCarrinho.quantidade}</button>
            <button onClick={() => adicionarProduto(produto)} type="button" className="btn btn-secondary btn-sm">+</button>
          </div>
        ) : (
          <button onClick={() => adicionarProduto(produto)} type="button" className="btn btn-success btn-sm w-100">Comprar</button>
        )}
      </div>
    </div>
  );
};
export default Card;
