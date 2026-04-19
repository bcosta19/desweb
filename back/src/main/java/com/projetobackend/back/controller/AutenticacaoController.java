package com.projetobackend.back.controller;

import com.projetobackend.back.dto.LoginResponse;
import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.service.AutenticacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("autenticacao")
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService autenticacaoService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        LoginResponse response = autenticacaoService.login(usuario.getConta(), usuario.getSenha());
        if (response != null) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
    }
}
