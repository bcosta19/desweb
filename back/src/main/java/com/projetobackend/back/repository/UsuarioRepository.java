package com.projetobackend.back.repository;

import com.projetobackend.back.model.Usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  Usuario findByContaAndSenha(String conta, String senha);

  @Query("select u from Usuario u join u.favoritos p where p.id = :idProduto")
  List<Usuario> findAllByFavoritosId(@Param("idProduto") Long idProduto);

  Optional<Usuario> findByConta(String conta);

  boolean existsByConta(String conta);

  // Usuario findByEmail(String email);

  // boolean existsByEmail(String email);

  // boolean existsByCpf(String cpf);
}
