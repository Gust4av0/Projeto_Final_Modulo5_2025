import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Cadastro.css"; // Importando o CSS da página
import background from "../images/background.jpg"; // Importando a imagem de fundo

function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos!");
      return;
    }
    if (!email.includes("@")) {
      setError("E-mail inválido!");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }
    console.log("Cadastro realizado com:", { name, email, password });
  };

  return (
    <div
      className="cadastro-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="cadastro-box">
        <h1>Cadastro</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="cadastro-button">
            Cadastrar
          </button>
        </form>
        <Link to="/" className="login-link">
          Já tem uma conta? Faça login
        </Link>
      </div>
    </div>
  );
}

export default Cadastro;
