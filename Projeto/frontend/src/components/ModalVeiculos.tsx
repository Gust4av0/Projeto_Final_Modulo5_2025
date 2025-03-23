// src/components/ModalVeiculo.tsx
import "../styles/Modal.css";
import { useState, useEffect } from "react";
import { Veiculo } from "../pages/Veiculos";
import api from "../services/api";

interface ModalVeiculoProps {
  isOpen: boolean;
  onClose: () => void;
  atualizarLista: () => Promise<void>;
  veiculo: Veiculo | null;
}

const ModalVeiculo = ({
  isOpen,
  onClose,
  atualizarLista,
  veiculo,
}: ModalVeiculoProps) => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [placa, setPlaca] = useState("");
  const [precoDiaria, setPrecoDiaria] = useState("");
  const [categoria, setCategoria] = useState("");
  const [locadora, setLocadora] = useState("");

  useEffect(() => {
    if (veiculo) {
      setMarca(veiculo.marca);
      setModelo(veiculo.modelo);
      setAno(veiculo.ano);
      setPlaca(veiculo.placa);
      setPrecoDiaria(veiculo.precoDiaria);
      setCategoria(veiculo.categoria);
      setLocadora(veiculo.locadora);
    } else {
      setMarca("");
      setModelo("");
      setAno("");
      setPlaca("");
      setPrecoDiaria("");
      setCategoria("");
      setLocadora("");
    }
  }, [veiculo]);

  const handleSalvar = async () => {
    try {
      const payload = {
        marca,
        modelo,
        ano,
        placa,
        precoDiaria,
        categoria,
        locadora,
      };

      if (veiculo) {
        await api.put(`/veiculos/${veiculo.id}`, payload);
        alert("Veículo atualizado com sucesso!");
      } else {
        await api.post("/veiculos", payload);
        alert("Veículo cadastrado com sucesso!");
      }

      atualizarLista();
      onClose();
    } catch {
      alert("Erro ao salvar veículo!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{veiculo ? "Editar Veículo" : "Adicionar Veículo"}</h2>

        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
        <input
          type="text"
          placeholder="Placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />
        <input
          type="text"
          placeholder="Preço Diária"
          value={precoDiaria}
          onChange={(e) => setPrecoDiaria(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <input
          type="text"
          placeholder="Locadora"
          value={locadora}
          onChange={(e) => setLocadora(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn-confirm" onClick={handleSalvar}>
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

export default ModalVeiculo;
