import { useState, useEffect } from "react";
import "../styles/Categorias.css";
import { FiTrash, FiEdit } from "react-icons/fi";
import api from "../services/api";

interface Categoria {
  id: number;
  nome: string;
}

const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
  });

    // Função para lidar com mudanças nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Carregar usuários do banco ao iniciar
      useEffect(() => {
        obterCategorias();
      }, []);

  //função para obter as locadoras
  const obterCategorias = async () => {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar Categorias:", error);
      alert("Erro ao carregar categorias!");
    }
  };

    // Função para cadastrar categorias
    const cadastrarCategoria = async () => {
      try {
        await api.post("/categorias", {
          nome: formData.nome,
        });
  
        alert("Categoria cadastrada com sucesso!");
        setFormData({ nome: "",});
        obterCategorias(); // Atualiza a lista de usuários após o cadastro
      } catch (error) {
        console.error("Erro ao cadastrar Categoria:", error);
        alert("Erro ao cadastrar categoria!");
      }
    };

    //Função para deletar os categorias
  const deletarCategorias = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      return;
    }
  
    try {
      await api.delete(`/categorias/${id}`);
      alert("Categorias excluída com sucesso!");
      obterCategorias(); // Atualiza a lista após a exclusão
    } catch (error) {
      alert("Erro ao excluir categoria!");
    }
  };

  //Função para chamar os dados dentro do input
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const editarCategoria = (categoria: Categoria) => {
    setCategoriaEditando(categoria);
    setFormData({
      nome: categoria.nome
    });
  };

  //Função para atualizar uma locadora
  const atualizarCategoria = async () => {
    if (!categoriaEditando) return;
  
    try {
      await api.put(`/categorias/${categoriaEditando.id}`, {
        nome: formData.nome,
      });
  
      alert("Categoria atualizada com sucesso!");
      setCategoriaEditando(null); // Sai do modo de edição
      setFormData({ nome: "",});
      obterCategorias(); // Atualiza a lista de usuários
    } catch (error) {
      alert("Erro ao atualizar categoria!");
    }
  };

  return (
    <div className="categorias-container">
      {/* TÍTULO NO CANTO SUPERIOR ESQUERDO */}
      <h1 className="titulo-filtro">Categorias</h1>

      {/* FILTRO COM BOTÕES */}
      <div className="filtros">
        <div className="filtro-inputs">
        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
        </div>
        <div className="filtro-botoes">
          <button className="btn-adicionar" onClick={categoriaEditando ? atualizarCategoria: cadastrarCategoria}>Adicionar</button>
          <button className="btn-limpar" onClick={() => setFormData({nome: ""})}>Limpar</button>
        </div>
      </div>

      {/* TABELA DE CATEGORIAS */}
      <div className="categorias-tabela-container">
        <table className="categorias-tabela">
          <thead>
            <tr>
              <th>Nome da Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.nome}</td>
                <td className="acoes">
                  <button className="btn-acao" title="Editar Informações" onClick={() => editarCategoria(categoria)}>
                    <FiEdit color="orange" />
                  </button>
                  <button className="btn-acao" title="Excluir" onClick={() => deletarCategorias(categoria.id)}>
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

export default Categorias;
