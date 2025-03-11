import "../styles/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const data = [
    { mes: "Jan", receita: 4000 },
    { mes: "Fev", receita: 3000 },
    { mes: "Mar", receita: 5000 },
    { mes: "Abr", receita: 4000 },
    { mes: "Mai", receita: 6000 },
    { mes: "Jun", receita: 7000 },
  ];

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="section-group">
        <section className="section-card">
          <h2>Resumo de Locações</h2>
          <div className="card-group">
            <div className="card">
              Ativas<strong>10</strong>
            </div>
            <div className="card">
              Finalizadas<strong>20</strong>
            </div>
            <div className="card">
              Pendentes<strong>5</strong>
            </div>
          </div>
        </section>

        <section className="section-card">
          <h2>Receitas e Finanças</h2>
          <div className="card-group">
            <div className="card">
              Receita Mensal<strong>R$ 25.000</strong>
            </div>
            <div className="card">
              Receita Anual<strong>R$ 300.000</strong>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="receita" fill="#5a47d9" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="section-card">
          <h2>Veículos</h2>
          <div className="card-group">
            <div className="card">
              Disponíveis<strong>12</strong>
            </div>
            <div className="card">
              Alugados<strong>8</strong>
            </div>
            <div className="card">
              Manutenção<strong>2</strong>
            </div>
          </div>
        </section>

        <section className="section-card">
          <h2>Clientes</h2>
          <div className="card-group">
            <div className="card">
              Total<strong>150</strong>
            </div>
            <div className="card">
              Ativos<strong>45</strong>
            </div>
            <div className="card">
              Novos<strong>10</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
