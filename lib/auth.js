const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Parceiro = require('../models/Parceiro');

module.exports={
   jwtVerify: (req, res, next) => {
      // check header or url parameters or post parameters for token
      let token = req.headers['authorization'];
      if (token){ //Descriptografa o token JWT
         token = token.replace('Bearer ', '')
         jwt.verify(token, 'supersegredo', function(err, decoded) {
            if(err){//Caso ocorra algum erro na descriptografia
               return res.status(401).json({
                  msg: 'Falha ao verificar token de acesso. Tente novamente!'
               });
            }else{//Recupera o dado inserido no token
               const usuarioId = decoded.usuarioId;
               const group = decoded.group

               Usuario.findOne({ 
                  where:{
                     id: usuarioId,
                     token: token,
                     removed: false
                  },
                  raw: true,
                  attributes: ["id", "nome", "group", "cidade", "estado", "parceiroId"]
               }).then(usuario=>{
                  if (!usuario) {//Caso não seja encontrado nenhum usuário
                     return res.status(401).json({
                           msg: 'Token de Usuário não encontrado. Faça login!!!',
                           error: null
                     });
                  }else{//Caso senha encontrado o usuário
                     req.user = usuario;//Insere os dados do usuário requisição
                     next();//Passa a requisição para o próximo token
                  }
               })
               .catch(error=>{
                  return res.status(401).json({
                     msg: 'Erro ao buscar o Usuário!',
                     error: error.message
                  });
               });
            } 
         });
      }else {
         return res.status(401).json({
            msg: 'O envio do token é obrigatório!',
            error: null
         });
      }
   },
    groupVerify: (role) => {
        return function(req, res, next) {
        if (role != null && role.includes(req.user.group))
            next();
        else
            res.status(403).json({
                msg: "O usuário não tem acesso a esta rota!",
                error: null
            })   
        }
    }



} 