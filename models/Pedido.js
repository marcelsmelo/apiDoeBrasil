const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');

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
    atendidoPorGroup:{
        type: Sequelize.STRING, 
        allowNull: true
    },
    removido:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        get() {
            return() => this.getDataValue('removida')
        }
    }
}, { sequelize, modelName: 'pedido',  tableName: 'pedidos' });

Pedido.belongsTo(Usuario);

Pedido.belongsTo(Usuario, {
    foreignKey: 'atendidoPor'
});


module.exports = Pedido;