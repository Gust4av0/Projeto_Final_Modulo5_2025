import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import Swal from "sweetalert2";
import "../styles/MinhaConta.css";

interface MinhaContaProps {
  user: {
    nome: string;
    email?: string;
  };
  setUser: (user: { nome: string; email: string }) => void;
}

function MinhaConta({ user, setUser }: MinhaContaProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(true);
  const apiCallMade = useRef(false);

  useEffect(() => {
    setNome(user?.nome || "");
    setEmail(user?.email || "");

    const fetchData = async () => {
      if (user?.email) {
        setCarregando(false);
        return;
      }
      if (!apiCallMade.current) {
        apiCallMade.current = true;

        const userId = localStorage.getItem("usuario_id");
        if (userId) {
          setCarregando(true);
          try {
            const response = await api.get(`/usuarios/${userId}`);
            if (response.data) {
              setEmail(response.data.email || "");
              setNome(response.data.nome || user?.nome || "");
              setUser({
                nome: response.data.nome || user?.nome || "",
                email: response.data.email || "",
              });
            }
          } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
          } finally {
            setCarregando(false);
          }
        } else {
          setCarregando(false);
        }
      }
    };

    fetchData();
    return () => {
      apiCallMade.current = false;
    };
  }, [user, setUser]);

  const atualizarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("usuario_id");

      if (!userId) {
        Swal.fire("Erro", "ID do usuário não encontrado.", "error");
        return;
      }

      if (!nome.trim()) {
        Swal.fire("Erro", "Nome não pode estar vazio.", "error");
        return;
      }

      const data: Record<string, any> = { nome };

      if (novaSenha) {
        if (!senhaAtual) {
          Swal.fire("Erro", "Informe a senha atual para alterá-la.", "error");
          return;
        }

        if (novaSenha !== confirmarSenha) {
          Swal.fire("Erro", "As senhas não coincidem.", "error");
          return;
        }

        const senhaRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!senhaRegex.test(novaSenha)) {
          Swal.fire(
            "Erro",
            "A senha deve ter no mínimo 8 caracteres, 1 número, 1 letra maiúscula e 1 símbolo.",
            "error"
          );
          return;
        }

        data.senha_atual = senhaAtual;
        data.senha = novaSenha;
      }

      try {
        const response = await api.put(`/usuarios/${userId}`, data);

        if (response.status === 200) {
          setUser({ nome, email: email || "" });
          localStorage.setItem("nomeUsuario", nome);

          Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: "Perfil atualizado com sucesso!",
            confirmButtonColor: "#28a745",
          });

          setSenhaAtual("");
          setNovaSenha("");
          setConfirmarSenha("");
        }
      } catch (apiError: any) {
        console.error("Erro na API:", apiError);
        const mensagem =
          apiError.response?.data?.error ||
          "Não foi possível atualizar o perfil. Verifique os dados e tente novamente.";
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: mensagem,
          confirmButtonColor: "#dc3545",
        });
      }
    } catch (error: any) {
      console.error("Erro geral:", error);
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="minha-conta-container">
      <h1>Minha Conta</h1>

      <div className="form-container">
        {carregando ? (
          <div className="loading-container">
            <p>Carregando informações...</p>
          </div>
        ) : (
          <form onSubmit={atualizarPerfil}>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                className="email-field" // Classe adicional para estilizar o campo de email
              />
              <small className="email-note">
                O email não pode ser alterado
              </small>
            </div>

            <div className="form-section">
              <h2>Alterar Senha</h2>
              <div className="form-group">
                <label htmlFor="senhaAtual">Senha Atual</label>
                <input
                  type="password"
                  id="senhaAtual"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="novaSenha">Nova Senha</label>
                <input
                  type="password"
                  id="novaSenha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
                <input
                  type="password"
                  id="confirmarSenha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-salvar">
                Salvar Alterações
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default MinhaConta;
