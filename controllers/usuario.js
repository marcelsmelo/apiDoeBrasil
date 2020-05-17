let Usuario = require('../models/Usuario')

module.exports = {
   //Cadastra um novo usuário
    cadastrar: async (req, res, next)=>{

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

      try{
         let usuario = await user.save()
         res.status(201).json({msg:"Usuário criado com sucesso", "usuario": user})
      }catch(error){
         res.status(500).json({msg:"Erro ao cadastrar o usuário!", "error": error.message})
      }
   },

   //Realiza o login do usuário
   login: (req, res, next)=>{
      const { telefone, senha } = req.body

      Usuario.findOne({
            where: {
                'telefone': telefone
            }
        })
        .then(user=>{
            if(!user){//Usuário (username) não foi encontrado
                res.status(500).json({
                    msg: "Usuário não encontrado!",
                    error: null})   
            }else{//Usuário encontrado, verificar senha
                if(user.comparePassword(senha)){//Senha informada está correta
                     user.generateAuthToken('U') //Gerar o token JWT
                     .then(sucesso =>{//Token gerado com sucesso
                        res.status(200).json(sucesso)
                    })
                    .catch(error =>{//Erro ao gerar o Token JWT
                        res.status(500).json({msg:"Erro ao realizar o login", "error": error.message})
                    })
                }else{//Senha informada está incorreta
                    res.status(500).json({
                        msg: "Senha informada está incorreta!",
                        "error": null
                    })
                }
            }
        })
        .catch(error =>{
            res.status(500).json({
                msg: "Usuário não encontrado!",
                "error":null
            })
        })
    },

    //Invalida o token cadastrado para o usuário logado.
    logout: async (req, res, next)=>{
      const userID = req.user.id;
      try{
         await Usuario.update({
            token: null
         }, {
            where: {
               id: userID
            }
         })
         res.status(200).send({ msg: 'Logout realizado com sucesso' });
      }catch(error){
         res.status(500).send({msg: 'Logout não realizado!', "error": error.message});
      }
   },

   selecionarComoParceiro: async (req, res, next)=>{
      try{
         let success = await Usuario.update({
            group: 'P',
            parceiroId: req.user.parceiroId
         }, {
            where: {
               id: req.params.id
            }
         })
         if(!success[0]) throw new Error('Usuário não atualizado!')
         res.status(200).send({ msg: 'Usuário transformado em Parceiro com sucesso' });
      }catch(error){
         res.status(500).send({msg: 'Erro ao atualizar usuário!', "error": error.message});
      }
   },

   removerComoParceiro: async (req, res, next)=>{
      try{
         let success = await Usuario.update({
            group: 'U',
            parceiroId: null
         }, {
            where: {
               id: req.params.id
            }
         })
         if(!success[0]) throw new Error('Usuário não atualizado!')
         res.status(200).send({ msg: 'Usuário não é mais um parceiro' });
      }catch(error){
         res.status(500).send({msg: 'Erro ao atualizar usuário!', "error": error.message});
      }
   },


   usuariosParceiro: async (req, res, next)=>{
      try{
         let usuarios = await Usuario.findAll({
            where:{
               parceiroId: req.user.parceiroId,
               cidade: req.user.cidade
            }
         })
         res.status(200).json(usuarios)
      }catch(error){
         res.status(500).send({msg: 'Erro ao buscar usuários!', "error": error.message});
      }
   },

   usuariosSemParceiro: async (req, res, next)=>{
      try{
         let usuarios = await Usuario.findAll({
            where:{
               parceiroId: null,
               cidade: req.user.cidade
            }
         })
         res.status(200).json(usuarios)
      }catch(error){
         res.status(500).send({msg: 'Erro ao buscar usuários!', "error": error.message});
      }
   },

   //Busca todas cidades vinculados ao UF informado
   getCidadeFromUF: (req, res, next)=>{
      let cidades = require('../lib/cidadesBR.json')
      let cidadesByUF = cidades.estados.filter((city)=>{
         return city.sigla == req.params.uf;
      })
      res.status(200).json(cidadesByUF[0]);
   }
}