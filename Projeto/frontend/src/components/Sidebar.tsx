import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiKey, FiLayers, FiUser } from "react-icons/fi";
import "../styles/Sidebar.css";
import { FaCarRear } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

interface SidebarProps {
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
  user: { nome: string };
}

function Sidebar({ isMinimized, setIsMinimized, user }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // adicionei localStore para limpar o token
    localStorage.removeItem("token");
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("usuario_id");
    navigate("/login");
  };

  const handleMinhaConta = () => {
    navigate("/minha-conta");
  };

  return (
    <div className={`sidebar ${isMinimized ? "minimized" : ""}`}>
      <button
        className="menu-toggle"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <IoMenu size={32} className="menu-icon" />
      </button>

      {!isMinimized && (
        <div className="user-profile">
          <button
            className="user-profile-button"
            onClick={handleMinhaConta}
            title="Editar perfil"
          >
            <FiUser className="profile-icon" />
            {user?.nome || "Usuário"}
          </button>
        </div>
      )}

      <ul>
        <li>
          <NavLink to="/home">
            <FiHome size={24} />
            {!isMinimized && <span>Home</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/usuarios">
            <FiUsers size={24} />
            {!isMinimized && <span>Usuários</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/locadoras">
            <FiKey size={24} />
            {!isMinimized && <span>Locadoras</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/categorias">
            <FiLayers size={24} />
            {!isMinimized && <span>Categorias</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/veiculos">
            <FaCarRear size={24} />
            {!isMinimized && <span>Veículos</span>}
          </NavLink>
        </li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt size={24} />
            {!isMinimized && <span>Sair</span>}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
