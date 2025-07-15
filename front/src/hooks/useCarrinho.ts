import { useEffect, useState } from "react";
import type { Produto } from "../interface/Produto";

export interface ProdutoCarrinho {
  idProduto: number;
  quantidade: number;
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
    if (!usuario) return;
    setCarregando(true);
    try {
      const resposta = await fetch(`http://localhost:8080/carrinhos/${usuario.id}`);
      if (!resposta.ok) throw new Error(await resposta.text());
      const dados: ProdutoComQuantidade[] = await resposta.json();
      setProdutos(dados);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  const alterarQuantidade = async (idProduto: number, quantidade: number) => {
    if (!usuario) return;
    try {
      await fetch("http://localhost:8080/carrinhos/atualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario: usuario.id, idProduto, quantidade })
      });
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === idProduto ? { ...p, quantidade } : p
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar quantidade", err);
    }
  };

  const removerProduto = async (idProduto: number) => {
    if (!usuario) return;
    try {
      await fetch("http://localhost:8080/carrinhos/remover", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario: usuario.id, idProduto })
      });
      setProdutos((prev) => prev.filter((p) => p.id !== idProduto));
    } catch (err) {
      console.error("Erro ao remover produto", err);
    }
  };

  const limparCarrinho = async () => {
    if (!usuario) return;
    try {
      await fetch(`http://localhost:8080/carrinhos/${usuario.id}`, {
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

