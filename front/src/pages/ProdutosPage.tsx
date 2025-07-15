import TabelaProdutos from "../components/TabelaDeProduto";
import { Produto } from "../interface/Produto";
// import recuperarProdutos from "../util/recuperarProdutos";
import useRecuperarProdutos from "../hooks/useRecuperarProdutos";
import { use, useEffect, useState } from "react";

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([] as Produto[])

  useEffect(() => {
    const getProdutos = async () => {
      const response = useRecuperarProdutos();
      setProdutos(response);
    }
    getProdutos();

  }, [])

  if (produtos.length == 0) return <p>Carregando...</p>

  return (
    <>
      <h5>Produtos</h5>
      <hr className="mt-1" />
      <TabelaProdutos produtos={produtos} />
    </>
  )

}
export default ProdutosPage;
