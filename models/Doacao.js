const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');
const Solicitacao = require('./Solicitacao');

const Doacao = sequelize.define('doacao', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    cestaBasica: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    alcoolGel: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    mascara: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    outrosItens:{
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    observacoes:{
        type: Sequelize.STRING, 
        allowNull: true
    },
    dispEntrega:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    dataEntrega:{
        type: Sequelize.DATE,
        defaultValue: false
    },
    statusEntrega:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },
    motivo:{
        type: Sequelize.STRING, 
        allowNull: true
    },
    removida:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        get() {
            return() => this.getDataValue('removida')
        }
    }
}, { sequelize, modelName: 'doacao', tableName: 'doacoes' });

Doacao.belongsTo(Usuario);
Doacao.hasOne(Solicitacao);

module.exports = Doacao;