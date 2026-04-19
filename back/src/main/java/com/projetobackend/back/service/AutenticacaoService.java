package com.projetobackend.back.service;

import com.projetobackend.back.dto.LoginResponse;
import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.repository.UsuarioRepository;
import com.projetobackend.back.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService {

    private static final Logger log = LoggerFactory.getLogger(AutenticacaoService.class);

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(String conta, String senhaRaw) {
        Usuario usuario = usuarioRepository.findByConta(conta)
                .orElse(null);

        if (usuario == null || !passwordEncoder.matches(senhaRaw, usuario.getSenha())) {
            log.warn("Tentativa de login falhou para conta: {}", conta);
            return null;
        }

        String token = jwtUtil.gerarToken(usuario.getId(), usuario.getConta(), usuario.getRole());
        log.info("Login bem-sucedido para conta: {}", conta);
        return new LoginResponse(usuario.getId(), usuario.getConta(), usuario.getRole(), token);
    }
}
