import { useEffect, useState } from "react";

function Home() {
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    // Pegando o nome completo do usuário salvo no login
    const nomeSalvo = localStorage.getItem("nomeUsuario") || "Usuário";

    setNomeUsuario(nomeSalvo);
  }, []);

  return (
    <div>
      <h1>Olá, {nomeUsuario}!</h1>
      <br />
      <h2>Seja Bem Vindo ao sistema de Locações</h2>
    </div>
  );
}

export default Home;
