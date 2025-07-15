package com.projetobackend.back;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.projetobackend.back.model.Categoria;
import com.projetobackend.back.model.Produto;
import com.projetobackend.back.model.Usuario;
import com.projetobackend.back.repository.CategoriaRepository;
import com.projetobackend.back.repository.ProdutoRepository;
import com.projetobackend.back.repository.UsuarioRepository;

@SpringBootApplication
public class BackApplication implements CommandLineRunner {

  @Autowired
  private ProdutoRepository produtoRepository;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private CategoriaRepository categoriaRepository;

  public static void main(String[] args) {
    SpringApplication.run(BackApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    Usuario usuario = new Usuario("admin", "admin");
    usuarioRepository.save(usuario);

    Categoria varas = new Categoria("Varas", "varas");
    categoriaRepository.save(varas);
    Categoria chumbadas = new Categoria("Chumbadas", "chumbadas");
    categoriaRepository.save(chumbadas);
    Categoria linhas = new Categoria("Linhas", "linhas");
    categoriaRepository.save(linhas);
    Categoria carretilhas = new Categoria("Carretilhas", "carretilhas");
    categoriaRepository.save(carretilhas);

    final String url = "imagens";
    final LocalDate hoje = LocalDate.now();

    List<Produto> produtos = List.of(// VARAS
        new Produto(url + "/vara1.jpg", "Vara de Pesca Shimano FX", "vara-shimano-fx",
            "Vara de pesca leve, ideal para iniciantes e pescarias em água doce.",
            true, 12, bd(199.90), hoje, varas),

        new Produto(url + "/vara2.jpg", "Vara Marine Sports Solara", "vara-marine-sports-solara",
            "Modelo resistente e versátil para diversas modalidades de pesca.",
            true, 8, bd(249.90), hoje, varas),

        new Produto(url + "/vara3.jpg", "Vara Saint Plus Evolution", "vara-saint-plus-evolution",
            "Excelente ação rápida com acabamento de alta qualidade.",
            true, 5, bd(319.90), hoje, varas),

        new Produto(url + "/vara4.jpg", "Vara Daiwa Laguna", "vara-daiwa-laguna",
            "Desmoderno e ótimo desempenho em pescarias costeiras.",
            false, 0, bd(289.90), hoje, varas),

        new Produto(url + "/vara5.jpg", "Vara Albatroz Black Fish", "vara-albatroz-black-fish",
            "Boa resistência para peixes maiores e estrutura reforçada.",
            true, 10, bd(16.90), hoje, varas),

        // LINHAS
        new Produto(url + "/linha1.jpg", "Linha Monofilamento Araty", "linha-monofilamento-araty",
            "Linha de nylon transparente, ideal para pesca leve.",
            true, 20, bd(19.90), hoje, linhas),

        new Produto(url + "/linha2.jpg", "Linha Multifilamento Power Pro", "linha-multifilamento-power-pro",
            "Alta resistência e sensibilidade, excelente para pesca esportiva.",
            true, 15, bd(89.90), hoje, linhas),

        new Produto(url + "/linha3.jpg", "Linha Fluorocarbono Seaguar", "linha-fluorocarbono-seaguar",
            "Invisível na água, ideal para ambientes com muita pressão de pesca.",
            true, 7, bd(99.90), hoje, linhas),

        new Produto(url + "/linha4.jpg", "Linha de Pesca Maruri Max Force", "linha-maruri-max-force",
            "Linha durável e confiável, com bom custo-benefício.",
            false, 0, bd(29.90), hoje, linhas),

        new Produto(url + "/linha5.jpg", "Linha YGK G-soul Upgrade", "linha-ygk-g-soul-upgrade",
            "Linha japonesa premium com alta performance.",
            true, 4, bd(149.90), hoje, linhas),

        // CARRETILHAS
        new Produto(url + "/carretilha1.jpg", "Carretilha Shimano SLX", "carretilha-shimano-slx",
            "Desempenho suave e estrutura compacta para pescarias exigentes.",
            true, 6, bd(499.90), hoje, carretilhas),

        new Produto(url + "/carretilha2.jpg", "Carretilha Daiwa Fuego", "carretilha-daiwa-fuego",
            "Excelente custo-benefício e boa capacidade de linha.",
            true, 9, bd(459.90), hoje, carretilhas),

        new Produto(url + "/carretilha3.jpg", "Carretilha Marine Sports Titan", "carretilha-marine-sports-titan",
            "Robusta e confiável, ideal para peixes de grande porte.",
            true, 3, bd(379.90), hoje, carretilhas),

        new Produto(url + "/carretilha4.jpg", "Carretilha Abu Garcia Revo", "carretilha-abu-garcia-revo",
            "Modelo top de linha com desempenho excepcional.",
            false, 0, bd(799.90), hoje, carretilhas),

        new Produto(url + "/carretilha5.jpg", "Carretilha Albatroz Fire", "carretilha-albatroz-fire",
            "Boa ergonomia e ótimo desempenho em pescarias costeiras.",
            true, 11, bd(269.90), hoje, carretilhas),

        // CHUMBADAS
        new Produto(url + "/chumbada1.jpg", "Chumbada Pirâmide 50g", "chumbada-piramide-50g",
            "Ideal para pesca em praias com correnteza forte.",
            true, 40, bd(4.90), hoje, chumbadas),

        new Produto(url + "/chumbada2.jpg", "Chumbada Oliva 30g", "chumbada-oliva-30g",
            "Boa performance em lagos e rios de corrente fraca.",
            true, 50, bd(3.90), hoje, chumbadas),

        new Produto(url + "/chumbada3.jpg", "Chumbada Bola 100g", "chumbada-bola-100g",
            "Peso ideal para pesca de fundo com iscas naturais.",
            true, 30, bd(5.90), hoje, chumbadas),

        new Produto(url + "/chumbada4.jpg", "Chumbada Disco 80g", "chumbada-disco-80g",
            "Design achatado que evita rolamentos em rios.",
            false, 0, bd(5.50), hoje, chumbadas),

        new Produto(url + "/chumbada5.jpg", "Chumbada Palito 20g", "chumbada-palito-20g",
            "Ideal para pesca de arremesso com precisão.",
            true, 60, bd(2.90), hoje, chumbadas));
    produtoRepository.saveAll(produtos);

  }

  private static BigDecimal bd(double valor) {
    return BigDecimal.valueOf(valor).setScale(2);
  }

}
