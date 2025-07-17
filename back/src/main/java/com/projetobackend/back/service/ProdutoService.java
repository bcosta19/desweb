package com.projetobackend.back.service;

import com.projetobackend.back.model.Produto;
import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.repository.CarrinhoRepository;
import com.projetobackend.back.repository.ProdutoRepository;
import com.projetobackend.back.repository.UsuarioRepository;

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

  @Autowired
  private CarrinhoService carrinhoService;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private CarrinhoRepository carrinhoRepository;

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
    List<Usuario> usuariosComFavorito = usuarioRepository.findAllByFavoritosId(id);
    //
    // remove de favoritos
    for (Usuario usuario : usuariosComFavorito) {
      usuario.getFavoritos().removeIf(produto -> produto.getId().equals(id));
      usuarioRepository.save(usuario);
    }

    // remove de todos os carrinhos
    List<Usuario> todosUsuarios = usuarioRepository.findAll();
    for (Usuario usuario : todosUsuarios) {
      try {
        carrinhoService.removerItem(usuario.getId(), id);
      } catch (Exception e) {
        // Produto pode não estar no carrinho, então ignoramos
        System.out.println("Produto " + id + " não estava no carrinho do usuário " + usuario.getId());
      }
    }

    // Por fim, remover o produto do banco
    produtoRepository.deleteById(id);

    // carrinhoService.removerItem(id, id);

    produtoRepository.deleteById(id);
  }

  public Produto recuperarProdutoPorId(long id) {
    return produtoRepository.recuperarProdutoPorId(id)
        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
  }

  public Page<Produto> recuperarProdutoComPaginacao(Pageable pageable, String nome) {
    String nomeFormatado = nome == null || nome.trim().isEmpty() ? "%" : "%" + nome + "%";
    return produtoRepository.recuperarProdutosComPaginacao(pageable, nomeFormatado);
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
