import { useState, useEffect } from "react";
import "../styles/Usuarios.css";
import { FiTrash, FiEdit, FiLock } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import api from "../services/api";

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  // Carregar usuários do banco ao iniciar
  useEffect(() => {
    obterUsuarios();
  }, []);

  const obterUsuarios = async () => {
    try {
      const response = await api.get("/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      alert("Erro ao carregar usuários!");
    }
  };

  // Função para lidar com mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para cadastrar usuário
  const cadastrarUsuario = async () => {
    if (formData.senha !== formData.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await api.post("/usuarios", {
        nome: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        senha: formData.senha,
      });

      alert("Usuário cadastrado com sucesso!");
      setFormData({ nome: "", cpf: "", email: "", senha: "", confirmaSenha: "" });
      obterUsuarios(); // Atualiza a lista de usuários após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário!");
    }
  };

  //Função para deletar os usuários
  const deletarUsuario = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) {
      return;
    }
  
    try {
      await api.delete(`/usuarios/${id}`);
      alert("Usuário excluído com sucesso!");
      obterUsuarios(); // Atualiza a lista após a exclusão
    } catch (error) {
      alert("Erro ao excluir usuário!");
    }
  };

  //Função para chamar os dados dentro do input
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const editarUsuario = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nome: usuario.nome,
      cpf: usuario.cpf,
      email: usuario.email,
      senha: "",
      confirmaSenha: "",
    });
  };

  //Função para atualizar um usuário
  const atualizarUsuario = async () => {
    if (!usuarioEditando) return;
  
    if (formData.senha !== formData.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }
  
    try {
      await api.put(`/usuarios/${usuarioEditando.id}`, {
        nome: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        senha: formData.senha,
      });
  
      alert("Usuário atualizado com sucesso!");
      setUsuarioEditando(null); // Sai do modo de edição
      setFormData({ nome: "", cpf: "", email: "", senha: "", confirmaSenha: "",});
      obterUsuarios(); // Atualiza a lista de usuários
    } catch (error) {
      alert("Erro ao atualizar usuário!");
    }
  };
  
  
  return (
    <div className="usuarios-container">
      <h1 className="titulo-filtro">Usuários</h1>

      {/* FILTRO COM FORMULÁRIO */}
      <div className="filtros">
        <div className="filtro-inputs">
          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
          <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} />
          <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
          <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} />
          <input type="password" name="confirmaSenha" placeholder="Confirmar Senha" value={formData.confirmaSenha} onChange={handleChange} />
        </div>
        <div className="filtro-botoes">
          <button className="btn-filtrar " onClick={usuarioEditando ? atualizarUsuario: cadastrarUsuario}>Adicionar</button>
          <button className="btn-limpar" onClick={() => setFormData({ nome: "", cpf: "", email: "", senha: "", confirmaSenha: "" })}>Limpar</button>
        </div>
      </div>

      {/* TABELA COM OS USUÁRIOS */}
      <div className="usuarios-tabela-container">
        <table className="usuarios-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.email}</td>
                <td className="acoes">
                <button className="btn-acao" title="Editar informações" onClick={() => editarUsuario(usuario)}>
                <FiEdit color="orange" />
                </button>
                  <button className="btn-acao" title="Excluir usuário" onClick={() => deletarUsuario(usuario.id)}><FiTrash color="red" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
