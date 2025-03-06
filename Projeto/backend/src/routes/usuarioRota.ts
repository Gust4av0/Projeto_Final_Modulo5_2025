import { deflate } from "zlib";
import express from "express";
import { obterUsuarios, obterUsuarioId, criarUsuario, atualizarUsuario, deletarUsuarioId } from "../controllers/usuarioController";
import { authPlugins } from "mysql2";

const router = express.Router();

//obter todos usuários
router.get("/usuarios", obterUsuarios)

//obter usuário por id
router.get("/usuarios/:id", obterUsuarioId)

//criar usuário
router.post("/usuarios", criarUsuario)

//atualizar usuário
router.put("/usuarios/:id", atualizarUsuario)

//deletar usuário
router.delete("/usuarios/:id", deletarUsuarioId)


export default router;