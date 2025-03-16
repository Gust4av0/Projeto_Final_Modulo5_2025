import { useState } from "react";
import "../styles/Categorias.css";
import { FiTrash, FiEdit } from "react-icons/fi";

interface Categoria {
  id: number;
  nome: string;
}

const Categorias = () => {
  const [filtroNome, setFiltroNome] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([
    { id: 1, nome: "Sedan" },
    { id: 2, nome: "SUV" },
    { id: 3, nome: "Hatch" },
    { id: 4, nome: "Caminhonete" },
    { id: 5, nome: "Conversível" },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  // Função para adicionar uma nova categoria
  const adicionarCategoria = () => {
    if (!novaCategoria.trim()) return;

    const novaLista = [
      ...categorias,
      { id: categorias.length + 1, nome: novaCategoria.trim() },
    ];
    setCategorias(novaLista);
    setNovaCategoria("");
    setModalAberto(false);
  };

  return (
    <div className="categorias-container">
      {/* TÍTULO NO CANTO SUPERIOR ESQUERDO */}
      <h1 className="titulo-filtro">Gerenciar Categorias</h1>

      {/* FILTRO COM BOTÕES */}
      <div className="filtros">
        <div className="filtro-inputs">
          <input
            type="text"
            placeholder="Pesquisar Categoria"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
        </div>
        <div className="filtro-botoes">
          <button className="btn-filtrar">Filtrar</button>
          <button className="btn-limpar">Limpar</button>
          <button
            className="btn-adicionar"
            onClick={() => setModalAberto(true)}
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* TABELA DE CATEGORIAS */}
      <div className="categorias-tabela-container">
        <table className="categorias-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.nome}</td>
                <td className="acoes">
                  <button className="btn-acao" title="Editar Informações">
                    <FiEdit color="orange" />
                  </button>
                  <button className="btn-acao" title="Excluir">
                    <FiTrash color="gray" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL PARA ADICIONAR CATEGORIA */}
      {modalAberto && (
        <div className="modal">
          <div className="modal-conteudo">
            <h2>Adicionar Categoria</h2>
            <input
              type="text"
              placeholder="Nome da Categoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
            />
            <div className="modal-botoes">
              <button onClick={adicionarCategoria}>Salvar</button>
              <button onClick={() => setModalAberto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
