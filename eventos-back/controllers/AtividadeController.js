import Atividade from "../models/Atividade.js";

class AtividadeController{

    index = async (req, res) => {
        const atividades = await Atividade.findAll()
        res.status(200).json(atividades)
    }

    abrir = async (req, res) => {
        const id = req.params.id

        const atividade = await Atividade.findByPk(id)

        await atividade.update({status: 1})

        return res.status(200).json({message: 'Atividade aberta com sucesso!'})
    }

    fechar = async (req, res) => {
        const id = req.params.id

        const atividade = await Atividade.findByPk(id)

        await atividade.update({status: 2})

        return res.status(200).json({message: 'Atividade fechada com sucesso!'})
    }

}

export default new AtividadeController()