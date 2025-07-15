package com.projetobackend.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projetobackend.back.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
