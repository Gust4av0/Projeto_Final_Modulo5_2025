import express from 'express';
import { obterLocadoras, obterLocadorasId, criarLocadora, atualizarLocadora, deletarLocadoraId } from "../controllers/locadoraController";

const router = express.Router();

//rota para pegar todas as locadoras
router.get("/locadoras", obterLocadoras)

//rota para pegar locadora por id
router.get("/locadoras/:id", obterLocadorasId)

//rota para criar uma locadora
router.post("/locadoras", criarLocadora)

//rota para atualizar locadora
router.put("/locadoras/:id", atualizarLocadora)

//rota para deletar uma locadora
router.delete("/locadoras/:id", deletarLocadoraId);

export default router;