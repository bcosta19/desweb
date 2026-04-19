import { Navigate } from "react-router-dom";
import { isLogado } from "../hooks/useAuth";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/** Redireciona para /login se o usuário não estiver autenticado. */
const RotaAutenticada = ({ children }: Props) => {
  if (!isLogado()) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default RotaAutenticada;
