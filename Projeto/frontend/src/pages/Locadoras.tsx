import { useState, useEffect } from "react";
import "../styles/Locadoras.css";
import { FiTrash, FiEdit, FiMapPin } from "react-icons/fi";
import api from "../services/api";

interface Locadora {
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

  // Carregar usuários do banco ao iniciar
  useEffect(() => {
    obterLocadoras();
  }, []);

  //função para obter as locadoras
  const obterLocadoras = async () => {
    try {
      const response = await api.get("/locadoras");
      setLocadoras(response.data);
    } catch (error) {
      console.error("Erro ao buscar locadoras:", error);
      alert("Erro ao carregar locadoras!");
    }
  };

  // Função para lidar com mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para cadastrar locadoras
  const cadastrarLocadora = async () => {
    try {
      await api.post("/locadoras", {
        nome: formData.nome,
        cidade: formData.cidade,
        estado: formData.estado,
      });

      alert("Locadora cadastrada com sucesso!");
      setFormData({ nome: "", cidade: "", estado: "",});
      obterLocadoras(); // Atualiza a lista de usuários após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar Locadora:", error);
      alert("Erro ao cadastrar locadora!");
    }
  };

  //Função para deletar os locadora
  const deletarLocadora = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta locadora?")) {
      return;
    }
  
    try {
      await api.delete(`/locadoras/${id}`);
      alert("Locadora excluída com sucesso!");
      obterLocadoras(); // Atualiza a lista após a exclusão
    } catch (error) {
      alert("Erro ao excluir locadora!");
    }
  };
  
  //Função para chamar os dados dentro do input
  const [locadoraEditando, setLocadoraEditando] = useState<Locadora | null>(null);
  const editarLocadora = (locadora: Locadora) => {
    setLocadoraEditando(locadora);
    setFormData({
      nome: locadora.nome,
      cidade: locadora.cidade,
      estado: locadora.estado,
    });
  };

  //Função para atualizar uma locadora
  const atualizarLocadora = async () => {
    if (!locadoraEditando) return;
  
    try {
      await api.put(`/locadoras/${locadoraEditando.id}`, {
        nome: formData.nome,
        cidade: formData.cidade,
        estado: formData.estado,
      });
  
      alert("Locadora atualizada com sucesso!");
      setLocadoraEditando(null); // Sai do modo de edição
      setFormData({ nome: "", cidade: "", estado: "",});
      obterLocadoras(); // Atualiza a lista de usuários
    } catch (error) {
      alert("Erro ao atualizar locadora!");
    }
  };

  return (
    <div className="locadoras-container">
      {/* TÍTULO NO CANTO SUPERIOR ESQUERDO */}
      <h1 className="titulo-filtro">Locadoras</h1>

      {/* FILTRO COM ESPAÇAMENTO AJUSTADO */}
      <div className="filtros">
        <div className="filtro-inputs">
        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
        <input type="text" name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} />
        <input type="text" name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} />
        </div>
        <div className="filtro-botoes">
          <button className="btn-filtrar" onClick={locadoraEditando ? atualizarLocadora: cadastrarLocadora}>Adicionar</button>
          <button className="btn-limpar" onClick={() => setFormData({ nome: "", cidade: "", estado: "",})}>Limpar</button>
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
                <button className="btn-acao" title="Editar informações" onClick={() => editarLocadora(locadora)}><FiEdit color="orange" /></button>
                <button className="btn-acao" title="Excluir Locadora" onClick={() => deletarLocadora(locadora.id)}><FiTrash color="red" /></button>
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
