const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');

const Solicitacao = sequelize.define('solicitacao', {
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
    statusEntrega:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },
    removida:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        get() {
            return() => this.getDataValue('removida')
        }
    }
}, { sequelize, modelName: 'solicitacao',  tableName: 'solicitacoes' });

Solicitacao.belongsTo(Usuario);


module.exports = Solicitacao;