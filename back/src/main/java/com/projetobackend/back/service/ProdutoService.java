package com.projetobackend.back.service;

import com.projetobackend.back.model.Produto;
import com.projetobackend.back.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProdutoService {

  @Autowired
  private ProdutoRepository produtoRepository;

  public List<Produto> recuperarProdutos() {
    return produtoRepository.recuperarTodosProdutosComCategoria();
  }

  public Produto cadastrarProduto(Produto produto) {
    return produtoRepository.save(produto);
  }

  @Transactional
  public Produto alterarProduto(Produto produto) {
    produtoRepository.recuperarProdutoPorIdComLock(produto.getId())
        .orElseThrow(() -> new RuntimeException("Produto não encontrado para alteração"));

    return produtoRepository.save(produto);
  }

  @Transactional(rollbackFor = Exception.class)
  public void removerProduto(long id) {
    produtoRepository.deleteById(id);
  }

  public Produto recuperarProdutoPorId(long id) {
    return produtoRepository.recuperarProdutoPorId(id)
        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
  }

  public Page<Produto> recuperarProdutoComPaginacao(Pageable pageable, String nome) {
    return produtoRepository.recuperarProdutosComPaginacao(pageable, nome);
  }

  public List<Produto> recuperarProdutosPorSlugCategoria(String slugCategoria) {
    return produtoRepository.recuperarProdutosPorSlugCategoria(slugCategoria);
  }

  public Page<Produto> recuperarProdutosPaginadosPorSlugDaCategoria(String slugCategoria, Pageable pageable) {
    if (!slugCategoria.isEmpty()) {
      return produtoRepository.recuperarProdutosPaginadosPorSlugDaCategoria(slugCategoria, pageable);
    } else {
      return produtoRepository.recuperarProdutosPaginados(pageable);
    }
  }

}
