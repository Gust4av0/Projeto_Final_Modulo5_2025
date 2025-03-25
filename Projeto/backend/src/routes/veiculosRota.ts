import express from 'express';
import { obterVeiculos, obterVeiculoPorId, criarVeiculo, atualizarVeiculo, deletarVeiculo } from "../controllers/veiculosController";

const router = express.Router();

//rota para pegar todos os veículos
router.get("/veiculos", obterVeiculos)

//rota para pegar veículo por ID
router.get("/veiculos/:id", obterVeiculoPorId)

//rota para criar um veículo
router.post("/veiculos", criarVeiculo);

//rota para atualizar um veiculo
router.put("/veiculos/:id", atualizarVeiculo);

//rota para deletar veículo
router.delete("/veiculos/:id", deletarVeiculo)


export default router