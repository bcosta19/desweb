import {
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Produto } from "../interface/Produto";
import ResultadoPaginado from "../interface/ResultadoPaginado";
import isErrorResponse from "../util/isErrorResponse";

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
    const url = new URL(
      `${API_BASE}/produtos/categoria/paginacao`
    );
    url.search = new URLSearchParams({
      pagina: queryStringComPagina.pagina,
      tamanho: queryStringComPagina.tamanho,
      slugCategoria: queryStringComPagina.slugCategoria ?? "",
    }).toString();

    const response = await fetch(url.toString());

    if (!response.ok) {
      // Tenta extrair mensagem amigável do backend
      const maybeError = await response.json().catch(() => null);
      if (maybeError && isErrorResponse(maybeError)) {
        throw new Error(maybeError.message);
      }
      throw new Error(
        `Erro ${response.status} ao recuperar produtos com paginação`
      );
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

