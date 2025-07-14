package com.projetobackend.back.repository;

import com.projetobackend.back.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  Usuario finByContaAndSenha(String conta, String senha);

  Usuario findByEmail(String email);

  boolean existsByEmail(String email);

  boolean existsByCpf(String cpf);
}
