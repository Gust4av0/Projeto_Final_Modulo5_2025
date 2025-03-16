import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiKey, FiLayers } from "react-icons/fi"; // FiLayers para Categorias
import perfilImg from "../images/perfil.jpg";
import "../styles/Sidebar.css";
import { FaCarRear } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

interface SidebarProps {
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
  user: { nome: string };
}

function Sidebar({ isMinimized, setIsMinimized, user }: SidebarProps) {
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
          <img src={perfilImg} alt="Perfil" className="profile-img" />
          <p>{user?.nome}</p>
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
          <NavLink to="/veiculos">
            <FaCarRear size={24} />
            {!isMinimized && <span>Veículos</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/categorias">
            <FiLayers size={24} />
            {!isMinimized && <span>Categorias</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
