import { deflate } from "zlib";
import express from "express";
import { obterUsuarios, obterUsuarioId, criarUsuario, atualizarUsuario, deletarUsuarioId } from "../controllers/usuarioController";
import { authPlugins } from "mysql2";
import { authMiddeleware } from '../middleware/authMiddleware'

const router = express.Router();



//rota pública 
router.post("/usuarios", criarUsuario)

//rotas privadas 
router.get("/usuarios", obterUsuarios)
router.get("/usuarios/:id", authMiddeleware, obterUsuarioId)
router.put("/usuarios/:id", atualizarUsuario)
router.delete("/usuarios/:id", deletarUsuarioId)


export default router;