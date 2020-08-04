const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');

const Doacao = sequelize.define('doacao', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    generoAlimenticio: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    higienePessoal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    artigoLimpeza: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    outros: {
        type: Sequelize.STRING,
        defaultValue: false
    },
    observacoes:{
        type: Sequelize.STRING, 
        allowNull: true
    },
    status:{
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    dispEntrega:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    createdBy:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    deliveredAt:{
        type: Sequelize.DATE,
        defaultValue: null
    },
    finishedAt:{
        type: Sequelize.DATE,
        defaultValue: null
    },
    removed:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        get() {
            return() => this.getDataValue('removed')
        }
    }
}, { sequelize, modelName: 'doacao', tableName: 'doacoes' });

Doacao.belongsTo(Usuario,{
    as: 'usuario',
    defaultValue: false
});

Doacao.belongsTo(Usuario,{
    as: 'parceiro',
    defaultValue: false
})

module.exports = Doacao;