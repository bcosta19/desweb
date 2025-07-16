package com.projetobackend.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projetobackend.back.model.Carrinho;
import com.projetobackend.back.service.CarrinhoService;

@RestController
@RequestMapping("carrinhos")
@CrossOrigin("http://localhost:5173")
public class CarrinhoController {

  @Autowired
  private CarrinhoService carrinhoService;

  @GetMapping("{idUsuario}")
  public Carrinho verCarrinho(@PathVariable Long idUsuario) {
    return carrinhoService.buscarCarrinhoAtivo(idUsuario);
  }

  @PostMapping("{idUsuario}/adicionar")
  public Carrinho adicionar(
      @PathVariable Long idUsuario,
      @RequestParam Long idProduto,
      @RequestParam int qtd) {
    System.out.println(idUsuario + idProduto + qtd);
    return carrinhoService.adicionarItem(idUsuario, idProduto, qtd);
  }

  @PutMapping("{idUsuario}/alterar")
  public Carrinho alterarQuantidade(
      @PathVariable Long idUsuario,
      @RequestParam Long idProduto,
      @RequestParam int novaQtd) {
      System.out.println(">> Alterando quantidade: usuario=" + idUsuario + ", produto=" + idProduto + ", novaQtd=" + novaQtd);
    return carrinhoService.alterarQuantidade(idUsuario, idProduto, novaQtd);
  }

  @DeleteMapping("{idUsuario}/remover/{idProduto}")
  public Carrinho remover(
      @PathVariable Long idUsuario,
      @PathVariable Long idProduto) {
    return carrinhoService.removerItem(idUsuario, idProduto);
  }

  @DeleteMapping("{idUsuario}/limpar")
  public Carrinho limpar(@PathVariable Long idUsuario) {
    return carrinhoService.limparCarrinho(idUsuario);
  }

  @PostMapping("{idUsuario}/checkout")
  public Carrinho finalizar(@PathVariable Long idUsuario) {
    return carrinhoService.finalizarCompra(idUsuario);
  }

}
