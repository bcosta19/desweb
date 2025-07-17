import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProduto from "../hooks/useProduto";
import { Produto } from "../interface/Produto";

const CadastroProdutoPage = () => {
  const navigate = useNavigate();
  const { cadastrarProduto, carregando, erro } = useProduto();

  const [produto, setProduto] = useState<Omit<Produto, "id">>({
    "imagem": "vara1",
    "categoria": {
      "id": 1,
      nome: "Vara de Pesca",
      slug: "vara",
    },
    "nome": "Vara de Pesca 1",
    "slug": "varas",
    "descricao": "vara de pesca1",
    "disponivel": true,
    "dataCadastro": new Date(),
    "qtdEstoque": 10,
    "preco": 100,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto({
      ...produto,
      categoria: {
        ...produto.categoria,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const novo = await cadastrarProduto(produto);
    if (novo) {
      alert("Produto cadastrado com sucesso!");
      navigate("/produtos");
    } else {
      alert("Erro ao cadastrar: " + erro);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Produto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome do Produto"
          value={produto.nome}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={produto.descricao}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="imagem"
          placeholder="URL da Imagem"
          value={produto.imagem}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={produto.preco}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          step="0.01"
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug do Produto"
          value={produto.slug}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="id"
            placeholder="ID da Categoria"
            value={produto.categoria.id}
            onChange={handleCategoriaChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug da Categoria"
            value={produto.categoria.slug}
            onChange={handleCategoriaChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {carregando ? "Cadastrando..." : "Cadastrar Produto"}
        </button>
      </form>

      {erro && <p className="text-red-500 mt-4 text-center">{erro}</p>}
    </div>
  );
};

export default CadastroProdutoPage;

