import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Define como true se o usuário está autenticado
    });
    return () => unsubscribe(); // Limpa o ouvinte ao desmontar o componente
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Exibe um indicador de carregamento enquanto verifica
  }

  return isAuthenticated ? children : <Navigate to="/logIn" />;
};

export default ProtectedRoute;
