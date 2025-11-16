import Presenca from "../models/Presenca.js";
import Atividade from "../models/Atividade.js";

export default {

    salvar: async (req, res) =>{

        const presenca = req.body

        const existe = await Presenca.findOne({
            where: {
                matricula: presenca.matricula,
                atividade_id: presenca.atividade_id,
            }
        })

        if(existe){
            return res.status(500).json({message: 'Presença para "'+existe.nome+'" ja registrada!'})
        }

        Presenca.create(presenca).then((presenca)=>{
            res.status(200).json(presenca)
        }).catch(err=>{
            res.status(500).json(err)
        })

    },

    atividades: async (req, res) =>{

        const atividades = await Atividade.findAll()
        return res.status(200).json(atividades)

    },

    atividade: async (req, res)=>{

        const atividade = await Atividade.findByPk(req.params.id)
        return res.status(200).json(atividade)

    }


}; //Fim do Controller