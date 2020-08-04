let Usuario = require('../models/Usuario')
let Sequelize = require("sequelize");
const Op = Sequelize.Op

module.exports = {
   //Cadastra um novo Usuário
    cadastrar: async (req, res, next)=>{
      const user = new Usuario({
         nome: req.body.nome,
         cpfCnpj: req.body.cpfCnpj,
         telefone: req.body.telefone,
         email: req.body.email,
         sobre: req.body.sobre? req.body.sobre: null,
         url_image: req.body.url_image? req.body.url_image: null,
         senha: req.body.senha,
         rua: req.body.rua, 
         numero: req.body.numero,
         bairro: req.body.bairro,
         complemento: req.body.complemento,
         estado: req.body.estado,
         cidade: req.body.cidade,
         group: req.body.group? req.body.group: 'U'
      });

      try{
         let usuario = await user.save()
         res.status(201).json({msg:"Usuário criado com sucesso"})
      }catch(error){
         res.status(500).json({msg:"Erro ao cadastrar o usuário!", "error": error.message})
      }
   },

   //Retorna os dados do usuário logado
   meusDados: async (req, res, next)=>{
      try{
         let dados = await Usuario.findOne({
            where:{
               id: req.user.id,
               removed: false
            } 
         })
         return res.status(200).json(dados)        
      }catch(error){
         return res.status(500).json({msg: "Erro ao buscar informações", 'error': error.message})
      }
   },

   //Realiza o login do usuário / Parceiro
   login: (req, res, next)=>{
      let condition = {
         'cpfCnpj': req.body.cpfCnpj,
         removed: false
      }

      if(req.body.loginType == 'U'){//Login de Usuário
         condition.group =  {[Op.or]: ['U', 'UP']}
      }else{//Login de Parceiro
         condition.group =  {[Op.or]: ['P', 'UP']}
      }

      Usuario.findOne({
         where: condition
      })
      .then(user=>{
         if(!user){//Usuário (cpfCnpj) não foi encontrado
            res.status(500).json({
               msg: "Usuário não encontrado! Tente novamente",
               error: null})   
         }else{//Usuário encontrado, verificar senha
            if(user.comparePassword(req.body.senha)){//Senha informada está correta
               user.generateAuthToken(req.body.loginType) //Gerar o token JWT
               .then(sucesso =>{//Token gerado com sucesso
                  res.status(200).json(sucesso)
               })
               .catch(error =>{//Erro ao gerar o Token JWT
                  res.status(500).json({msg:"Erro ao realizar o login!", "error": error.message})
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
      try{
         await Usuario.update({
            token: null
         }, {
            where: {
               id: req.user.id
            }
         })
         res.status(200).send({msg: 'Logout realizado com sucesso!'});
      }catch(error){
         res.status(500).send({msg: 'Logout não realizado!', "error": error.message});
      }
   },

   editar: async (req, res, next)=>{
      try{
         let usuario = await Usuario.findOne({
            where: {
               id: req.user.id,
               removed: false
            }
         })

         usuario.nome = req.body.nome;
         usuario.telefone = req.body.telefone;
         usuario.email = req.body.email? req.body.email: null;
         usuario.sobre = req.body.sobre? req.body.sobre: null;
         usuario.url_image = req.body.url_image? req.body.sobre: null;
         usuario.rua = req.body.rua;
         usuario.numero = req.body.numero;
         usuario.bairro = req.body.bairro;
         usuario.complemento = req.body.complemento;
         if(req.body.senha) usuario.senha = req.body.senha;//TODO: Fazer rota apenas para alteração de senha???
         // usuario.estado = req.body.estado;
         // usuario.cidade = req.body.cidade;

         await usuario.save();
         return res.status(200).json({msg: "Usuário editado com sucesso!"})
      }catch(error){
         res.status(500).json({msg: "Erro ao editar usuário", 'error': error.message})
      }
   },

   //Remove um Parceiro existente
   remover: async (req, res, next)=>{
      try{
         await Usuario.update({
                  removed: true
               },{
               where: {
                  id: req.user.id,
                  removed: false
               }
         })

         //Atualizar todos os usuários que são vinculados ao parceiro removido, caso exista. 
         await Usuario.update({
            group: 'U',
            parceiroId: null,
            token: null
         },{
            where: {
               parceiroId: req.user.id
            }
         })
         return res.status(200).json({msg: "Usuário removido com sucesso!"})
      }catch(error){
         return res.status(500).json({msg: "Erro ao remover Usuário!" , 'error': error.message})
      }
   },

   //Define o usuário (U) como Usuário-Parceiro (UP)
   //Disponível apenas para o Parceiro (P)
   selecionarComoParceiro: async (req, res, next)=>{
      try{
         let success = await Usuario.update({
            group: 'UP',
            parceiroId: req.user.parceiroId
         }, {
            where: {
               id: req.query.id,
               removed: false
            }
         })
         if(!success[0]) throw new Error('Usuário não atualizado!')
         res.status(200).send({ msg: 'Usuário transformado em Usuário-Parceiro com sucesso' });
      }catch(error){
         res.status(500).send({msg: 'Erro ao atualizar usuário!', "error": error.message});
      }
   },

   //Retira o vínculo do usuário (UP) do Parceiro Logado, o tornando usuário (U)
   //Disponível apenas para o Parceiro (P)
   removerComoParceiro: async (req, res, next)=>{
      try{
         let success = await Usuario.update({
            group: 'U',
            parceiroId: null
         }, {
            where: {
               id: req.query.id,
               removed: false
            }
         })
         if(!success[0]) throw new Error('Usuário não atualizado!')
         res.status(200).send({ msg: 'Usuário não está mais vinculado ao Parceiro!'});
      }catch(error){
         res.status(500).send({msg: 'Erro ao atualizar usuário!', "error": error.message});
      }
   },

   //Buscar todos usuários vinculados ao Parceiro Logado. 
   //Disponível apenas para o Parceiro (P)
   usuariosParceiro: async (req, res, next)=>{
      let usuarioId = req.query.id;
      let condition = {
         parceiroId: req.user.id,
         group: 'UP',
         cidade: req.user.cidade,
         removed: false
      };

      if(usuarioId) condition.id = usuarioId;

      try{
         let usuarios = await Usuario.findAll({
            where: condition
         })
         res.status(200).json(usuarios)
      }catch(error){
         res.status(500).send({msg: 'Erro ao buscar usuários!', "error": error.message});
      }
   },

   //Lista todos os usuários cadastrados na cidade, que ainda não estão vinculados a um parceiro
   //Disponível apenas para o Parceiro (P)
   buscarUsuarios: async (req, res, next)=>{//Filtar por ID
      let usuarioId = req.query.id;
      let condition = {
         parceiroId: null,
         group: 'U',
         cidade: req.user.cidade,
         removed: false
      };

      if(usuarioId) condition.id = usuarioId;

      try{
         let usuarios = await Usuario.findAll({
            where: condition
         })
         res.status(200).json(usuarios)
      }catch(error){
         res.status(500).send({msg: 'Erro ao buscar usuários!', "error": error.message});
      }
   },

   //Busca todos os parceiros da cidade
   buscarParceiros: async (req, res, next)=>{
      let usuarioId = req.query.id;
      let condition = {
         group: 'P',
         cidade: req.user.cidade,
         removed: false
      };

      if(usuarioId) condition.id = usuarioId;
      
      try{
         let parceiros = await Usuario.findAll({
               where: condition,
               attributes: ['id', 'nome', 'cpfCnpj', 'telefone','email', 'sobre', 'url_image', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado']
         })
         res.status(200).json(parceiros)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar parceiros", 'error': error.message})
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