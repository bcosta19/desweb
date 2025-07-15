import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import useRecuperarProdutosPorSlugCategoriaComPaginacao from "../hooks/useRecuperarProdutosPorSlugCategoriaComPaginacao";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import type { Produto } from "../interface/Produto";
import CardsPlaceholderPage from "./CardsPlaceHolder";
import useCarrinho from "../hooks/useCarrinho";

export interface ProdCarrinho {
  idProduto: number;
  quantidade: number;
}

const CardsPorSlugCategoriaPage = () => {
  const tamanho = 10; // Definindo o tamanho da página para 10 itens

  const { slugCategoria } = useParams<{ slugCategoria: string }>();
  const slug = slugCategoria ?? "";

  const {
    produtos: produtosCarrinho,
    carregando: carregandoCarrinho,
    erro: erroCarrinho,
    alterarQuantidade,
    removerProduto,
  } = useCarrinho();

  const {
    data,
    isPending: carregandoProdutos,
    error: errorProdutos,
    hasNextPage,
    fetchNextPage,
  } = useRecuperarProdutosPorSlugCategoriaComPaginacao({
    tamanho: tamanho.toString(),
    slugCategoria: slug,
  });

  const adicionarProduto = (produto: Produto) => {
    const produtoExistente = produtosCarrinho.find(p => p.id === produto.id);
    const novaQuantidade = produtoExistente ? produtoExistente.quantidade + 1 : 1;

    alterarQuantidade(produto.id, novaQuantidade);
  }

  const subtrairProduto = (produto: Produto) => {
    const produtoExistente = produtosCarrinho.find(p => p.id === produto.id);
    if (!produtoExistente) return;
    const novaQuantidade = produtoExistente.quantidade - 1;
    if (novaQuantidade <= 0) {
      removerProduto(produto.id);
    } else {
      alterarQuantidade(produto.id, novaQuantidade);
    }
  };
  console.log("carregandoCarrinho:", carregandoCarrinho);
  console.log("produtos do carrinho:", produtosCarrinho);
  console.log("data produtos:", data);
  if (carregandoProdutos || carregandoCarrinho) return <CardsPlaceholderPage />; // Adicionar placeholder
  if (errorProdutos) return <p>Erro ao carregar produtos</p>;
  if (erroCarrinho) return <p>Erro ao carregar carrinho</p>;


  return (
    <InfiniteScroll
      style={{ overflowX: "hidden" }}
      dataLength={data.pages.reduce((total, page) => total + page.totalDeItens, 0)}
      hasMore={hasNextPage}
      next={() => fetchNextPage()}
      loader={<h4>Carregando...</h4>}
    >
      <h5>
        {slugCategoria ? slugCategoria.charAt(0).toUpperCase() + slugCategoria.slice(1) : "Produtos"}
      </h5>
      <div className="row">
        {data.pages.map((page) =>
          page.itens.map((produto) => {
            const produtoNoCarrinho = produtosCarrinho.find(p => p.id === produto.id) ?? null;
            return (
              <div key={produto.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
                <Card
                  produto={produto}
                  produtoNoCarrinho={produtoNoCarrinho}
                  adicionarProduto={adicionarProduto}
                  subtrairProduto={subtrairProduto}
                />
              </div>
            )
          })
        )}
      </div>

    </InfiniteScroll>
  );
}
export default CardsPorSlugCategoriaPage;

