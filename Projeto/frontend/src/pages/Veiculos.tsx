import { useState, useEffect, useCallback } from "react";
import "../styles/Veiculos.css";
import { FiTrash, FiEdit } from "react-icons/fi";
import api from "../services/api";

export interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  preco_por_dia: number;
  imagem: string;
  categoria: { id: number; nome: string } | null;
  locadora: { id: number; nome: string } | null;
}

const Veiculos = () => {
  const [filtros, setFiltros] = useState({
    id: null,
    marca: "",
    modelo: "",
    ano: "",
    placa: "",
    preco_por_dia: "",
    imagem: "",
    categoria: "",
    locadora: "",
  });
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);
  const [locadoras, setLocadoras] = useState<{ id: number; nome: string }[]>([]);

  const obterCategoriasELocadoras = useCallback(async () => {
    try {
      const [categoriasResponse, locadorasResponse] = await Promise.all([
        api.get("/categorias"),
        api.get("/locadoras"),
      ]);
      setCategorias(categoriasResponse.data);
      setLocadoras(locadorasResponse.data);
    } catch {
      alert("Erro ao carregar categorias e locadoras!");
    }
  }, []);

  const obterVeiculos = useCallback(async () => {
    try {
      const response = await api.get("/veiculos");
      setVeiculos(response.data);
    } catch {
      alert("Erro ao carregar veículos!");
    }
  }, []);

  useEffect(() => {
    obterVeiculos();
    obterCategoriasELocadoras();
  }, [obterVeiculos, obterCategoriasELocadoras]);

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limparFiltros = () => {
    setFiltros({
      id: null,
      marca: "",
      modelo: "",
      ano: "",
      placa: "",
      preco_por_dia: "",
      imagem: "",
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

  const salvarVeiculo = async () => {
    try {
      const veiculoData = {
        marca: filtros.marca,
        modelo: filtros.modelo,
        ano: Number(filtros.ano),
        placa: filtros.placa,
        preco_por_dia: Number(filtros.preco_por_dia),
        imagem: filtros.imagem,
        categoria_id: filtros.categoria ? Number(filtros.categoria) : null,
        locadora_id: filtros.locadora ? Number(filtros.locadora) : null,
      };

      if (filtros.id) {
        await api.put(`/veiculos/${filtros.id}`, veiculoData);
        alert("Veículo atualizado com sucesso!");
      } else {
        await api.post("/veiculos", veiculoData);
        alert("Veículo cadastrado com sucesso!");
      }
      obterVeiculos();
      limparFiltros();
    } catch (error) {
      alert("Erro ao salvar veículo!");
    }
  };

  const editarVeiculo = (veiculo: Veiculo) => {
    setFiltros({
      id: veiculo.id,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: String(veiculo.ano),
      placa: veiculo.placa,
      preco_por_dia: String(veiculo.preco_por_dia),
      imagem: veiculo.imagem,
      categoria: veiculo.categoria ? String(veiculo.categoria.id) : "",
      locadora: veiculo.locadora ? String(veiculo.locadora.id) : "",
    });
  };

  return (
    <div className="veiculos-container">
      <h1 className="titulo-filtro">Veículos</h1>

      <div className="filtros">
        <div className="filtro-inputs">
          <input name="marca" placeholder="Marca" value={filtros.marca} onChange={handleFiltroChange} />
          <input name="modelo" placeholder="Modelo" value={filtros.modelo} onChange={handleFiltroChange} />
          <input name="ano" placeholder="Ano" value={filtros.ano} onChange={handleFiltroChange} />
          <input name="placa" placeholder="Placa" value={filtros.placa} onChange={handleFiltroChange} />
          <input name="preco_por_dia" placeholder="Diária" value={filtros.preco_por_dia} onChange={handleFiltroChange} />
          <input name="imagem" placeholder="URL da Imagem" value={filtros.imagem} onChange={handleFiltroChange} />
          <select name="categoria" value={filtros.categoria} onChange={handleFiltroChange}>
            <option value="">Selecione a Categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>
          <select name="locadora" value={filtros.locadora} onChange={handleFiltroChange}>
            <option value="">Selecione a Locadora</option>
            {locadoras.map((locadora) => (
              <option key={locadora.id} value={locadora.id}>{locadora.nome}</option>
            ))}
          </select>
          <button className="btn-adicionar" onClick={salvarVeiculo}>Adicionar</button>
          <button className="btn-limpar" onClick={limparFiltros}>Limpar</button>
        </div>
      </div>

      <table className="veiculos-tabela">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Placa</th>
            <th>Preço por Dia</th>
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
              <td>R$ {veiculo.preco_por_dia.toFixed(2)}</td>
              <td>{veiculo.categoria?.nome || "Sem categoria"}</td>
              <td>{veiculo.locadora?.nome || "Sem locadora"}</td>
              <td>
                <button onClick={() => editarVeiculo(veiculo)}><FiEdit /></button>
                <button onClick={() => deletarVeiculo(veiculo.id)}><FiTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Veiculos;
