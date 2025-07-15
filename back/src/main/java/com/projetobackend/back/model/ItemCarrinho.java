package com.projetobackend.back.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ItemCarrinho {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private Carrinho carrinho;

  @ManyToOne
  private Produto produto;

  private int quantidade;
  private BigDecimal precoUnitario;

}
