import { useEffect, useState } from "react";
import type { Produto } from "../interface/Produto";
import { apiFetch } from "../util/api";
import { getUsuario } from "./useAuth";

interface CarrinhoDTO {
  id: number;
  itens: { produto: Produto; quantidade: number }[];
  total: number | null;
  finalizado: boolean;
}

export interface ProdutoComQuantidade extends Produto {
  quantidade: number;
}

const useCarrinho = () => {
  const [produtos, setProdutos] = useState<ProdutoComQuantidade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarCarrinho = async () => {
    const usuario = getUsuario();
    if (!usuario) {
      setCarregando(false);
      return;
    }
    setCarregando(true);
    try {
      const resposta = await apiFetch("/carrinhos");
      if (!resposta.ok) throw new Error(await resposta.text());
      const carrinho: CarrinhoDTO = await resposta.json();
      setProdutos(carrinho.itens.map((item) => ({ ...item.produto, quantidade: item.quantidade })));
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  const alterarQuantidade = async (idProduto: number, quantidade: number) => {
    if (!getUsuario()) return;
    try {
      await apiFetch(`/carrinhos/alterar?idProduto=${idProduto}&novaQtd=${quantidade}`, {
        method: "PUT",
      });
      await carregarCarrinho();
    } catch (err) {
      console.error("Erro ao atualizar quantidade", err);
    }
  };

  const removerProduto = async (idProduto: number) => {
    if (!getUsuario()) return;
    try {
      await apiFetch(`/carrinhos/remover/${idProduto}`, { method: "DELETE" });
      setProdutos((prev) => prev.filter((p) => p.id !== idProduto));
    } catch (err) {
      console.error("Erro ao remover produto", err);
    }
  };

  const limparCarrinho = async () => {
    if (!getUsuario()) return;
    try {
      await apiFetch("/carrinhos/limpar", { method: "DELETE" });
      setProdutos([]);
    } catch (err) {
      console.error("Erro ao limpar carrinho", err);
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  return { produtos, carregando, erro, alterarQuantidade, removerProduto, limparCarrinho, carregarCarrinho };
};

export default useCarrinho;
