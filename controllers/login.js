let Usuario = require('../models/Usuario')

module.exports = {
    cadastrar:(req, res, next)=>{

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
            res.status(201).json(user)
        })
        .catch(error =>{
            res.status(500).json(error)
        })
    },
    login: (req, res, next)=>{
        const { telefone, senha } = req.body

        Usuario.findOne({'telefone': telefone})
        .then(user=>{
            if(!user){//Usuário (username) não foi encontrado
                res.status(401).json({
                    token: null,
                    msg: "Usuário não encontrado!"})   
            }else{//Usuário encontrado, verificar senha
                if(user.comparePassword(senha)){//Senha informada está correta
                    user.generateAuthToken() //Gerar o token JWT
                    .then(sucesso =>{//Token gerado com sucesso
                        res.status(200).json(sucesso)
                    })
                    .catch(error =>{//Erro ao gerar o Token JWT
                        res.status(401).json(error)
                    })
                }else{//Senha informada está incorreta
                    res.status(401).json({
                        token: null,
                        msg: "Senha informada está incorreta!"})
                }
            }
        })
        .catch(error =>{
            res.status(401).json({
                token: null,
                msg: "Usuário não encontrado!"})
        })
    },
    logout:(req, res, next)=>{
        const userID = req.user.id;

         //Invalida o token cadastrado para o usuário logado.
         Usuario.update({
            token: null
        }, {
            where: {
                id: userID
            }
        })
        .then(user=>{
            res.status(200).send({ msg: 'Logout realizado com sucesso' });
        })
        .catch(error=>{
            res.status(500).send({ msg: 'Logout não realizado!' });
        })
    },
    getCidadeFromUF: (req, res, next)=>{
        let cidades = require('../lib/cidadesBR.json')

        let cidadesByUF = cidades.estados.filter((city)=>{
            return city.sigla == req.params.uf;
        })
        
        res.status(200).json(cidadesByUF);
    }
}