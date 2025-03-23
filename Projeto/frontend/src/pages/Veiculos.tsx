// src/pages/Veiculos.tsx
import { useState, useEffect, useCallback } from "react";
import "../styles/Veiculos.css";
import { FiTrash, FiEdit } from "react-icons/fi";
import api from "../services/api";
import ModalVeiculo from "../components/ModalVeiculos";

export interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
  precoDiaria: string;
  categoria: string;
  locadora: string;
}

const Veiculos = () => {
  const [filtros, setFiltros] = useState({
    marca: "",
    modelo: "",
    ano: "",
    placa: "",
    categoria: "",
    locadora: "",
  });
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [veiculoEditando, setVeiculoEditando] = useState<Veiculo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const obterVeiculos = useCallback(async () => {
    try {
      const response = await api.get("/veiculos", { params: filtros });
      setVeiculos(response.data);
    } catch {
      alert("Erro ao carregar veículos!");
    }
  }, [filtros]);

  useEffect(() => {
    obterVeiculos();
  }, [obterVeiculos]);

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limparFiltros = () => {
    setFiltros({
      marca: "",
      modelo: "",
      ano: "",
      placa: "",
      categoria: "",
      locadora: "",
    });
  };

  const deletarVeiculo = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este veículo?")) return;
    try {
      await api.delete(`/veiculos/${id}`);
      alert("Veículo excluído com sucesso!");
      obterVeiculos();
    } catch {
      alert("Erro ao excluir veículo!");
    }
  };

  return (
    <div className="veiculos-container">
      <h1 className="titulo-filtro">Veículos</h1>

      <div className="filtros">
        <div className="filtro-inputs">
          <input
            name="marca"
            placeholder="Marca"
            value={filtros.marca}
            onChange={handleFiltroChange}
          />
          <input
            name="modelo"
            placeholder="Modelo"
            value={filtros.modelo}
            onChange={handleFiltroChange}
          />
          <input
            name="ano"
            placeholder="Ano"
            value={filtros.ano}
            onChange={handleFiltroChange}
          />
          <input
            name="placa"
            placeholder="Placa"
            value={filtros.placa}
            onChange={handleFiltroChange}
          />
          <input
            name="categoria"
            placeholder="Categoria"
            value={filtros.categoria}
            onChange={handleFiltroChange}
          />
          <input
            name="locadora"
            placeholder="Locadora"
            value={filtros.locadora}
            onChange={handleFiltroChange}
          />
        </div>
        <div className="filtro-botoes">
          <button className="btn-filtrar" onClick={obterVeiculos}>
            Filtrar
          </button>
          <button
            className="btn-adicionar"
            onClick={() => {
              setVeiculoEditando(null);
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

      <div className="veiculos-tabela-container">
        <table className="veiculos-tabela">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Placa</th>
              <th>Preço Diária</th>
              <th>Categoria</th>
              <th>Locadora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo) => (
              <tr key={veiculo.id}>
                <td>{veiculo.marca}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.ano}</td>
                <td>{veiculo.placa}</td>
                <td>{veiculo.precoDiaria}</td>
                <td>{veiculo.categoria}</td>
                <td>{veiculo.locadora}</td>
                <td className="acoes">
                  <button
                    className="btn-acao"
                    title="Editar"
                    onClick={() => {
                      setVeiculoEditando(veiculo);
                      setModalOpen(true);
                    }}
                  >
                    <FiEdit color="orange" />
                  </button>
                  <button
                    className="btn-acao"
                    title="Excluir"
                    onClick={() => deletarVeiculo(veiculo.id)}
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
        <ModalVeiculo
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          atualizarLista={obterVeiculos}
          veiculo={veiculoEditando}
        />
      )}
    </div>
  );
};

export default Veiculos;
