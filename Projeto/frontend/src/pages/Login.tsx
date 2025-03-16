import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; // Verifique se esse caminho está correto

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simulando um usuário autenticado
    const usuario: UserType = { nome: "Carlos", email };

    setUser(usuario); // Define o usuário autenticado
    navigate("/home");
  };

  return (
    <div className="login-container">
      <title>Login - Aluga Aí Zé</title>
      <link rel="icon" type="image/png" href="../images/favicon.jpg"></link>
      <div className="login-box">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
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
