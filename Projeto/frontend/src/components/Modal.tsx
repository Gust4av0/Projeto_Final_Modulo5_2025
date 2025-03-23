// src/components/Modal.tsx
import { Usuario } from "../pages/Usuarios";
import "../styles/Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  atualizarLista: () => Promise<void>;
  usuario: Usuario | null;
}

const Modal = ({ isOpen, onClose, atualizarLista, usuario }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{usuario ? "Editar Usuário" : "Adicionar Usuário"}</h2>

        <input
          type="text"
          placeholder="Nome"
          defaultValue={usuario?.nome || ""}
        />
        <input
          type="text"
          placeholder="CPF"
          defaultValue={usuario?.cpf || ""}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={usuario?.email || ""}
        />
        <input
          type="text"
          placeholder="Telefone"
          defaultValue={usuario?.telefone || ""}
        />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirmar Senha" />

        <div className="modal-buttons">
          <button className="btn-confirm" onClick={atualizarLista}>
            Salvar
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
