import { useQuery } from "@tanstack/react-query";
import ResultadoPaginado from "../interface/ResultadoPaginado";
import { Produto } from "../interface/Produto";

const API_BASE = "http://localhost:8080";

async function recuperarProdutosComPaginacao(
  pagina: number,
  tamanho: number,
  nome: string
): Promise<ResultadoPaginado<Produto>> {
  const url = new URL(`${API_BASE}/produtos/paginacao`);
  url.search = new URLSearchParams({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome,
  }).toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Erro ao recuperar produtos: ${response.statusText}`);
  }

  return response.json();
}

const useRecuperarProdutosComPaginacao = (
  pagina: number,
  tamanho: number,
  nome: string
) => {
  return useQuery({
    queryKey: ["produtos/paginacao", pagina, tamanho, nome],
    queryFn: () =>
      recuperarProdutosComPaginacao(pagina, tamanho, nome),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useRecuperarProdutosComPaginacao;

