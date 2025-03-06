import { allowedNodeEnvironmentFlags } from "process";
import express from 'express';
import { obterCategorias, obterCategoriaId , criarCategoria, atualizarCategoria, deletarCategoriaId} from "../controllers/categoriaController";

const router = express.Router();

//obter todas as categorias
router.get("/categorias", obterCategorias);

//obter categoria por ID
router.get("/categorias/:id", obterCategoriaId);

//criar uma categoria
router.post("/categorias", criarCategoria);

//atualizar uma categorai
router.put("/categorias/:id", atualizarCategoria);

//deletar uma categoria
router.delete("/categorias/:id", deletarCategoriaId);


export default router;