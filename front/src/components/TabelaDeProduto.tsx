import dayjs from "dayjs";
import { Produto } from "../interface/Produto";
import { useNavigate } from "react-router-dom";

interface TabelaProdutosProps {
  produtos: Produto[];
  onRemover: (id: number) => void;
}

const TabelaProdutos = ({ produtos, onRemover }: TabelaProdutosProps) => {
  const navigate = useNavigate();

  const editarProduto = (id: number) => {
    navigate(`/produtos/editar/${id}`);
  };

  return (
    <table className="table table-responsive table-bordered table-sm table-hover table-striped">
      <thead>
        <tr>
          <th className="text-center align-middle">Id</th>
          <th className="text-center align-middle">Imagem</th>
          <th className="text-center align-middle">Categoria</th>
          <th className="text-center align-middle">Nome</th>
          <th className="text-center align-middle">Disponível</th>
          <th className="text-center align-middle">Data de Cadastro</th>
          <th className="text-center align-middle">Preço</th>
          <th className="text-center align-middle">Ação</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td className="text-center align-middle">{produto.id}</td>
            <td className="text-center align-middle">
              <img
                src={produto.imagem}
                alt="imagem do produto"
                style={{ width: "35px" }}
              />
            </td>
            <td className="text-center align-middle">{produto.categoria.nome}</td>
            <td className="align-middle p-3">{produto.nome}</td>
            <td className="text-center align-middle">
              {produto.disponivel ? "Sim" : "Não"}
            </td>
            <td className="text-center align-middle">
              {dayjs(produto.dataCadastro).format("DD/MM/YYYY")}
            </td>
            <td
              className="text-end align-middle pe-3"
            >
              {produto.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}
            </td>
            <td className="text-center align-middle d-flex gap-2 justify-content-center">
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={() => editarProduto(produto.id)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                type="button"
                onClick={() => onRemover(produto.id)}
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaProdutos;

