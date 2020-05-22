const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');
const Parceiro = require('./Parceiro');

//TOOD: Remover atendidoPorGroup e adicionar vínculo direto com Parceiro
const Pedido = sequelize.define('pedido', {
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
    answeredAt:{
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
}, { sequelize, modelName: 'pedido',  tableName: 'pedidos' });

Pedido.belongsTo(Usuario);

Pedido.belongsTo(Usuario, {
    as:'atendidoPorUsuario',
    // foreignKey: 'atendidoPorUsuario',
    defaultValue: null
});

Pedido.belongsTo(Parceiro,{
    as: 'atendidoPorParceiro',
    // foreignKey: 'atendidoPorParceiro',
    defaultValue: null
})


module.exports = Pedido;