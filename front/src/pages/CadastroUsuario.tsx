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
  const [resultado, setResultado] = useState<null | CadastroInputData>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CadastroInputData>({
    resolver: zodResolver(cadastroSchema),
  })

  const onSubmit = (data: CadastroInputData) => {
    // Aqui simula o envio ao backend, implementar posteriormente
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setResultado(data);
        reset();
        resolve();
      }, 1000);
    });
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

          {resultado && (
            <div className="alert alert-success mt-4" role="alert">
              Usuário {resultado.nome} cadastrado com sucesso!
            </div>
          )}
        </div>
      </div>
    </div>

  )

}

export default cadastroUsuario;


