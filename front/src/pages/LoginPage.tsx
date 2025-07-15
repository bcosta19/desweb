import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  conta: z.string().min(3, "A conta deve ter no mínimo 3 caracteres"),
  senha: z.string().min(5, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function PaginaLoginUsuario() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {

    try {
      const resp = await fetch(
        "http://localhost:8080/autenticacao/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conta: data.conta, senha: data.senha }),
        }
      );
      if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(errorText || "Erro ao autenticar");
        return;
      }

      const usuario = await resp.json();
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      navigate("/");
      window.location.reload();

    } catch (e: any) {
      setError("conta", { message: e.message });
    }
  }


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div className="card shadow w-100" style={{ maxWidth: 400 }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Conta (nome de usuário) */}
            <div className="mb-3">
              <label className="form-label">Usuário</label>
              <input
                type="text"
                className={`form-control ${errors.conta ? "is-invalid" : ""}`}
                placeholder="admin, joao123, etc."
                {...register("conta")}
                disabled={isSubmitting}
              />
              {errors.conta && (
                <div className="invalid-feedback">
                  {errors.conta.message}
                </div>
              )}
            </div>            {/* Senha */}
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

