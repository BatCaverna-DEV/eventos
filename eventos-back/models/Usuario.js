import banco from '../config/banco.js'

const Usuario = banco.sequelize.define('usuarios', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: banco.Sequelize.STRING(100),
        allowNull: false
    },
    password: {
        type: banco.Sequelize.STRING(250),
        allowNull: true
    },
    nome:{
        type: banco.Sequelize.STRING(100),
    },
    email:{
        type: banco.Sequelize.STRING(100),
    }
})

export default Usuario