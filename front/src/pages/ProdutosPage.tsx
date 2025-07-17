import TabelaProdutos from "../components/TabelaDeProduto";
import { Produto } from "../interface/Produto";
import useRecuperarProdutosComPaginacao from "../hooks/useRecuperarProdutos";
import { useEffect, useState } from "react";
import useProduto from "../hooks/useProduto";

const ProdutosPage = () => {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const tamanhoPagina = 5;

  const { data, isLoading, isError } = useRecuperarProdutosComPaginacao(
    paginaAtual,
    tamanhoPagina,
    ""
  );

  const { removerProduto } = useProduto();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [totalDePaginas, setTotalDePaginas] = useState(0);

  // Quando data carregar, atualize o estado local
  useEffect(() => {
    if (data) {
      setProdutos(data.itens);
      setTotalDePaginas(data.totalDePaginas);
    }
  }, [data]);

  const handleRemoverProduto = async (idProduto: number) => {
    await removerProduto(idProduto);
    // Atualiza local removendo o produto removido
    setProdutos((prev) => prev.filter((p) => p.id !== idProduto));
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar produtos.</p>;

  return (
    <>
      <h5>Produtos</h5>
      <hr className="mt-1" />

      <TabelaProdutos onRemover={handleRemoverProduto} produtos={produtos} />

      <div className="mt-3 d-flex gap-2 align-items-center">
        <button
          disabled={paginaAtual === 0}
          onClick={() => setPaginaAtual((p) => p - 1)}
        >
          Anterior
        </button>
        <span>
          Página {paginaAtual + 1} de {totalDePaginas}
        </span>
        <button
          disabled={paginaAtual + 1 >= totalDePaginas}
          onClick={() => setPaginaAtual((p) => p + 1)}
        >
          Próxima
        </button>
      </div>
    </>
  );
};

export default ProdutosPage;

