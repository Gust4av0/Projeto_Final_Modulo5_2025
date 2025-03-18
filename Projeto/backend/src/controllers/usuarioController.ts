import { Request, Response } from "express";
import UsuarioModel from "../models/UsuarioModel";


//rota para pegar todos os usuários
export const obterUsuarios = async (req: Request, res: Response) => {
    const usuarios = await UsuarioModel.findAll();
    res.send(usuarios);
  }

//rota para pegar os usuário por ID
  export const obterUsuarioId = async (req: Request< {id: string}>, res: Response) => {
    const usuario = await UsuarioModel.findByPk(req.params.id)
    
    return res.json(usuario);
}

//rota para criar um usuário
export const criarUsuario = async (req: Request, res: Response) => {

    try {
        const { nome, email, senha, cpf } = req.body

        if(!nome || !email || !senha || !cpf){
            return res.status(400)
            .json({error: 'Propiedade não pode ser vazio'})
        }
    
        const usuario = await UsuarioModel.create( { nome, email, senha, cpf })
        res.status(201).json(usuario)
    } catch(error){
        res.status(500).json('Erro interno no servidor' + error);
    }
}

//rota para atualizar um usuário
export const atualizarUsuario = async (req: Request< {id: string}>, res: Response) => {

    try {
        const { nome, email, senha, cpf } = req.body

        if(!nome || nome === ''){
            return res.status(400)
            .json({error: 'Propiedade não pode ser vazio'})
        }
    
        const usuario = await UsuarioModel.findByPk(req.params.id)

        if(!usuario){
            return res.status(400)
            .json({error: 'Usuário não existe'})
        }

        usuario.nome = nome;
        usuario.email = email;
        usuario.senha = senha;
        usuario.cpf = cpf;

        await usuario.save()
        res.status(201).json(usuario)
    } catch(error){
        res.status(500).json('Erro interno no servidor' + error);
    }
}

//rota para deletar um usuário
export const deletarUsuarioId =  async (req: Request <{id: string}>, res: Response) => {
    try{ 
    const usuario = await UsuarioModel.findByPk(req.params.id);
        if(!usuario){
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        await usuario.destroy();
        res.status(204).send();
    } catch(error){
        res.status(500).json({ error: 'Erro interno no sevidor' + error});
    }
}