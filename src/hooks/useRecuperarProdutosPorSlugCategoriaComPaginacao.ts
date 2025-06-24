import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { Produto } from "../interface/Produto";
import ResultadoPaginado from "../interface/ResultadoPaginado";

import recuperarProdutos from "../util/recuperarProdutos";

import isErrorResponse from '../util/isErrorResponse';

interface QueryString {
  tamanho: string,
  slugCategoria?: string
}

interface QueryStringComPagina {
  pagina: string,
  tamanho: string,
  slugCategoria?: string
}

const useRecuperarProdutosPorSlugCategoriaComPaginacao = (queryString: QueryString) => {

  const recuperarProdutosPorSlugCategoriaComPaginacao = async (queryStringComPagina: QueryStringComPagina): Promise<ResultadoPaginado<Produto>> => {
    // const response = await fetch("http://localhost:8080/produtos/categoria/paginacao?" + new URLSearchParams(...queryStringComPagina as any));
    //
    // if (!response.ok) {
    //   const errorResponse = await response.json();
    //   if (isErrorResponse(errorResponse)) {
    //     throw new Error(errorResponse.message);
    //   }
    //   throw new Error("Erro ao recuperar produtos por slug de categoria com paginação. Status code = " + response.status);
    // }
    // return await response.json();

    const produtos = await recuperarProdutos();
    let produtosFiltrados = produtos;
    if (queryStringComPagina.slugCategoria) {
      produtosFiltrados = produtos.filter(produto => produto.categoria?.slug === queryStringComPagina.slugCategoria);
    }


    // Paginação 
    const pagina = parseInt(queryStringComPagina.pagina);
    const tamanho = parseInt(queryStringComPagina.tamanho);
    const totalDePaginas = Math.ceil(produtosFiltrados.length / tamanho);

    const inicio = pagina * tamanho;
    const fim = inicio + tamanho;
    const itensPaginados = produtosFiltrados.slice(inicio, fim);

    const resultado: ResultadoPaginado<Produto> = {
      totalDeItens: produtosFiltrados.length,
      paginaCorrente: pagina,
      totalDePaginas: totalDePaginas,
      itens: itensPaginados
    }
    return resultado;

  }
  return useInfiniteQuery({
    queryKey: ["produtos", "categoria", "paginacao", queryString.tamanho, queryString.slugCategoria ?? ""],
    queryFn: async ({ pageParam }) => recuperarProdutosPorSlugCategoriaComPaginacao({
      pagina: pageParam.toString(),
      ...queryString
    }),
    staleTime: 0,
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    getnextPageParam: (ultimaPagina) => {
      return ultimaPagina.paginaCorrente < ultimaPagina.totalDePaginas - 1 ? ultimaPagina.paginaCorrente + 1 : undefined;
    }

  });


}


export default useRecuperarProdutosPorSlugCategoriaComPaginacao;

