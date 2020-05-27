let Parceiro = require('../models/Parceiro')
let Usuario = require('../models/Usuario')
const email = require('../lib/email');


module.exports = {
    //Busca um Parceiro pelo ID
    buscarPorId: async (req, res, next)=>{
      try{
         let parceiro = await Parceiro.findOne({
               where: {
                  id: req.params.id,
                  removed: false
               },
               attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado']
            })
         res.status(200).json(parceiro)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar parceiro", 'error': error.message})
      }
   },

   meusDados: async (req, res, next)=>{//TODO: Documentar
      let dados = {}
      try{
         if(req.user.usuarioId){
            dados = await Usuario.findOne({
               where:{
                  id: req.user.id,
                  removed: false
               } 
            })
         }else{
            dados = await Parceiro.findOne({
               where:{
                  id: req.user.parceiroId,
                  removed: false
               } 
            })
         }
         return res.status(200).json(dados)
      }catch(error){
         return res.status(500).json({msg: "Erro ao buscar informações", 'error': error.message})
      }
   },
   //Busca todos os parceiros da cidade
   buscarTodos: async (req, res, next)=>{
      try{
         let parceiros = await Parceiro.findAll({
               where: {
                  cidade: req.user.cidade,
                  removed: false
               },
               attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado']
         })
         res.status(200).json(parceiros)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar parceiros", 'error': error.message})
      }
   },

   //Cadastra um novo Parceiro
   cadastrar: async (req, res, next)=>{
      let parceiro = new Parceiro({
         nome: req.body.nome,
         telefone: req.body.telefone,
         senha: req.body.senha,
         rua: req.body.rua, 
         numero: req.body.numero,
         bairro: req.body.bairro,
         complemento: req.body.complemento,
         estado: req.body.estado,
         cidade: req.body.cidade,
         removed: true
      })
      
      try{
         let novoParceiro = await parceiro.save()
         email.sendEmail(novoParceiro)
         res.status(200).json(novoParceiro)
      }catch(error){
         console.log('ERROR', error)
         res.status(500).json({msg: "Erro ao cadastrar parceiro", 'error': error.message})
      }
   },

   //Edita um parceiro existente 
   editar: async (req, res, next)=>{
      if(req.user.id) return res.status(403).json({msg: "O Usuário não tem acesso a essa rota"})
      
      try{
         let parceiro = await Parceiro.findOne({
            where: {
               id: req.user.parceiroId,
               removed: false
            }
         })

         parceiro.nome = req.body.nome;
         parceiro.telefone = req.body.telefone;
         parceiro.rua = req.body.rua; 
         parceiro.numero = req.body.numero;
         parceiro.bairro = req.body.bairro;
         parceiro.complemento = req.body.complemento;
         if(req.body.senha) parceiro.senha = req.body.senha;

         await parceiro.save();
         return res.status(200).json({msg: "Parceiro editado com sucesso!"})
      }catch(error){
         return res.status(500).json({msg: "Erro ao editar parceiro", 'error': error.message})
      }
   },

   //Remove um Parceiro existente
   remover: async (req, res, next)=>{
      if(req.user.id) return res.status(403).json({msg: "O Usuário não tem acesso a essa rota"})
      
      try{
         await Parceiro.update({
                  removed: true
               },{
               where: {
                  id: req.user.parceiroId,
                  removed: false
               }
         })

         await Usuario.update({
            group: 'U',
            parceiroId: null,
            token: null
         },{
            where: {
               parceiroId: req.user.parceiroId
            }
         })
         return res.status(200).json({msg: "Parceiro removido com sucesso!"})
      }catch(error){
         return res.status(500).json({msg: "Erro ao remover Parceiro!" , 'error': error.message})
      }
   },
    //Realiza o login do Parceiro
    login: (req, res, next)=>{
      const { telefone, senha } = req.body

      Parceiro.findOne({
            where: { 'telefone': telefone, removed: false }
      })
      .then(parceiro=>{
         if(!parceiro){//Parceiro (telefone) não foi encontrado
            loginUsuario(telefone, senha, res)
         }else{//Parceiro encontrado, verificar senha
            if(parceiro.comparePassword(senha)){//Senha informada está correta
               parceiro.generateAuthToken() //Gerar o token JWT
               .then(sucesso =>{//Token gerado com sucesso
                  return res.status(200).json(sucesso)
               })
               .catch(error =>{//Erro ao gerar o Token JWT
                  return res.status(500).json({msg:"Erro ao realizar o login", "error": error.message})
               })
            }else{//Senha informada está incorreta
               loginUsuario(telefone, senha, res)
            }
         }
      })
      .catch(error =>{
         res.status(500).json({msg: "Erro ao procurar Parceiro!","error": error})
      })
   },

    //Invalida o token cadastrado para o parceiro logado.
    logout: async (req, res, next)=>{
      const parceiroId = req.user.id;

      if(!req.user.id && req.user.parceiroId){//Parceiro responsável
         try{
            await Parceiro.update({
               token: null
            }, {
               where: {
                  id: req.user.parceiroId
               }
            })
      
            res.status(200).send({ msg: 'Logout realizado com sucesso' });
         }catch(error){
            res.status(500).send({msg: 'Logout não realizado!', "error": error.message});
         }
      }else{//Usuário parceiro
         try{
            await Usuario.update({
               token: null
            }, {
               where: {
                  id: req.user.id
               }
            })
            res.status(200).send({ msg: 'Logout realizado com sucesso' });
         }catch(error){
            res.status(500).send({msg: 'Logout não realizado!', "error": error.message});
         }
      }
   },
}


function loginUsuario(telefone, senha, res){
   Usuario.findOne({
      where: {'telefone': telefone, group:'P', removed: false}
   })
   .then(user=>{
      if(!user){//Usuário (username) não foi encontrado
         return res.status(500).json({msg: "Usuário não encontrado!", error: null})
      }else{//Usuário encontrado, verificar senha
         if(user.comparePassword(senha)){//Senha informada está correta
            user.generateAuthToken('P') //Gerar o token JWT
            .then(sucesso =>{//Token gerado com sucesso
               return res.status(200).json(sucesso)
            })
            .catch(error =>{//Erro ao gerar o Token JWT
               return res.status(500).json({msg:"Erro ao realizar o login", "error": error.message})
            })
         }else{//Senha informada está incorreta
            return res.status(500).json({msg: "Senha informada está incorreta!","error": null})
         }
      }
   })
   .catch(error =>{
      return res.status(500).json({msg: "Erro ao procurar Usuário!", "error": error})
   })
}