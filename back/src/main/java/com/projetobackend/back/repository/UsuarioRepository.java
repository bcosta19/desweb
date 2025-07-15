package com.projetobackend.back.repository;

import com.projetobackend.back.model.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  Usuario findByContaAndSenha(String conta, String senha);

  Optional<Usuario> findByConta(String conta);

  boolean existsByConta(String conta);

  // Usuario findByEmail(String email);

  // boolean existsByEmail(String email);

  // boolean existsByCpf(String cpf);
}
