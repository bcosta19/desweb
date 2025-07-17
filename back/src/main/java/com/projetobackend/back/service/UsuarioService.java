package com.projetobackend.back.service;

import com.projetobackend.back.model.Produto;
import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.repository.ProdutoRepository;
import com.projetobackend.back.repository.UsuarioRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private ProdutoRepository produtoRepository;

  public List<Produto> recuperarFavoritos(Long idUsuario) {
    System.out.println("Requisição do usuário com ID: " + idUsuario);
    Usuario usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    return usuario.getFavoritos();
  }

  public void adicionarFavorito(Long idUsuario, Long idProduto) {
    Usuario usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    Produto produto = produtoRepository.findById(idProduto)
        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    if (!usuario.getFavoritos().contains(produto)) {
      usuario.getFavoritos().add(produto);
      usuarioRepository.save(usuario);
    }
  }

  public void removerFavorito(Long idUsuario, Long idProduto) {
    Usuario usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    Produto produto = produtoRepository.findById(idProduto)
        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    usuario.getFavoritos().remove(produto);
    usuarioRepository.save(usuario);
  }

  public Usuario cadastrarUsuario(Usuario usuario) throws Exception {
    if (usuarioRepository.existsByConta(usuario.getConta())) {
      throw new Exception("Usuário já cadastrado com essa conta.");
    }

    return usuarioRepository.save(usuario);
  }

  public boolean validarUsuario(String conta, String senha) {
    Usuario usuario = usuarioRepository.findByContaAndSenha(conta, senha);
    return usuario != null;
  }
}
