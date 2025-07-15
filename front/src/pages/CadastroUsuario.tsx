import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";


const cadastroSchema = z
  .object({
    nome: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .max(50, "O nome deve ter no máximo 50 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .regex(/.*[A-Z].*/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/.*[a-z].*/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/.*[0-9].*/, "A senha deve conter pelo menos um número"),
    confirmarSenha: z.string().min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
  })
  .refine(({ senha, confirmarSenha }) => senha === confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })

type CadastroInputData = z.infer<typeof cadastroSchema>;

const cadastroUsuario = () => {

  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CadastroInputData>({
    resolver: zodResolver(cadastroSchema),
  })

  const onSubmit = async (data: CadastroInputData) => {
    // Aqui simula o envio ao backend, implementar posteriormente

    setMensagemErro(null);
    setMensagemSucesso(null);

    try {
      const resp = await fetch("http://localhost:8080/usuarios/cadastro",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conta: data.nome,
            senha: data.senha
          }),
        });

      if (!resp.ok) {
        const errorMsg = await resp.text();
        console.log("Erro do backend:", errorMsg); // deve aparecer no console
        setMensagemErro(errorMsg);
        return;
      }

      const usuarioCadastrado = await resp.json();
      setMensagemSucesso(`Usuário ${usuarioCadastrado.conta} cadastrado com sucesso!`);
      reset();

    } catch (error) {
      alert("Erro de conexão")
    }



    // return new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     setResultado(data);
    //     reset();
    //     resolve();
    //   }, 1000);
    // });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div className="card shadow w-100" style={{ maxWidth: 480 }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Cadastro de Usuário</h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Nome */}
            <div className="mb-3">
              <label className="form-label">Nome completo</label>
              <input
                type="text"
                className={`form-control ${errors.nome ? "is-invalid" : ""}`}
                placeholder="Digite seu nome"
                {...register("nome")}
                disabled={isSubmitting}
              />
              {errors.nome && (
                <div className="invalid-feedback">{errors.nome.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="seu@email.com"
                {...register("email")}
                disabled={isSubmitting}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Senha */}
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                placeholder="********"
                {...register("senha")}
                disabled={isSubmitting}
              />
              {errors.senha && (
                <div className="invalid-feedback">{errors.senha.message}</div>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="mb-4">
              <label className="form-label">Confirmar Senha</label>
              <input
                type="password"
                className={`form-control ${errors.confirmarSenha ? "is-invalid" : ""}`}
                placeholder="********"
                {...register("confirmarSenha")}
                disabled={isSubmitting}
              />
              {errors.confirmarSenha && (
                <div className="invalid-feedback">
                  {errors.confirmarSenha.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
          {mensagemErro && (
            <div className="alert alert-danger mt-4" role="alert">
              {mensagemErro}
            </div>
          )}

          {mensagemSucesso && (
            <div className="alert alert-success mt-4" role="alert">
              {mensagemSucesso}
            </div>
          )}

        </div>
      </div>
    </div>

  )

}

export default cadastroUsuario;


