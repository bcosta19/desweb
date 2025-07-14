package com.projetobackend.back.controller;

import com.projetobackend.back.model.Produto;
import com.projetobackend.back.model.ResultadoPaginado;
import com.projetobackend.back.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("produtos")
public class ProdutoController {

  @Autowired
  private ProdutoService produtoService;

  @GetMapping
  public List<Produto> recuperarProdutos() {
    return produtoService.recuperarProdutos();
  }

  @GetMapping("{idProduto}")
  public Produto recuperarProdutoPorId(@PathVariable("idProduto") long id) {
    return produtoService.recuperarProdutoPorId(id);
  }

  @GetMapping("categoria/{slugCategoria}")
  public List<Produto> recuperarProdutosPorSlugCategoria(@PathVariable("slugCategoria") String slugCategoria) {
    return produtoService.recuperarProdutosPorSlugCategoria(slugCategoria);
  }

  @PostMapping
  public Produto cadastraProduto(@RequestBody Produto produto) {
    return produtoService.cadastrarProduto(produto);
  }

  @PutMapping
  public Produto alterarProduto(@RequestBody Produto produto) {
    return produtoService.alterarProduto(produto);
  }

  @DeleteMapping("{idProduto}")
  public void removerProduto(@PathVariable("idProduto") long id) {
    produtoService.removerProduto(id);
  }

  @GetMapping("paginacao")
  public ResultadoPaginado<Produto> recuperarProdutosComPaginacao(
      @RequestParam(value = "pagina", defaultValue = "0") int pagina,
      @RequestParam(value = "tamanho", defaultValue = "5") int tamanho,
      @RequestParam(value = "nome", defaultValue = "") String nome) {
    Pageable pageable = PageRequest.of(pagina, tamanho);
    Page<Produto> page = produtoService.recuperarProdutoComPaginacao(pageable, nome);

    ResultadoPaginado<Produto> resultadoPaginado = new ResultadoPaginado<>(
        page.getTotalElements(),
        page.getTotalPages(),
        page.getNumber(),
        page.getContent());
    return resultadoPaginado;
  }

  @GetMapping("categoria/paginacao")
  public ResultadoPaginado<Produto> recuperarProdutosPaginadosPorSlugDaCategoria(
      @RequestParam(value = "pagina", defaultValue = "0") int pagina,
      @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
      @RequestParam(value = "slugCategoria", defaultValue = "") String slugCategoria) {
    Pageable pageable = PageRequest.of(pagina, tamanho);
    Page<Produto> page = produtoService.recuperarProdutosPaginadosPorSlugDaCategoria(slugCategoria, pageable);
    ResultadoPaginado<Produto> resultadoPaginado = new ResultadoPaginado<>(
        page.getTotalElements(),
        page.getTotalPages(),
        page.getNumber(),
        page.getContent());
    return resultadoPaginado;
  }

}
