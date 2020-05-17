const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Parceiro = require('../models/Parceiro');

module.exports={
   jwtVerify: (req, res, next) => {
      // check header or url parameters or post parameters for token
      let token = req.headers['authorization'];
      if (token) { //Descriptografa o token JWT
         token = token.replace('Bearer ', '')
         jwt.verify(token, 'supersegredo', function(err, decoded) {
            if(err){//Caso ocorra algum erro na descriptografia
               return res.status(401).json({
                  msg: 'Falha ao verificar token de acesso. Tente novamente!'
               });
            } else {//Recupera o dado inserido no token
               const usuarioId = decoded.usuarioId;
               const parceiroId = decoded.parceiroId;
            
               if(usuarioId){
                     Usuario.findOne({ 
                        where:{
                           id: usuarioId,
                           token: token
                        },
                        raw: true,
                        attributes: ["id", "nome", "group", "cidade", "parceiroId"]
                     })
                     .then(usuario=>{
                        if (!usuario) {//Caso não seja encontrado nenhum usuário
                           return res.status(401).json({
                               msg: 'Token não encontrado. Faça login!!!',
                               error: null
                           });
                       }else{//Caso senha encontrado o usuário
                           usuario.group = decoded.loginType
                           req.user = usuario;//Insere os dados do usuário requisição
                           next();//Passa a requisição para o próximo token
                       }//else
                     })
                     .catch(error=>{
                        return res.status(401).json({
                           msg: 'Erro ao buscar o Usuário!',
                           error: error.message
                       });
                     });
               }else if(parceiroId){
                  Parceiro.findOne({ 
                     where:{
                        id: parceiroId,
                        token: token
                     },
                     raw: true,
                     attributes: ["id", "nome", "cidade"]
                  })
                  .then(parceiro=>{
                     if (!parceiro){//Caso não seja encontrado nenhum usuário
                        return res.status(401).json({
                            msg: 'Token não encontrado. Faça login!!!',
                            error: null
                        });
                     }else{//Caso senha encontrado o usuário
                        req.user = {}
                        req.user.id = null
                        req.user.group = 'P'
                        req.user.parceiroId = parceiro.id
                        req.user.nome = parceiro.nome
                        req.user.cidade = parceiro.cidade

                        next();//Passa a requisição para o próximo token
                     }
                  })
                  .catch(error=>{
                     return res.status(401).json({
                        msg: 'Erro ao buscar o Parceiro!',
                        error: error.message
                    });
                  })
               }else{//if parceiroId
                  return res.status(401).json({
                     msg: 'Token Inválido!',
                     error: error.message
                 });
               }
            }//else
         });
      }else {
         // if there is no token
         // return an error
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