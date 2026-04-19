package com.projetobackend.back.service;

import com.projetobackend.back.model.Produto;
import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.repository.ProdutoRepository;
import com.projetobackend.back.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private static final Logger log = LoggerFactory.getLogger(UsuarioService.class);

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario cadastrarUsuario(Usuario usuario) throws Exception {
        if (usuarioRepository.existsByConta(usuario.getConta())) {
            throw new Exception("Usuário já cadastrado com essa conta.");
        }
        // Hash da senha antes de persistir
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public List<Produto> recuperarFavoritos(Long idUsuario) {
        log.info("Recuperando favoritos do usuário ID: {}", idUsuario);
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
}
