import { useState } from "react";
import { Produto } from "../interface/Produto";
import { apiFetch } from "../util/api";

const useProduto = () => {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const cadastrarProduto = async (produto: Omit<Produto, "id">): Promise<Produto | null> => {
    try {
      setCarregando(true);
      setErro(null);
      const resposta = await apiFetch("/produtos", {
        method: "POST",
        body: JSON.stringify(produto),
      });
      if (!resposta.ok) throw new Error(await resposta.text());
      return await resposta.json();
    } catch (err: any) {
      setErro(err.message);
      return null;
    } finally {
      setCarregando(false);
    }
  };

  const editarProduto = async (produto: Produto): Promise<void> => {
    try {
      setCarregando(true);
      setErro(null);
      const resposta = await apiFetch("/produtos", {
        method: "PUT",
        body: JSON.stringify(produto),
      });
      if (!resposta.ok) throw new Error(await resposta.text());
    } catch (err: any) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  };

  const removerProduto = async (idProduto: number): Promise<void> => {
    try {
      setCarregando(true);
      setErro(null);
      const resposta = await apiFetch(`/produtos/${idProduto}`, { method: "DELETE" });
      if (!resposta.ok) throw new Error(await resposta.text());
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  const recuperarProduto = async (idProduto: number): Promise<Produto> => {
    try {
      setCarregando(true);
      setErro(null);
      const resposta = await apiFetch(`/produtos/${idProduto}`);
      if (!resposta.ok) throw new Error(await resposta.text());
      return await resposta.json();
    } catch (err: any) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  };

  return { cadastrarProduto, editarProduto, removerProduto, recuperarProduto, carregando, erro };
};

export default useProduto;
