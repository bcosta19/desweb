import { useState } from "react";
import { Produto } from "../interface/Produto";

const API_BASE = "http://localhost:8080";

const useProduto = () => {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const editarProduto = async (produto: Produto) => {
    try {
      setCarregando(true);
      const resposta = await fetch(`${API_BASE}/produtos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });
      if (!resposta.ok) {
        throw new Error(await resposta.text());
      }
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  const removerProduto = async (idProduto: number) => {
    try {
      setCarregando(true);
      const resposta = await fetch(`${API_BASE}/produtos/${idProduto}`, {
        method: "DELETE",
      });
      if (!resposta.ok) {
        throw new Error(await resposta.text());
      }
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };
  const recuperarProduto = async (idProduto: number): Promise<Produto> => {
    try {
      setCarregando(true);
      const resposta = await fetch(`${API_BASE}/produtos/${idProduto}`);
      if (!resposta.ok) {
        throw new Error(await resposta.text());
      }
      return await resposta.json();
    } catch (err: any) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  };

  return {
    editarProduto,
    removerProduto,
    recuperarProduto,
    carregando,
    erro,
  };


}

export default useProduto;
