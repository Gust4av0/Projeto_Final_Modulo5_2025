function Home({ user }: { user: { nome: string } }) {
  return (
    <div className="home-container">
      <h1>
        Olá, <span className="user-name">{user?.nome || "Usuário"}</span>, seja
        bem-vindo ao sistema de locação!
      </h1>
      <p>Escolha uma opção no menu para começar.</p>
    </div>
  );
}

export default Home;
