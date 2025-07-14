import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProdCarrinho } from "./CardsPorSlugCategoriaPage";
import type { Produto } from "../interface/Produto";
import recuperarProdutos from "../util/recuperarProdutos";
interface ProdutoComQuantidade extends Produto {
  quantidade: number;
}

const CarrinhoPage = () => {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState<ProdCarrinho[]>([]);
  const [produtosDetalhados, setProdutosDetalhados] = useState<ProdutoComQuantidade[]>([]);

  useEffect(() => {
    const itens = localStorage.getItem("carrinho");
    if (itens) {
      setCarrinho(JSON.parse(itens));
    }
  }, []);

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

  const atualizarCarrinho = (novoCarrinho: ProdCarrinho[]) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const alterarQuantidade = (idProduto: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;

    const produto = produtosDetalhados.find(p => p.id === idProduto);
    if (!produto || novaQuantidade > produto.qtdEstoque) return;

    const novoCarrinho = carrinho.map((item) =>
      item.idProduto === idProduto
        ? { ...item, quantidade: novaQuantidade }
        : item
    );

    atualizarCarrinho(novoCarrinho);
  };

  const removerProduto = (idProduto: number) => {
    const novoCarrinho = carrinho.filter((item) => item.idProduto !== idProduto);
    atualizarCarrinho(novoCarrinho);
  };

  const limparCarrinho = () => {
    atualizarCarrinho([]);
  };

  const finalizarCompra = () => {
    // Aqui você pode fazer validações, salvar pedido, etc.
    alert("Compra finalizada com sucesso!");
    limparCarrinho();
    navigate("/checkout"); // redireciona para uma página de confirmação (ajuste se necessário)
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
          <table className="table table-bordered table-hover align-middle">
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
                  <td>
                    <img src={produto.imagem} alt={produto.nome} width={60} />
                  </td>
                  <td>{produto.nome}</td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
                  <td style={{ maxWidth: 120 }}>
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={produto.qtdEstoque}
                        value={produto.quantidade}
                        onChange={(e) => {
                          const valor = e.target.value;
                          if (valor === "") return;

                          const numero = parseInt(valor);
                          if (!isNaN(numero)) {
                            alterarQuantidade(produto.id, parseInt(e.target.value));
                          }
                        }}
                        onBlur={(e) => {
                          const valor = e.target.value;
                          const destino = e.relatedTarget as HTMLElement | null;

                          const clicouRemover = destino?.dataset?.action === "remove" && destino?.dataset?.id === String(produto.id);

                          if (valor === "" && clicouRemover) {
                            e.target.focus();
                          }

                        }}

                        className="form-control form-control-sm text-center"
                        style={{ width: 60 }}
                      />
                    </div>
                  </td>
                  <td>R$ {(produto.preco * produto.quantidade).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      data-action="remove"
                      data-id={produto.id}
                      onClick={() => removerProduto(produto.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button className="btn btn-outline-danger" onClick={limparCarrinho}>
              Limpar Carrinho
            </button>
            <h4>Total do Carrinho: R$ {calcularTotal().toFixed(2)}</h4>
            <button className="btn btn-success" onClick={finalizarCompra}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}
      <div className="container mt-4">
        <button
          className="btn btn-primary position-fixed"
          style={{ bottom: "20px", right: "20px", zIndex: 1000 }}
          onClick={() => navigate("/")}
        >
          Continuar comprando
        </button>
      </div>
    </div>
  );
};

export default CarrinhoPage;

