package com.projetobackend.back.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String conta;
  private String senha;

  @ManyToMany
  @JoinTable(name = "usuario_favoritos", joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "produto_id"))
  private List<Produto> favoritos = new ArrayList<>();

  public Usuario(String conta, String senha) {
    this.conta = conta;
    this.senha = senha;
  }
}
