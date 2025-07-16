import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCarrinho from "../hooks/useCarrinho";
const CarrinhoPage = () => {
  const navigate = useNavigate();
  const {
    produtos,
    carregando,
    erro,
    alterarQuantidade,
    removerProduto,
    limparCarrinho,
  } = useCarrinho();

  const [valores, setValores] = useState<Record<number, string>>({});

  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const finalizarCompra = () => {
    alert("Compra finalizada com sucesso!");
    navigate("/");
  };

  const calcularTotal = () => {
    return produtos.reduce(
      (total, produto) => total + produto.preco * produto.quantidade,
      0
    );
  };

  if (carregando) return <p>Carregando produtos do carrinho...</p>;
  if (erro) return <p>Erro ao carregar carrinho: {erro}</p>;

  return (
    <div className="container mt-4">
      <h2>Carrinho de Compras</h2>

      {produtos.length === 0 ? (
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
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>
                    <img src={produto.imagem} alt={produto.nome} width={60} />
                  </td>
                  <td>{produto.nome}</td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
                  <td style={{ maxWidth: 120 }}>
                    <div className="d-flex align-items-center gap-2">
                      <input
                        ref={(el) => (inputRefs.current[produto.id] = el)}
                        type="number"
                        min={1}
                        max={produto.qtdEstoque}
                        value={valores[produto.id] ?? produto.quantidade.toString()}
                        onChange={(e) => {
                          setValores((prev) => ({
                            ...prev,
                            [produto.id]: e.target.value,
                          }));
                        }}
                        onBlur={(e) => {
                          const valor = parseInt(e.target.value);
                          if (e.target.value.trim() === "") {
                            // Se vazio, manter o foco
                            inputRefs.current[produto.id]?.focus();
                            return;
                          }

                          if (!isNaN(valor) && valor >= 1 && valor <= produto.qtdEstoque) {
                            alterarQuantidade(produto.id, valor);
                          } else {
                            // Restaura valor anterior válido
                            setValores((prev) => ({
                              ...prev,
                              [produto.id]: produto.quantidade.toString(),
                            }));
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            (e.target as HTMLInputElement).blur(); // Força validação
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

