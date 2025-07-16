import { useEffect, useState } from "react";
import type { Produto } from "../interface/Produto";

// export interface ProdutoCarrinho {
//   idProduto: number;
//   quantidade: number;
// }

interface CarrinhoDTO {
  id: number,
  itens: {
    produto: Produto;
    quantidade: number;

  }[];
  total: number | null;
  finalizado: boolean;
}


interface ProdutoComQuantidade extends Produto {
  quantidade: number;
}

const useCarrinho = () => {
  const [produtos, setProdutos] = useState<ProdutoComQuantidade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const usuarioJSON = localStorage.getItem("usuario");
  const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null;

  const carregarCarrinho = async () => {
    if (!usuario) {
      setCarregando(false);
      return;

    }
    setCarregando(true);
    try {
      const resposta = await fetch(`http://localhost:8080/carrinhos/${usuario.id}`);
      if (!resposta.ok) throw new Error(await resposta.text());
      const carrinho: CarrinhoDTO = await resposta.json();
      // const dados: ProdutoComQuantidade[] = await resposta.json();

      const itens = carrinho.itens.map((item) => ({
        ...item.produto,
        quantidade: item.quantidade,
      }));
      setProdutos(itens);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  const alterarQuantidade = async (idProduto: number, quantidade: number) => {
    if (!usuario) return;
    try {
      await fetch(`http://localhost:8080/carrinhos/${usuario.id}/alterar?idProduto=${idProduto}&novaQtd=${quantidade}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ idUsuario: usuario.id, idProduto, quantidade })
      });
      // setProdutos((prev) =>
      //   prev.map((p) =>
      //     p.id === idProduto ? { ...p, quantidade } : p
      //   )
      // );
      await carregarCarrinho();
    } catch (err) {
      console.error("Erro ao atualizar quantidade", err);
    }
  };

  const removerProduto = async (idProduto: number) => {
    if (!usuario) return;
    try {
      await fetch(`http://localhost:8080/carrinhos/${usuario.id}/remover/${idProduto}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ idUsuario: usuario.id, idProduto })
      });
      setProdutos((prev) => prev.filter((p) => p.id !== idProduto));
    } catch (err) {
      console.error("Erro ao remover produto", err);
    }
  };

  const limparCarrinho = async () => {
    if (!usuario) return;
    try {
      await fetch(`http://localhost:8080/carrinhos/${usuario.id}/limpar`, {
        method: "DELETE",
      });
      setProdutos([]);
    } catch (err) {
      console.error("Erro ao limpar carrinho", err);
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  return {
    produtos,
    carregando,
    erro,
    alterarQuantidade,
    removerProduto,
    limparCarrinho,
    carregarCarrinho,
  };
};

export default useCarrinho;

