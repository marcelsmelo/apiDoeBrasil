const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');

const Acao = sequelize.define('acao', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    dataInicio: {
        type: Sequelize.DATE,
        allowNull: true
    }, 
    dataFim: {
        type: Sequelize.DATE,
        allowNull: true
    },
    ativo:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    removed:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        get() {
            return() => this.getDataValue('removed')
        }
    }
}, { sequelize, modelName: 'acao',  tableName: 'acoes' });

Acao.belongsTo(Usuario,{
        as:'parceiro',
        allowNull: false
});

module.exports = Acao;