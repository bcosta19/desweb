import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Produto } from "../interface/Produto";
import useProduto from "../hooks/useProduto";

const EditarProdutoPage = () => {
  const { idProduto } = useParams();
  console.log("idProduto:", idProduto);
  const navigate = useNavigate();
  const { recuperarProduto, editarProduto, carregando, erro } = useProduto();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    if (!idProduto) return;
    recuperarProduto(Number(idProduto))
      .then(setProduto)
      .catch((err) => setMensagem(err.message));
  }, [idProduto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!produto) return;
    const { name, value } = e.target;
    setProduto({
      ...produto,
      [name]: name === "preco" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produto) return;

    try {
      await editarProduto(produto);
      navigate("/produtos");
    } catch (err: any) {
      setMensagem(err.message || "Erro ao editar produto.");
    }
  };

  if (carregando || !produto) return <p>Carregando produto...</p>;

  return (
    <div className="container mt-4">
      <h2>Editar Produto</h2>
      {mensagem && <div className="alert alert-danger">{mensagem}</div>}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imagem" className="form-label">Imagem</label>
          <input
            type="text"
            id="imagem"
            name="imagem"
            value={produto.imagem}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="preco" className="form-label">Preço</label>
          <input
            type="number"
            step="0.01"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="disponivel" className="form-label">Disponível</label>
          <select
            id="disponivel"
            name="disponivel"
            value={produto.disponivel ? "true" : "false"}
            onChange={(e) =>
              setProduto({ ...produto, disponivel: e.target.value === "true" })
            }
            className="form-control"
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Salvar</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/produtos")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarProdutoPage;
