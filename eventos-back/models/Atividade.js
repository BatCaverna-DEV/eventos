import banco from "../config/banco.js";
import Sequelize from "sequelize";

const Atividade = banco.sequelize.define("atividades", {

    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    descricao: {
        type: banco.Sequelize.STRING(100),
    },

    inicio: {
        type: banco.Sequelize.DATE,
    },

    final: {
        type: banco.Sequelize.DATE,
    },

    imagem:{
        type: banco.Sequelize.TEXT('long'),
    },
    status:{
        type: banco.Sequelize.INTEGER
    }

})

export default Atividade;