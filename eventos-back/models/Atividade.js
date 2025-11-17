import banco from "../config/banco.js";
import Sequelize from "sequelize";

const Atividade = banco.sequelize.define("atividades", {

    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    descricao: {
        type: Sequelize.STRING(100),
    },

    inicio: {
        type: Sequelize.DATE,
    },

    final: {
        type: Sequelize.DATE,
    },

    imagem:{
        type: Sequelize.TEXT('long'),
    }

})

export default Atividade;