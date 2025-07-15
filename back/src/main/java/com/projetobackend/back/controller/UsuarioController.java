package com.projetobackend.back.controller;

import com.projetobackend.back.model.Produto;
import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.service.UsuarioService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("usuarios")
public class UsuarioController {

  @Autowired
  private UsuarioService usuarioService;

  @PostMapping("cadastro")
  public ResponseEntity<?> cadastrarUsuario(@RequestBody Usuario usuario) {
    try {
      Usuario usuarioCadastrado = usuarioService.cadastrarUsuario(usuario);
      return ResponseEntity.ok(usuarioCadastrado);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("{id}/favoritos")
  public List<Produto> recuperarFavoritos(@PathVariable Long id) {
    return usuarioService.recuperarFavoritos(id);
  }

  @PostMapping("{idUsuario}/favoritos/{idProduto}")
  public ResponseEntity<?> adicionarFavorito(@PathVariable Long idUsuario, @PathVariable Long idProduto) {
    try {
      usuarioService.adicionarFavorito(idUsuario, idProduto);
      return ResponseEntity.ok("Produto adicionado aos favoritos");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @DeleteMapping("{idUsuario}/favoritos/{idProduto}")
  public ResponseEntity<?> removerFavorito(@PathVariable Long idUsuario, @PathVariable Long idProduto) {
    try {
      usuarioService.removerFavorito(idUsuario, idProduto);
      return ResponseEntity.ok("Produto removido dos favoritos");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

}
