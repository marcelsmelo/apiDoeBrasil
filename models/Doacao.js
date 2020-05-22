const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');
const Pedido = require('./Pedido');
const Parceiro = require('./Parceiro');
const PontoEntrega = require('./PontoEntrega');

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
    mascara: {
        type: Sequelize.BOOLEAN,
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
    answeredAt:{
        type: Sequelize.DATE,
        defaultValue: null
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

Doacao.belongsTo(Usuario);

Doacao.belongsTo(Pedido,{
    foreignKey:{
        allowNull: true
    }
});

Doacao.belongsTo(Parceiro,{
    foreignKey:{
        allowNull: true
    }
})

Doacao.belongsTo(PontoEntrega,{
    foreignKey:{
        allowNull: true
    }
})

module.exports = Doacao;