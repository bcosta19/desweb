import TabelaProdutos from "../components/TabelaDeProduto";
import { Produto } from "../interface/Produto";
import useRecuperarProdutosComPaginacao from "../hooks/useRecuperarProdutos";
import { use, useEffect, useState } from "react";
import useProduto from "../hooks/useProduto";

const ProdutosPage = () => {
  const [paginaAtual, setPaginaAtual] = useState(0);

  // const [produtos, setProdutos] = useState([] as Produto[])

  const tamanhoPagina = 5;
  const { data, isLoading, isError } = useRecuperarProdutosComPaginacao(paginaAtual, tamanhoPagina, "")

  const { removerProduto,
  } = useProduto();

  if (isLoading) return <p>Carregando...</p>
  if (isError || !data) return <p>Erro ao carregar produtos.</p>

  console.log("data:", data);

  const { itens: produtos, totalDePaginas } = data;

  // if (produtos.length == 0) return <p>Carregando...</p>

  return (
    <>
      <h5>Produtos</h5>
      <hr className="mt-1" />

      <TabelaProdutos onRemover={removerProduto} produtos={produtos} />

      <div className="mt-3 d-flex gap-2 align-items-center">
        <button disabled={paginaAtual === 0} onClick={() => setPaginaAtual(p => p - 1)}>
          Anterior
        </button>
        <span>Página {paginaAtual + 1} de {totalDePaginas}</span>
        <button disabled={paginaAtual + 1 >= totalDePaginas} onClick={() => setPaginaAtual(p => p + 1)}>
          Próxima
        </button>
      </div>
    </>

  )

}
export default ProdutosPage;
