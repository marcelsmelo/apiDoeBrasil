const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');
const Pedido = require('./Pedido');

const Doacao = sequelize.define('doacao', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    generoAlimenticio: {
        type: Sequelize.BOOLEAN
    },
    higienePessoal: {
        type: Sequelize.BOOLEAN
    },
    artigoLimpeza: {
        type: Sequelize.BOOLEAN
    },
    mascara: {
        type: Sequelize.BOOLEAN
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
    removida:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        get() {
            return() => this.getDataValue('removida')
        }
    }
}, { sequelize, modelName: 'doacao', tableName: 'doacoes' });

Doacao.belongsTo(Usuario);
Doacao.belongsTo(Pedido);

module.exports = Doacao;