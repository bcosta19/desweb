package com.projetobackend.back.controller;

import com.projetobackend.back.model.Produto;
import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("cadastro")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario cadastrado = usuarioService.cadastrarUsuario(usuario);
            // Nunca retornar a senha, mesmo que hasheada
            cadastrado.setSenha(null);
            return ResponseEntity.ok(cadastrado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("favoritos")
    public List<Produto> recuperarFavoritos(Authentication auth) {
        Long idUsuario = (Long) auth.getPrincipal();
        return usuarioService.recuperarFavoritos(idUsuario);
    }

    @PostMapping("favoritos/{idProduto}")
    public ResponseEntity<?> adicionarFavorito(@PathVariable Long idProduto, Authentication auth) {
        Long idUsuario = (Long) auth.getPrincipal();
        try {
            usuarioService.adicionarFavorito(idUsuario, idProduto);
            return ResponseEntity.ok("Produto adicionado aos favoritos");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("favoritos/{idProduto}")
    public ResponseEntity<?> removerFavorito(@PathVariable Long idProduto, Authentication auth) {
        Long idUsuario = (Long) auth.getPrincipal();
        try {
            usuarioService.removerFavorito(idUsuario, idProduto);
            return ResponseEntity.ok("Produto removido dos favoritos");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
