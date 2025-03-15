import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import "../styles/Cadastro.css"; // Importando o CSS da página
import background from "../images/background.jpg"; // Importando a imagem de fundo

function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const cadastrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !cpf || !password || !confirmPassword) {
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

    try {
      const response = await axios.post("http://localhost:3000/usuarios", {
        nome: name,
        email,
        cpf,
        senha: password,
      });

      if (response.status === 201) {
        setSuccess("Cadastro realizado com sucesso!");
        setName("");
        setEmail("");
        setCPF("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div className="cadastro-container" style={{ backgroundImage: `url(${background})` }}>
      <title>Cadastro - Aluga Aí Zé</title>
      <div className="cadastro-box">
        <h1>Cadastro</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={cadastrarUsuario}>
          <div className="input-group">
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCPF(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
