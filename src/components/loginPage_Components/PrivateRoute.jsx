import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser; // verifica se há um usuário autenticado

  if (!user) {
    return <Navigate to="/login" replace />; // redireciona para a página de login se não autenticado
  }

  return children;
};

export default PrivateRoute;
