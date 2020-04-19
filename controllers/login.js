let Usuario = require('../models/Usuario')

module.exports = {
    cadastrar:(req, res, next)=>{

        logger.debug(`[CADASTRAR] Dados recebidos: ${req.body}`)

        const user = new Usuario({
            nome: req.body.nome,
            telefone: req.body.telefone,
            senha: req.body.senha,
            rua: req.body.rua, 
            numero: req.body.numero,
            bairro: req.body.bairro,
            complemento: req.body.complemento,
            estado: req.body.estado,
            cidade: req.body.cidade
        });

        user.save()
        .then(user =>{
            logger.debug(`[CADASTRAR] Usuário criado: ${user}`)
            res.status(201).json(user)
        })
        .catch(error =>{
            logger.error(`[CADASTRAR] Erro: ${error}`)
            res.status(500).json(error)
        })
    },
    login: (req, res, next)=>{
        const { telefone, senha } = req.body

        logger.debug(`[LOGIN] Dados recebidos: ${req.body}`)

        Usuario.findOne({'telefone': telefone})
        .then(user=>{
            logger.info(`[LOGIN] Usuário encontrado: ${user}`)
            if(!user){//Usuário (username) não foi encontrado
                res.status(401).json({
                    token: null,
                    msg: "Usuário não encontrado!"})   
            }else{//Usuário encontrado, verificar senha
                if(user.comparePassword(senha)){//Senha informada está correta
                    user.generateAuthToken() //Gerar o token JWT
                    .then(sucesso =>{//Token gerado com sucesso
                        logger.debug(`[LOGIN] Login realizado com sucesso`)
                        res.status(200).json(sucesso)
                    })
                    .catch(error =>{//Erro ao gerar o Token JWT
                        logger.error(`[LOGIN] Erro ao realizar o login`)
                        res.status(401).json(error)
                    })
                }else{//Senha informada está incorreta
                    logger.error(`[LOGIN] Senha incorreta`)
                    res.status(401).json({
                        token: null,
                        msg: "Senha informada está incorreta!"})
                }
            }
        })
        .catch(error =>{
            logger.error(`[LOGIN] usuário não encontrado`)
            res.status(401).json({
                token: null,
                msg: "Usuário não encontrado!"})
        })
    },
    logout:(req, res, next)=>{
        const userID = req.user.id;

        logger.debug(`[LOGOUT] Solicitação de Logout`)

         //Invalida o token cadastrado para o usuário logado.
         Usuario.update({
            token: null
        }, {
            where: {
                id: userID
            }
        })
        .then(user=>{
            logger.debug(`[LOGOUT] Logout realizado com sucesso`)
            res.status(200).send({ msg: 'Logout realizado com sucesso' });
        })
        .catch(error=>{
            logger.error(`[LOGOUT] Erro: `+error)
            res.status(500).send({ msg: 'Logout não realizado!' });
        })
    },
    getCidadeFromUF: (req, res, next)=>{
        let cidades = require('../lib/cidadesBR.json')
        logger.debug(`[CIDADES] Dados recebido ${req.params.uf}`)

        let cidadesByUF = cidades.estados.filter((city)=>{
            return city.sigla == req.params.uf;
        })
        logger.debug(`[CIDADES] Cidades recuperadas`)
        res.status(200).json(cidadesByUF);
    }
}