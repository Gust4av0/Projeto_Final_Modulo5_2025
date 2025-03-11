import { useState, useEffect } from "react"; //Agora vamos realmente usar o useEffect
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(10); //Tempo de espera antes do redirecionamento
  const [emailSent, setEmailSent] = useState(false); //Controla se o e-mail foi enviado
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMessage("E-mail inválido. Insira um e-mail válido.");
      return;
    }

    setMessage(
      "Se este e-mail estiver cadastrado, um link de redefinição foi enviado."
    );
    setEmailSent(true); //Agora o contador será ativado

    // Redirecionar para o login
    setTimeout(() => {
      navigate("/");
    }, 10000);
  };

  //useEffect para fazer a contagem regressiva
  useEffect(() => {
    if (emailSent) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); //Limpa o timer ao desmontar
    }
  }, [emailSent]); //Só executa quando `emailSent` mudar para true

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>Redefinir Senha</h1>
        {message && (
          <div className="message-box">
            <p className="message">{message}</p>
            {/*Mostra o contador e a barra de progresso após o envio */}
            {emailSent && (
              <>
                <p>Redirecionando para o login em {countdown} segundos...</p>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${(countdown / 10) * 100}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="reset-button">
            Enviar Link de Redefinição
          </button>
        </form>

        <button className="back-button" onClick={() => navigate("/")}>
          Voltar ao Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
