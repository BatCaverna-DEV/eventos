import banco from "../config/banco.js";
import Atividade from "../models/Atividade.js";

const Presenca = banco.sequelize.define("presencas", {

    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nome:{
        type: banco.Sequelize.STRING(100),
    },

    email:{
        type: banco.Sequelize.STRING(100),
    },

    matricula:{
        type: banco.Sequelize.STRING(100),
    },

    curso:{
        type: banco.Sequelize.STRING(100),
    },

    turma:{
        type: banco.Sequelize.STRING(100),
    }

})

Presenca.belongsTo(Atividade, {
    foreignKey: 'atividade_id',
    constraint: true,
    onDelete: 'CASCADE',
    as: 'atividade',
})

export default Presenca;