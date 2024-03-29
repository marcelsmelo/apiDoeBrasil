const Sequelize = require('sequelize')
const sequelize = require('../database/dbMysql');
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

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
    cpfCnpj:{
        type: Sequelize.STRING,
        unique: true,
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
    email:{
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    sobre:{
        type: Sequelize.STRING,
        allowNull: true
    },
    url_image:{
        type: Sequelize.STRING,
        allowNull: true
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
        type: Sequelize.ENUM('U', 'P', 'UP', 'A') ,
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
        allowNull: false,
        defaultValue: "0"
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


Usuario.prototype.generateAuthToken = function(loginType) {
   return new Promise((success, reject) => {
      // Generate an auth token for the user
      const usuario = this
      
      let data = {usuarioId: usuario.id, loginType: loginType}

      //Cria o token
      const token = jwt.sign(
         data, //Dado que será salvo no token 
         'supersegredo') //Palavra chave secreta para criptografia
//       {expiresIn: '7d'}) //Tempo de duração do Token

      usuario.token = token

      //Salvar o Token no documento do usuário
      usuario.save()
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

Usuario.beforeCreate(setSaltAndPassword)
Usuario.beforeUpdate(setSaltAndPassword)

Usuario.belongsTo(Usuario, {
    as:'parceiro',
    defaultValue: null
})

module.exports = Usuario;