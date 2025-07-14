import type { Categoria } from "./Categoria";
// importei de forma diferente da vista no curso, estava dando algum bug

export type Produto = {
  id: number;
  imagem: string;
  categoria: Categoria;
  nome: string;
  slug: string;
  descricao: string;
  disponivel: boolean;
  dataCadastro: Date;
  qtdEstoque: number;
  preco: number;
}

