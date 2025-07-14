import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function PaginaLoginUsuario() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    // Simula verificação de login
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Login com sucesso:", data);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div className="card shadow w-100" style={{ maxWidth: 400 }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <div className="mb-4">
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

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="text-center">
            <p className="mb-0">
              Não tem uma conta?{' '}
              <button
                className="btn btn-link p-0"
                onClick={() => navigate("/cadastro")}
              >
                Cadastre-se aqui
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

