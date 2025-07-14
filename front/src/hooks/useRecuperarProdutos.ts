import { useQuery } from "@tanstack/react-query";
import { Produto } from "../interface/Produto";

async function recuperarProdutos(): Promise<Produto[]> {
  const response = await fetch("http://localhost:8080/produtos");
  if (!response.ok) {
    throw new Error("Erro ao recuperar produtos");
  }
  return response.json();
}

const useRecuperarProdutos = () => {
  return useQuery<Produto[], Error>({
    queryKey: ["produtos"],
    queryFn: recuperarProdutos,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export default useRecuperarProdutos;
