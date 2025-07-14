package com.projetobackend.back.service;

import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.opringframework.stereotype.Service;

@Service
public class AutenticacaoService {
  @Autowired
  private UsuarioRepository usuarioRepository;

  public Usuario login(Usuario usuario) {
    return usuarioRepository.finByContaAndSenha(usuario.getConta(), usuario.getSenha());
  }
}
