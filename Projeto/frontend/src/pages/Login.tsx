import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; // Verifique se esse caminho está correto
import api from "../services/api"; 

// Definição do tipo para o usuário
type UserType = {
  nome: string;
  email: string;
};

function Login({ setUser }: { setUser: (user: UserType) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  //função para validar o usuário no banco e realizar o login
  const realizarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await api.post("/login", {
        email: email,
        senha: password,
      });
  
      // Pegando o token e nome do usuário retornado
      const { token, nome } = response.data;
  
      // Guardando o token no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("nomeUsuario", nome); // Armazena o nome do usuário
  
      // Define o usuário autenticado
      setUser({ nome, email });
  
      // Redireciona para a home
      navigate("/home");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao fazer login!");
    }
  };

  return (
    <div className="login-container">
      <title>Login - Aluga Aí Zé</title>
      <link rel="icon" type="image/png" href="../images/favicon.jpg"></link>
      <div className="login-box">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={realizarLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <Link to="/esqueci-senha" className="forgot-password">
          Esqueci minha senha
        </Link>

        <Link to="/cadastro" className="signup-link">
          Criar uma conta
        </Link>
      </div>
    </div>
  );
}

export default Login;
