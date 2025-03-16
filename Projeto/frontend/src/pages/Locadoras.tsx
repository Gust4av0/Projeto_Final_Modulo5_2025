import { useState } from "react";
import "../styles/Locadoras.css";
import { FiTrash, FiEdit, FiMapPin } from "react-icons/fi";

interface Locadora {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  endereco: string;
}

const Locadoras = () => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroEndereco, setFiltroEndereco] = useState("");

  const locadoras: Locadora[] = [
    {
      id: 1,
      nome: "Locadora Top Car",
      cidade: "São Paulo",
      estado: "SP",
      endereco: "Av. Paulista, 1000",
    },
    {
      id: 2,
      nome: "Aluga Fácil",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      endereco: "Rua Copacabana, 200",
    },
    {
      id: 3,
      nome: "Veículos Rápidos",
      cidade: "Belo Horizonte",
      estado: "MG",
      endereco: "Av. Contorno, 300",
    },
    {
      id: 4,
      nome: "Carro Express",
      cidade: "Curitiba",
      estado: "PR",
      endereco: "Rua das Flores, 400",
    },
    {
      id: 5,
      nome: "Auto Rent",
      cidade: "Porto Alegre",
      estado: "RS",
      endereco: "Av. Farrapos, 500",
    },
  ];

  return (
    <div className="locadoras-container">
      {/* TÍTULO NO CANTO SUPERIOR ESQUERDO */}
      <h1 className="titulo-filtro">Filtrar Locadoras</h1>

      {/* FILTRO COM ESPAÇAMENTO AJUSTADO */}
      <div className="filtros">
        <div className="filtro-inputs">
          <input
            type="text"
            placeholder="Nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cidade"
            value={filtroCidade}
            onChange={(e) => setFiltroCidade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Estado"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          />
          <input
            type="text"
            placeholder="Endereço"
            value={filtroEndereco}
            onChange={(e) => setFiltroEndereco(e.target.value)}
          />
        </div>
        <div className="filtro-botoes">
          <button className="btn-filtrar">Filtrar</button>
          <button className="btn-limpar">Limpar</button>
        </div>
      </div>

      {/* TABELA COM O MESMO DESIGN DO FILTRO */}
      <div className="locadoras-tabela-container">
        <table className="locadoras-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {locadoras.map((locadora) => (
              <tr key={locadora.id}>
                <td>{locadora.nome}</td>
                <td>{locadora.cidade}</td>
                <td>{locadora.estado}</td>
                <td>{locadora.endereco}</td>
                <td className="acoes">
                  <button className="btn-acao" title="Editar Nome">
                    <FiEdit color="orange" />
                  </button>
                  <button className="btn-acao" title="Editar Endereço">
                    <FiMapPin color="blue" />
                  </button>
                  <button className="btn-acao" title="Excluir">
                    <FiTrash color="gray" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Locadoras;
