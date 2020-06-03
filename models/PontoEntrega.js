const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Parceiro = require('./Parceiro');

const PontoEntrega = sequelize.define('pontoEntrega', {
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
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len:{
                args: [8,18],
                msg: "Telefone não deve conter tamanho maior que 17!"
            }
        }
    },
    rua: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: true
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len:{
                args: 2,
                msg: "Deve ser informado somente a sigla do estado. (GO) "
            }
        }
    }, 
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    removed:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        get() {
            return() => this.getDataValue('removed')
        }
    }
}, { sequelize, modelName: 'pontos_entrega' });

PontoEntrega.belongsTo(Parceiro,{
    foreignKey: {
        allowNull: false
    }
});

module.exports = PontoEntrega;