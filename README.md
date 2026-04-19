# Loja de Pesca — Fullstack

Aplicação de e-commerce para produtos de pesca, com backend em Spring Boot e frontend em React + TypeScript.

---

## Tecnologias

**Backend**
- Java 21 + Spring Boot 3.5.3
- Spring Data JPA + Hibernate
- MySQL
- Lombok
- Spring Validation

**Frontend**
- React 19 + TypeScript
- Vite 6
- React Router v7
- TanStack React Query v5
- React Hook Form + Zod
- Bootstrap 5

---

## Estrutura do Projeto

```
/
├── back/       # API REST (Spring Boot)
└── front/      # SPA (React + Vite)
```

---

## Pré-requisitos

- Java 21+
- Maven (ou use o wrapper `./mvnw`)
- Node.js 18+
- MySQL rodando localmente

---

## Configuração do Banco de Dados

Crie o banco antes de subir o backend:

```sql
CREATE DATABASE desweb;
```

As credenciais padrão estão em `back/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/desweb
spring.datasource.username=teste
spring.datasource.password=teste123
```

> `ddl-auto=create` — o schema é recriado a cada inicialização.

---

## Como Rodar

**Backend**

```bash
cd back
./mvnw spring-boot:run
```

API disponível em: `http://localhost:8080`

**Frontend**

```bash
cd front
npm install
npm run dev
```

App disponível em: `http://localhost:5173`

---

## API — Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/autenticacao/login` | Login de usuário |

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/usuarios/cadastro` | Cadastrar usuário |
| GET | `/usuarios/{id}/favoritos` | Listar favoritos |
| POST | `/usuarios/{idUsuario}/favoritos/{idProduto}` | Adicionar favorito |
| DELETE | `/usuarios/{idUsuario}/favoritos/{idProduto}` | Remover favorito |

### Produtos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/produtos` | Listar todos |
| GET | `/produtos/{id}` | Buscar por ID |
| GET | `/produtos/categoria/{slug}` | Filtrar por categoria |
| GET | `/produtos/paginacao?pagina=0&tamanho=5&nome=` | Listar com paginação |
| GET | `/produtos/categoria/paginacao?slugCategoria=&pagina=0&tamanho=3` | Paginação por categoria |
| POST | `/produtos` | Cadastrar produto |
| PUT | `/produtos` | Atualizar produto |
| DELETE | `/produtos/{id}` | Remover produto |

### Carrinho
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/carrinhos/{idUsuario}` | Ver carrinho ativo |
| POST | `/carrinhos/{idUsuario}/adicionar?idProduto=&qtd=` | Adicionar item |
| PUT | `/carrinhos/{idUsuario}/alterar?idProduto=&novaQtd=` | Alterar quantidade |
| DELETE | `/carrinhos/{idUsuario}/remover/{idProduto}` | Remover item |
| DELETE | `/carrinhos/{idUsuario}/limpar` | Limpar carrinho |
| POST | `/carrinhos/{idUsuario}/checkout` | Finalizar compra |

---

## Modelo de Dados

```
Usuario
  ├── conta, senha
  ├── favoritos → [Produto] (ManyToMany)
  └── carrinho → Carrinho (OneToOne)

Carrinho
  ├── usuario → Usuario
  ├── itens → [ItemCarrinho] (OneToMany)
  ├── total
  └── finalizado

ItemCarrinho
  ├── produto → Produto
  ├── quantidade
  └── precoUnitario

Produto
  ├── nome, slug, descricao, imagem
  ├── preco, qtdEstoque, disponivel
  ├── dataCadastro
  └── categoria → Categoria

Categoria
  ├── nome
  └── slug
```

---

## Páginas do Frontend

| Rota | Página |
|------|--------|
| `/` | Home — produtos por categoria |
| `/categoria/:slugCategoria` | Produtos filtrados por categoria |
| `/produtos` | Listagem geral com tabela |
| `/produto/:id` | Detalhes do produto |
| `/carrinho` | Carrinho de compras |
| `/favoritos` | Produtos favoritos |
| `/login` | Login |
| `/cadastro` | Cadastro de usuário |
| `/produtos/novo` | Cadastrar produto |
| `/produtos/editar/:id` | Editar produto |
| `/contatos` | Contatos |

---

## Deploy do Frontend

O projeto está configurado para deploy via GitHub Pages:

```bash
cd front
npm run deploy
```
