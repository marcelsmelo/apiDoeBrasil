const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Parceiro = require('./Parceiro')

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min:{
                args: 5,
                msg: "Nome deve conter mais de 5 caracteres!"
            }
        }
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
    group:{
        type: Sequelize.ENUM('U', 'R', 'A', 'P') ,
        allowNull: false,
        defaultValue: 'U'
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
    }
}, { sequelize, modelName: 'usuarios' });

Usuario.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
}

Usuario.encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
}

const setSaltAndPassword = user => {
    if (user.changed('senha')) {
        user.salt = Usuario.generateSalt()
        user.senha = Usuario.encryptPassword(user.senha(), user.salt())
    }
}

Usuario.prototype.comparePassword = function(enteredPassword) {
    return Usuario.encryptPassword(enteredPassword, this.salt()) === this.senha()
}


Usuario.prototype.generateAuthToken = function() {
    return new Promise((success, reject) => {
      // Generate an auth token for the user
      const usuario = this
      //Cria o token
      const token = jwt.sign(
        {id: usuario.id}, //Dado que será salvo no token 
        'supersegredo') //Palavra chave secreta para criptografia
//        {expiresIn: '7d'}) //Tempo de duração do Token

      usuario.token = token

      //Salvar o Token no documento do usuário
      usuario.save()
      .then(user =>{
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

Usuario.beforeCreate(setSaltAndPassword)
Usuario.beforeUpdate(setSaltAndPassword)

Usuario.belongsTo(Parceiro, {
    foreignKey: {
        allowNull: true, 
        defaultValue: null
    }
})

module.exports = Usuario;