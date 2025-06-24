import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import useRecuperarProdutosPorSlugCategoriaComPaginacao from "../hooks/useRecuperarProdutosPorSlugCategoriaComPaginacao";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import type { Produto } from "../interface/Produto";

export interface ProdCarrinho {
  idProduto: number;
  quantidade: number;
}

const CardsPorSlugCategoriaPage = () => {
  const tamanho = 10; // Definindo o tamanho da página para 10 itens

  const [carrinho, setCarrinho] = useState(() => {
    const itensDeCarrinho = localStorage.getItem("carrinho");
    return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
  })

  console.log("carrinho = ", carrinho);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);


  const adicionarProduto = (produto: Produto) => {
    setCarrinho((prevCarrinho: ProdCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idProduto === produto.id);
      if (existe) {
        // existe.quantidade = existe.quantidade + 1;  Isso não funciona
        // return prevCarrinho;
        const novoCarrinho: ProdCarrinho[] = prevCarrinho.map(
          (item: ProdCarrinho) =>
            item.idProduto === produto.id
              ? { idProduto: item.idProduto, quantidade: item.quantidade + 1 }
              : item
        );
        return novoCarrinho;
      } else {
        return [...prevCarrinho, { idProduto: produto.id, quantidade: 1 }];
      }
    });
  };

  const subtrairProduto = (produto: Produto) => {
    setCarrinho((prevCarrinho: ProdCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idProduto === produto.id);
      if (existe) {
        // existe.quantidade = existe.quantidade + 1;  Isso não funciona
        // return prevCarrinho;
        const novoCarrinho: ProdCarrinho[] = prevCarrinho.map(
          (item: ProdCarrinho) =>
            item.idProduto === produto.id
              ? { idProduto: item.idProduto, quantidade: item.quantidade - 1 }
              : item
        );
        return novoCarrinho.filter((item) => item.quantidade > 0);
      } else {
        return prevCarrinho;
      }
    });
  };

  const { slugCategoria } = useParams<{ slugCategoria: string }>();
  const slug = slugCategoria ?? "";
  console.log("slugCategoria = ", slugCategoria);
  const {
    data,
    isPending: carregandoProdutos,
    error: errorProdutos,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage

  } = useRecuperarProdutosPorSlugCategoriaComPaginacao(
    {
      tamanho: tamanho.toString(),
      slugCategoria: slug
    });

  console.log("data = ", data);

  if (carregandoProdutos) return <p>Carregando...</p>; // Adicionar placeholder
  if (errorProdutos) return <p>Erro ao carregar os produtos: {errorProdutos.message}</p>;

  const produtosNoCarrinho: (ProdCarrinho | null)[] = [];
  data.pages.forEach((page) => {
    page.itens.forEach((produto) => {
      const prodCarrinho = carrinho.find(
        (item: ProdCarrinho) => item.idProduto === produto.id
      );
      produtosNoCarrinho.push(prodCarrinho ? prodCarrinho : null);
    });
  });

  console.log("produtos no carrinho = ", produtosNoCarrinho);

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
        {data.pages.map((page, pagina) =>
          page.itens.map((produto, index) => (
            <div key={produto.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
              <Card
                produto={produto}
                produtoNoCarrinho={carrinho.find((item) => item.idProduto === produto.id) ?? null}
                adicionarProduto={adicionarProduto}
                subtrairProduto={subtrairProduto}
              />
            </div>
          ))
        )}
      </div>

    </InfiniteScroll>
  );
}
export default CardsPorSlugCategoriaPage;

