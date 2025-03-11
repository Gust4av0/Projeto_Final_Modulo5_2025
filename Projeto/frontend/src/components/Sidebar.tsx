import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import perfilImg from "../images/perfil.jpg"; // Coloque sua imagem de perfil aqui

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="perfil-section">
        <img src={perfilImg} alt="Perfil" className="perfil-img" />
        <NavLink to="/perfil" className="perfil-link">
          Meu Perfil
        </NavLink>
      </div>

      <nav className="menu">
        <h3>Dashboard</h3>
        <NavLink to="/dashboard" className="menu-link">
          Página inicial
        </NavLink>

        <h3>Veículos</h3>
        <NavLink to="/veiculos/listar" className="menu-link">
          Listar Veículos
        </NavLink>
        <NavLink to="/veiculos/adicionar" className="menu-link">
          Adicionar Veículo
        </NavLink>

        <h3>Clientes</h3>
        <NavLink to="/clientes/listar" className="menu-link">
          Listar Clientes
        </NavLink>
        <NavLink to="/clientes/adicionar" className="menu-link">
          Adicionar Cliente
        </NavLink>

        <h3>Locações</h3>
        <NavLink to="/locacoes/listar" className="menu-link">
          Listar Locações
        </NavLink>
        <NavLink to="/locacoes/nova" className="menu-link">
          Nova Locação
        </NavLink>

        <h3>Relatórios</h3>
        <NavLink to="/relatorios/locacoes" className="menu-link">
          Relatório de Locações
        </NavLink>
        <NavLink to="/relatorios/receitas" className="menu-link">
          Relatório de Receitas
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
