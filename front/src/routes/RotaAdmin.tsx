import { Navigate } from "react-router-dom";
import { isAdmin, isLogado } from "../hooks/useAuth";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Protege rotas que exigem role ADMIN.
 * Redireciona para /login se não estiver autenticado,
 * ou para / se estiver autenticado mas não for admin.
 */
const RotaAdmin = ({ children }: Props) => {
  if (!isLogado()) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default RotaAdmin;
