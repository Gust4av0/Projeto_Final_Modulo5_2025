import { useState } from "react";
import "../styles/Usuarios.css";
import { FiTrash, FiEdit, FiLock } from "react-icons/fi";
import { MdBlock } from "react-icons/md";

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

const Usuarios = () => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCPF, setFiltroCPF] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroTelefone, setFiltroTelefone] = useState("");

  const usuarios: Usuario[] = [
    {
      id: 1,
      nome: "Carlos Silva",
      cpf: "123.456.789-00",
      email: "carlos.silva@gmail.com",
      telefone: "(11) 98765-4321",
    },
    {
      id: 2,
      nome: "Ana Souza",
      cpf: "987.654.321-00",
      email: "ana.souza@gmail.com",
      telefone: "(21) 91234-5678",
    },
    {
      id: 3,
      nome: "Roberto Lima",
      cpf: "159.357.486-00",
      email: "roberto.lima@gmail.com",
      telefone: "(31) 99876-5432",
    },
    {
      id: 4,
      nome: "Fernanda Costa",
      cpf: "753.951.852-00",
      email: "fernanda.costa@gmail.com",
      telefone: "(41) 95678-1234",
    },
    {
      id: 5,
      nome: "Mariana Oliveira",
      cpf: "852.147.963-00",
      email: "mariana.oliveira@gmail.com",
      telefone: "(51) 93456-7890",
    },
  ];

  return (
    <div className="usuarios-container">
      {/* TÍTULO NO CANTO SUPERIOR ESQUERDO */}
      <h1 className="titulo-filtro">Filtrar Usuários</h1>

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
            placeholder="CPF"
            value={filtroCPF}
            onChange={(e) => setFiltroCPF(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={filtroEmail}
            onChange={(e) => setFiltroEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={filtroTelefone}
            onChange={(e) => setFiltroTelefone(e.target.value)}
          />
        </div>
        <div className="filtro-botoes">
          <button className="btn-filtrar">Filtrar</button>
          <button className="btn-limpar">Limpar</button>
        </div>
      </div>

      {/* TABELA COM O MESMO DESIGN DO FILTRO */}
      <div className="usuarios-tabela-container">
        <table className="usuarios-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.telefone}</td>
                <td>{usuario.email}</td>
                <td className="acoes">
                  <button className="btn-acao" title="Bloquear usuário">
                    <MdBlock color="red" />
                  </button>
                  <button className="btn-acao" title="Editar informações">
                    <FiEdit color="orange" />
                  </button>
                  <button className="btn-acao" title="Alterar senha">
                    <FiLock color="blue" />
                  </button>
                  <button className="btn-acao" title="Excluir usuário">
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

export default Usuarios;
