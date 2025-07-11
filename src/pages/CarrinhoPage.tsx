import { useEffect, useState } from "react";
import { ProdCarrinho } from "./CardsPorSlugCategoriaPage";
import type { Produto } from "../interface/Produto";
import recuperarProdutos from "../util/recuperarProdutos";

interface ProdutoComQuantidade extends Produto {
  quantidade: number;
}

const CarrinhoPage = () => {
  const [carrinho, setCarrinho] = useState<ProdCarrinho[]>([]);
  const [produtosDetalhados, setProdutosDetalhados] = useState<ProdutoComQuantidade[]>([]);

  // Carrega carrinho do localStorage
  useEffect(() => {
    const itens = localStorage.getItem("carrinho");
    if (itens) {
      setCarrinho(JSON.parse(itens));
    }
  }, []);

  // Usa produtos locais para popular os detalhes dos produtos no carrinho
  useEffect(() => {
    const carregarProdutosDoCarrinho = async () => {
      const todosProdutos = await recuperarProdutos();
      const detalhados = carrinho.map((item) => {
        const produto = todosProdutos.find((p) => p.id === item.idProduto);
        return produto ? { ...produto, quantidade: item.quantidade } : null;
      }).filter(Boolean) as ProdutoComQuantidade[];

      setProdutosDetalhados(detalhados);
    };

    if (carrinho.length > 0) {
      carregarProdutosDoCarrinho();
    } else {
      setProdutosDetalhados([]);
    }
  }, [carrinho]);

  const removerProduto = (idProduto: number) => {
    const novoCarrinho = carrinho.filter((item) => item.idProduto !== idProduto);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const calcularTotal = () => {
    return produtosDetalhados.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  };

  return (
    <div className="container mt-4">
      <h2>Carrinho de Compras</h2>

      {produtosDetalhados.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Imagem</th>
                <th>Produto</th>
                <th>Preço Unitário</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {produtosDetalhados.map((produto) => (
                <tr key={produto.id}>
                  <td><img src={produto.imagem} alt={produto.nome} width={60} /></td>
                  <td>{produto.nome}</td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
                  <td>{produto.quantidade}</td>
                  <td>R$ {(produto.preco * produto.quantidade).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removerProduto(produto.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end">
            <h4>Total do Carrinho: R$ {calcularTotal().toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;

