import { useState, useEffect, useCallback } from "react";
import "../styles/Locadoras.css";
import { FiTrash, FiEdit } from "react-icons/fi";
import api from "../services/api";
import Modal from "../components/ModalLocadoras";
import Swal from "sweetalert2";

export interface Locadora {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
}

const Locadoras = () => {
  const [locadoras, setLocadoras] = useState<Locadora[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    cidade: "",
    estado: "",
  });
  const [locadoraEditando, setLocadoraEditando] = useState<Locadora | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const obterLocadoras = useCallback(async () => {
    try {
      const response = await api.get("/locadoras", { params: formData });
      setLocadoras(response.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao carregar locadoras!",
      });
    }
  }, [formData]);

  useEffect(() => {
    obterLocadoras();
  }, [obterLocadoras]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deletarLocadora = async (id: number) => {
    const resultado = await Swal.fire({
      icon: "warning",
      title: "Confirmar exclusão",
      text: "Tem certeza que deseja excluir esta locadora?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (!resultado.isConfirmed) return;

    try {
      await api.delete(`/locadoras/${id}`);
      await obterLocadoras();
      Swal.fire({
        icon: "success",
        title: "Locadora excluída",
        text: "A locadora foi excluída com sucesso.",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao excluir locadora!",
      });
    }
  };

  const limparFiltros = () => {
    setFormData({ nome: "", cidade: "", estado: "" });
  };

  return (
    <div className="locadoras-container">
      <h1 className="titulo-filtro">Locadoras</h1>

      <div className="filtros">
        <div className="filtro-inputs">
          <input
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <input
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
          <input
            name="estado"
            placeholder="Estado"
            value={formData.estado}
            onChange={handleChange}
          />
        </div>
        <div className="filtro-botoes">
          <button className="btn-filtrar" onClick={obterLocadoras}>
            Filtrar
          </button>
          <button
            className="btn-adicionar"
            onClick={() => {
              setLocadoraEditando(null);
              setModalOpen(true);
            }}
          >
            Adicionar
          </button>
          <button className="btn-limpar" onClick={limparFiltros}>
            Limpar
          </button>
        </div>
      </div>

      <div className="locadoras-tabela-container">
        <table className="locadoras-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {locadoras.map((locadora) => (
              <tr key={locadora.id}>
                <td>{locadora.nome}</td>
                <td>{locadora.cidade}</td>
                <td>{locadora.estado}</td>
                <td className="acoes">
                  <button
                    className="btn-acao"
                    title="Editar"
                    onClick={() => {
                      setLocadoraEditando(locadora);
                      setModalOpen(true);
                    }}
                  >
                    <FiEdit color="orange" />
                  </button>
                  <button
                    className="btn-acao"
                    title="Excluir"
                    onClick={() => deletarLocadora(locadora.id)}
                  >
                    <FiTrash color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          atualizarLista={obterLocadoras}
          locadora={locadoraEditando}
        />
      )}
    </div>
  );
};

export default Locadoras;
