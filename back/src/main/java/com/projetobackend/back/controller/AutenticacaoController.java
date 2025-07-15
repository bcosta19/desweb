package com.projetobackend.back.controller;

import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.service.AutenticacaoService;
import com.projetobackend.back.util.TokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("autenticacao")
public class AutenticacaoController {
  @Autowired
  private AutenticacaoService autenticacaoService;

  @PostMapping("login")
  public ResponseEntity<?> login(@RequestBody Usuario usuario) {
    System.out.println("Tentando autenticar usuário: " + usuario.getConta());

    Usuario usuarioAutenticado = autenticacaoService.login(usuario);
    if (usuarioAutenticado != null) {
      return ResponseEntity.ok(usuarioAutenticado);
    } else {
      return ResponseEntity.badRequest().body("Usuário ou senha inválidos");
    }
  }
  // public TokenResponse login(@RequestBody Usuario usuario) {
  // System.out.println("Tentando autenticar usuário: " + usuario.getConta());
  //
  // Usuario usuarioAutenticado = autenticacaoService.login(usuario);
  // if (usuarioAutenticado != null) {
  // return new TokenResponse(usuarioAutenticado.getId());
  // } else {
  // return new TokenResponse(0);
  // }
  // }
}
