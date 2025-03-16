import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/home";
import Usuarios from "./pages/Usuarios";
import Locadoras from "./pages/Locadoras";
import Veiculos from "./pages/Veiculos";
import Categorias from "./pages/Categorias";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

type UserType = {
  nome: string;
  email: string;
};

function App() {
  const [user, setUser] = useState<UserType | null>(null); // Inicia como null para ir direto ao Login
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <BrowserRouter>
      {user ? (
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
            user={user}
          />
          <main style={{ flex: 1, padding: "10px", margin: 0 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home user={user} />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/locadoras" element={<Locadoras />} />
              <Route path="/veiculos" element={<Veiculos />} />
              <Route path="/categorias" element={<Categorias />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />{" "}
          {/* Adicionada a rota correta */}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
