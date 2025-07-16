package com.projetobackend.back.service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import com.projetobackend.back.model.Carrinho;
import com.projetobackend.back.model.ItemCarrinho;
import com.projetobackend.back.model.Produto;
import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.repository.CarrinhoRepository;
import com.projetobackend.back.repository.ProdutoRepository;
import com.projetobackend.back.repository.UsuarioRepository;

@Service
@Transactional
public class CarrinhoService {

  @Autowired
  private CarrinhoRepository carrinhoRepository;
  @Autowired
  private ProdutoRepository produtoRepository;
  @Autowired
  private UsuarioRepository usuarioRepository;

  public Carrinho buscarCarrinhoAtivo(Long idUsuario) {
    Usuario usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    return carrinhoRepository.findByUsuarioAndFinalizadoFalse(usuario)
        .orElseGet(() -> {
          Carrinho c = new Carrinho();
          c.setUsuario(usuario);
          return carrinhoRepository.save(c);
        });
  }

  public Carrinho adicionarItem(Long idUsuario, Long idProduto, int qtd) {
    if (qtd < 1)
      throw new IllegalArgumentException("Qtd. mínima = 1");

    Carrinho carrinho = buscarCarrinhoAtivo(idUsuario);
    Produto produto = produtoRepository.findById(idProduto)
        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

    ItemCarrinho item = carrinho.getItens().stream()
        .filter(i -> i.getProduto().getId().equals(idProduto))
        .findFirst()
        .orElse(null);

    if (item == null) {
      item = new ItemCarrinho();
      item.setCarrinho(carrinho);
      item.setProduto(produto);
      item.setPrecoUnitario(produto.getPreco());
      item.setQuantidade(qtd);
      System.out.println("Adicionando novo item ao carrinho: " + item.getProduto().getNome());
      carrinho.getItens().add(item);
    } else {
      item.setQuantidade(item.getQuantidade() + qtd);
    }

    return atualizarTotal(carrinho);
  }

  public Carrinho alterarQuantidade(Long idUsuario, Long idProduto, int novaQtd) {
    Carrinho carrinho = buscarCarrinhoAtivo(idUsuario);

    Optional<ItemCarrinho> optionalItem = carrinho.getItens().stream()
        .filter(i -> i.getProduto().getId().equals(idProduto))
        .findFirst();

    if (optionalItem.isPresent()) {
      ItemCarrinho item = optionalItem.get();
      if (novaQtd < 1) {
        carrinho.getItens().remove(item);
      } else {
        item.setQuantidade(novaQtd);
      }
    } else {
      if (novaQtd > 0) {
        Produto produto = produtoRepository.findById(idProduto)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        ItemCarrinho novoItem = new ItemCarrinho();
        novoItem.setProduto(produto);
        novoItem.setQuantidade(novaQtd);
        novoItem.setPrecoUnitario(produto.getPreco()); // ESSENCIAL
        novoItem.setCarrinho(carrinho);

        carrinho.getItens().add(novoItem);
      }
    }

    return atualizarTotal(carrinho); // já salva o carrinho
  }

  // public Carrinho alterarQuantidade(Long idUsuario, Long idProduto, int
  // novaQtd) {
  // Carrinho carrinho = buscarCarrinhoAtivo(idUsuario);
  // System.out.println("Carrinho encontrado: " + carrinho.getId());
  //
  // Optional<ItemCarrinho> optionalItem = carrinho.getItens().stream()
  // .filter(i -> i.getProduto().getId().equals(idProduto))
  // .findFirst();
  //
  // if (optionalItem.isPresent()) {
  // ItemCarrinho item = optionalItem.get();
  // if (novaQtd < 1)
  // carrinho.getItens().remove(item);
  // else
  // item.setQuantidade(novaQtd);
  // } else {
  // if (novaQtd > 0) {
  // Produto produto = produtoRepository.findById(idProduto)
  // .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
  //
  // ItemCarrinho novoItem = new ItemCarrinho();
  // novoItem.setProduto(produto);
  // novoItem.setQuantidade(novaQtd);
  // novoItem.setCarrinho(carrinho);
  //
  // carrinho.getItens().add(novoItem);
  // }
  // }
  //
  // return atualizarTotal(carrinho);
  // }

  public Carrinho removerItem(Long idUsuario, Long idProduto) {
    return alterarQuantidade(idUsuario, idProduto, 0);
  }

  public Carrinho limparCarrinho(Long idUsuario) {
    Carrinho carrinho = buscarCarrinhoAtivo(idUsuario);
    if (carrinho.getItens().isEmpty())
      throw new RuntimeException("Carrinho vazio");

    carrinho.getItens().clear();
    carrinho.setTotal(BigDecimal.ZERO);
    // carrinho.setFinalizado(true);
    return carrinhoRepository.save(carrinho);
  }

  public Carrinho finalizarCompra(Long idUsuario) {
    Carrinho carrinho = buscarCarrinhoAtivo(idUsuario);
    if (carrinho.getItens().isEmpty())
      throw new RuntimeException("Carrinho vazio");

    carrinho.setFinalizado(true);
    return carrinhoRepository.save(carrinho); // aqui você poderia gerar Pedido, etc.
  }

  private Carrinho atualizarTotal(Carrinho carrinho) {
    BigDecimal total = carrinho.getItens().stream()
        .map(i -> i.getPrecoUnitario().multiply(BigDecimal.valueOf(i.getQuantidade())))
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    carrinho.setTotal(total);

    return carrinhoRepository.save(carrinho);

  }

}
