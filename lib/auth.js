const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

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
                } else {
                    let userID = decoded.id;//Recupera o dado inserido no token

                    Usuario.findOne({ 
                        where:{
                            id: userID,
                            token: token
                        },
                        attributes: ["id", "nome", "group", "cidade", "parceiroId"]
                    })
                    .then((user) => {
                        if (!user) {//Caso não seja encontrado nenhum usuário
                            return res.status(401).json({
                                success: false,
                                msg: 'Token não encontrado. Faça login!!!'
                            });
                        }else{//Caso senha encontrado o usuário
                            req.user = user;//Insere os dados do usuário requisição
                            next();//Passa a requisição para o próximo token
                        }
                    })
                    .catch((err) => { //Não seja encontrado um token válido no BD
                        return res.status(401).json({
                            msg: 'Token Inválido!',
                            err: err.errmsg
                        });
                    });    
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.status(401).json({
                message: 'O envio do token é obrigatório!'
            });
        }
    },
    groupVerify: (role) => {
        return function(req, res, next) {
        if (role != null && role.includes(req.user.group))
            next();
        else
            res.status(403).json({
                msg: "O usuário não tem acesso a esta rota!"
            })   
        }
    }



} 