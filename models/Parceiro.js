const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const Usuario = require('./Usuario');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Parceiro = sequelize.define('parceiro', {
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
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return () => this.getDataValue('senha')
        }
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return() => this.getDataValue('salt')
        }
    },
    token:{
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            return() => this.getDataValue('token')
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
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: false
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
}, { sequelize, modelName: 'parceiro' });

Parceiro.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
}

Parceiro.encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
}

const setSaltAndPassword = parceiro => {
    if (parceiro.changed('senha')) {
        parceiro.salt = Parceiro.generateSalt()
        parceiro.senha = Parceiro.encryptPassword(parceiro.senha(), parceiro.salt())
    }
}

Parceiro.prototype.comparePassword = function(enteredPassword) {
    return Parceiro.encryptPassword(enteredPassword, this.salt()) === this.senha()
}


Parceiro.prototype.generateAuthToken = function() {
    return new Promise((success, reject) => {
      // Generate an auth token for the user
      const parceiro = this
      const data = {usuarioId: null, parceiroId: parceiro.id, login: 'P'}
      
      //Cria o token
      const token = jwt.sign(
        data, //Dado que será salvo no token 
        'supersegredo') //Palavra chave secreta para criptografia
//        {expiresIn: '7d'}) //Tempo de duração do Token

      parceiro.token = token

      //Salvar o Token no documento do usuário
      parceiro.save()
      .then(() =>{
          //Retornar uma Promises de sucesso
          success({
            token: token
          });
      })
      .catch(err => {
        //Retornar uma Promises de erro
          reject({
            msg: "Erro ao gerar token JWT!",
            'error': err.errmsg
          });
      })
    });
  };

Parceiro.beforeCreate(setSaltAndPassword)
Parceiro.beforeUpdate(setSaltAndPassword)

module.exports = Parceiro;