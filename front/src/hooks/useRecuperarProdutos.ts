import { useQuery } from "@tanstack/react-query";
import ResultadoPaginado from "../interface/ResultadoPaginado";
import { Produto } from "../interface/Produto";
import { apiFetch } from "../util/api";

async function recuperarProdutosComPaginacao(
  pagina: number,
  tamanho: number,
  nome: string
): Promise<ResultadoPaginado<Produto>> {
  const params = new URLSearchParams({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome,
  });
  const response = await apiFetch(`/produtos/paginacao?${params}`);
  if (!response.ok) throw new Error(`Erro ao recuperar produtos: ${response.statusText}`);
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

