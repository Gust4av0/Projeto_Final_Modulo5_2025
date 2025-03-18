import { useState } from "react";
import "../styles/Veiculos.css";
import { FiTrash, FiEdit, FiTag } from "react-icons/fi";

interface Veiculo {
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
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroModelo, setFiltroModelo] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [filtroPlaca, setFiltroPlaca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroLocadora, setFiltroLocadora] = useState("");

  const veiculos: Veiculo[] = [
    {
      id: 1,
      marca: "Toyota",
      modelo: "Corolla",
      ano: "2022",
      placa: "ABC-1234",
      precoDiaria: "R$ 150,00",
      categoria: "Sedan",
      locadora: "Campo Mourão"
    }
  ];

  return (
    <div className="veiculos-container">
      {/* TÍTULO NO CANTO SUPERIOR ESQUERDO */}
      <h1 className="titulo-filtro">Veículos</h1>

      {/* FILTRO COM ESPAÇAMENTO AJUSTADO */}
      <div className="filtros">
        <div className="filtro-inputs">
          <input
            type="text"
            placeholder="Marca"
            value={filtroMarca}
            onChange={(e) => setFiltroMarca(e.target.value)}
          />
          <input
            type="text"
            placeholder="Modelo"
            value={filtroModelo}
            onChange={(e) => setFiltroModelo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ano"
            value={filtroAno}
            onChange={(e) => setFiltroAno(e.target.value)}
          />
          <input
            type="text"
            placeholder="Placa"
            value={filtroPlaca}
            onChange={(e) => setFiltroPlaca(e.target.value)}
          />
          <input
            type="text"
            placeholder="Categoria"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          />
          <input
            type="text"
            placeholder="Locadora"
            value={filtroLocadora}
            onChange={(e) => setFiltroLocadora(e.target.value)}
          />
        </div>
        <div className="filtro-botoes">
          <button className="btn-filtrar">Adicionar</button>
          <button className="btn-limpar">Limpar</button>
        </div>
      </div>

      {/* TABELA COM O MESMO DESIGN DO FILTRO */}
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
                  <button className="btn-acao" title="Editar Informações">
                    <FiEdit color="orange" />
                  </button>
                  <button className="btn-acao" title="Excluir">
                    <FiTrash color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Veiculos;
