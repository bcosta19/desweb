package com.projetobackend.back.controller;

import com.projetobackend.back.model.Carrinho;
import com.projetobackend.back.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("carrinhos")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @GetMapping
    public Carrinho verCarrinho(Authentication auth) {
        Long idUsuario = (Long) auth.getPrincipal();
        return carrinhoService.buscarCarrinhoAtivo(idUsuario);
    }

    @PostMapping("adicionar")
    public Carrinho adicionar(@RequestParam Long idProduto,
                              @RequestParam int qtd,
                              Authentication auth) {
        Long idUsuario = (Long) auth.getPrincipal();
        return carrinhoService.adicionarItem(idUsuario, idProduto, qtd);
    }

    @PutMapping("alterar")
    public Carrinho alterarQuantidade(@RequestParam Long idProduto,
                                      @RequestParam int novaQtd,
                                      Authentication auth) {
        Long idUsuario = (Long) auth.getPrincipal();
        return carrinhoService.alterarQuantidade(idUsuario, idProduto, novaQtd);
    }

    @DeleteMapping("remover/{idProduto}")
    public Carrinho remover(@PathVariable Long idProduto, Authentication auth) {
        Long idUsuario = (Long) auth.getPrincipal();
        return carrinhoService.removerItem(idUsuario, idProduto);
    }

    @DeleteMapping("limpar")
    public Carrinho limpar(Authentication auth) {
        Long idUsuario = (Long) auth.getPrincipal();
        return carrinhoService.limparCarrinho(idUsuario);
    }

    @PostMapping("checkout")
    public Carrinho finalizar(Authentication auth) {
        Long idUsuario = (Long) auth.getPrincipal();
        return carrinhoService.finalizarCompra(idUsuario);
    }
}
