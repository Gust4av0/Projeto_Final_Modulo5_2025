import { useState } from "react";
import { Usuario } from "../pages/Usuarios";
import "../styles/Modal.css";
import api from "../services/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  atualizarLista: () => Promise<void>;
  usuario: Usuario | null;
}

const Modal = ({ isOpen, onClose, atualizarLista, usuario }: ModalProps) => {
  if (!isOpen) return null;

  // Estados para armazenar os inputs do formulário
  const [nome, setNome] = useState(usuario?.nome || "");
  const [cpf, setCpf] = useState(usuario?.cpf || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = async () => {
    // Validação básica
    if (!nome || !cpf || !email || !senha || senha !== confirmarSenha) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    try {
      if (usuario) {
        // Se o usuário já existe, faz um PUT (editar)
        await api.put(`/usuarios/${usuario.id}`, { nome, cpf, email, senha });
      } else {
        // Se não existe, faz um POST (adicionar)
        await api.post("/usuarios", { nome, cpf, email, senha });
      }

      // Atualiza a lista e fecha o modal
      await atualizarLista();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{usuario ? "Editar Usuário" : "Adicionar Usuário"}</h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn-confirm" onClick={handleSubmit}>
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
