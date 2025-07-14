package com.projetobackend.back.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Produto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotEmpty(message = "A imagem deve ser informada")
  private String imagem;

  @NotEmpty(message = "O nome do produto deve ser informado")
  private String nome;

  private String slug;

  @NotEmpty(message = "A descrição do produto deve ser informada")
  private String descricao;

  private boolean disponivel;

  @Min(value = 0, message = "A quantidade em estoque deve ser maior ou igual a 0.")
  private int qtdEstoque;

  @NotNull(message = "O preço do produto deve ser informado")
  @DecimalMin(inclusive = true, value = "0.1", message = "O preço do produto deve ser maior que 0.")
  private BigDecimal preco;

  @NotNull(message = "A Data de Cadastro deve ser informada")
  @Column(name = "DATA_CADASTRO")
  private LocalDate dataCadastro;

  @NotNull(message = "A Catgoria deve ser informada")
  @ManyToOne
  private Categoria categoria;

  public Produto(String imagem, String nome, String slug, String descricao,
      boolean disponivel, int qtdEstoque, BigDecimal preco,
      LocalDate dataCadastro, Categoria categoria) {
    this.imagem = imagem;
    this.nome = nome;
    this.slug = slug;
    this.descricao = descricao;
    this.disponivel = disponivel;
    this.qtdEstoque = qtdEstoque;
    this.preco = preco;
    this.dataCadastro = dataCadastro;
    this.categoria = categoria;
  }

}
