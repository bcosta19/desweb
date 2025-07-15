package com.projetobackend.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetobackend.back.model.Carrinho;
import com.projetobackend.back.model.Usuario;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
  Optional<Carrinho> findByUsuarioAndFinalizadoFalse(Usuario usuario);

}
