import {
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Produto } from "../interface/Produto";
import ResultadoPaginado from "../interface/ResultadoPaginado";
import { apiFetch } from "../util/api";

interface QueryString {
  tamanho: string;
  slugCategoria?: string;
}

interface QueryStringComPagina extends QueryString {
  pagina: string;
}

const API_BASE = "http://localhost:8080";

const useRecuperarProdutosPorSlugCategoriaComPaginacao = (
  queryString: QueryString
) => {
  /**
   * Chama o endpoint:
   *   GET /produtos/categoria/paginacao?pagina={n}&tamanho={n}&slugCategoria={slug}
   */
  const recuperarProdutosPorSlugCategoriaComPaginacao = async (
    queryStringComPagina: QueryStringComPagina
  ): Promise<ResultadoPaginado<Produto>> => {
    const params = new URLSearchParams({
      pagina: queryStringComPagina.pagina,
      tamanho: queryStringComPagina.tamanho,
      slugCategoria: queryStringComPagina.slugCategoria ?? "",
    });

    const response = await apiFetch(`/produtos/categoria/paginacao?${params}`);

    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao recuperar produtos com paginação`);
    }

    return (await response.json()) as ResultadoPaginado<Produto>;
  };

  return useInfiniteQuery({
    queryKey: [
      "produtos",
      "categoria",
      "paginacao",
      queryString.tamanho,
      queryString.slugCategoria ?? "",
    ],
    queryFn: ({ pageParam }) =>
      recuperarProdutosPorSlugCategoriaComPaginacao({
        pagina: pageParam.toString(),
        ...queryString,
      }),
    // React‑Query options
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30, // 30 s
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    getNextPageParam: (ultimaPagina) =>
      ultimaPagina.paginaCorrente < ultimaPagina.totalDePaginas - 1
        ? ultimaPagina.paginaCorrente + 1
        : undefined,
  });
};

export default useRecuperarProdutosPorSlugCategoriaComPaginacao;

