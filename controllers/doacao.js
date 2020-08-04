

const Sequelize = require('sequelize');
let Usuario = require('../models/Usuario')
let Doacao = require('../models/Doacao')
let Pedido = require('../models/Pedido')

const Op = Sequelize.Op

module.exports = {
   //Busca doação por ID
    buscarDoacao: async (req, res, next)=>{
      let condition = {
         removed: false
      }
      if(req.query.id){
         condition.id = req.query.id
      }else{//Em caso de BuscarTodos, busca os pedidos vinculados aos usuários e/ou Parceiros logados

         if(req.user.group == 'U') condition.usuarioId = req.user.id; //Usuário comum - Busca todos pedidos do usuário
         else if(req.user.group == 'P') condition.parceiroId = req.user.parceiroId; //Parceiro - Busca todos pedidos associados ao parceiro

         //Verifica também a busca por status
         //0 - Aguardando Entrega; 1 - Aguardando Retirada; 2 - Aguardando confirmação; 3 - Finalizada
         if(req.query.status && (req.query.status == 0 || req.query.status == 1 || req.query.status == 2|| req.query.status == 3)){
            condition.status = req.query.status
         }
      }

      try{
         let doacoes = await Doacao.findAll({
            where: condition,
            attributes: ['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'outros', 'observacoes', 'status', 'dispEntrega'],
            include:[{
               model: Usuario,
               as: 'usuario',
               required: true,
               attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
               on:{
                  id: Sequelize.where(Sequelize.col("doacao.usuarioId"), "=", Sequelize.col("usuario.id"))
               },
               where:{'cidade': req.user.cidade}
            },{
               model: Usuario,
               as: 'parceiro',
               attributes: ['id', 'nome', 'cpfCnpj', 'email', 'telefone'],
               on:{
                  id: Sequelize.where(Sequelize.col("doacao.parceiroId"), "=", Sequelize.col("parceiro.id"))
               },
            }]
         })
         res.status(200).json(doacoes)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar doação", 'error': error.message})
      }
    },
    //Cadastra uma nova Doação vinculada ao usuário Logado, caso o usuário logado seja um parceiro, será cadastrado para o parceiro logado. 
    cadastrar: async (req, res, next)=>{
      try{
         let status = 1;

         if(!req.body.generoAlimenticio && !req.body.higienePessoal && !req.body.artigoLimpeza && !req.body.outros){
            throw new Error("Selecione pelo menos um produto para doação.")
         }

         //0 - Aguardando Entrega; 1 - Aguardando Retirada; 2 - Aguardando confirmação; 3 - Finalizada
         if(req.body.dispEntrega) status = 0

         if(req.user.group == 'U'){//Cadastro de doação pelo usuário

            //Realizar o usuário for realizar a entrega, deve ter selecionado um parceiro
            if(!req.body.parceiroId)
               throw new Error("Selecione um parceiro para realizar a doação")

            req.body.usuarioId = req.user.id;
            req.body.createdBy = 'U'

         }else if(req.user.group = 'P'){//Cadastro de doação pelo Parceiro

            if(!req.body.usuarioId)//Verificar se vinculou a doação a um Usuário
               throw new Error("Selecione um usuário que realizou a doação")

            req.body.parceiroId = req.user.parceiroId;
            req.body.createdBy = 'P'
            
            //O parceiro pode definir qual o status da Doação no momento da criação
            //0 - Aguardando Entrega; 1 - Aguardando Retirada; 2 - Aguardando confirmação; 3 - Finalizada
            if(req.body.status) status = req.body.status;

         }else{
            throw new Error("Erro: Usuário inválido!")
         }

         let doacao = new Doacao({
            generoAlimenticio: req.body.generoAlimenticio,
            higienePessoal: req.body.higienePessoal, 
            artigoLimpeza: req.body.artigoLimpeza, 
            outros: req.body.outros, 
            observacoes: req.body.observacoes,
            dispEntrega: req.body.dispEntrega,
            usuarioId: req.body.usuarioId,
            parceiroId: req.body.parceiroId,
            createdBy: req.body.createdBy,
            status: status
         })
      
         let novaDoacao = await doacao.save();
         res.status(200).json(novaDoacao);
      }catch(error){//Erro ao cadastrar doação
         res.status(500).json({msg:"Erro ao cadastrar doação", 'error': error.message})
      }
   },

   //Permite que um usuário edite uma doação salva. Permitido apenas para o usuário que criou a doação. 
    editar: async (req, res, next)=>{
      let condition = {
         id: req.query.id,
         createdBy: req.user.group,
         removed: false
      }

      if(req.user.group == 'U') condition.usuarioId = req.user.id;
      else condition.parceiroId = req.user.parceiroId;

      try{
         let doacao = await Doacao.findOne({
            where: condition
         })

         if(!doacao) return res.status(403).json({msg: 'Alteração não autorizada! O usuário logado não tem permissão para fazer essa operação.', error: null})
         if(doacao.status == 2 || doacao.status == 3) throw new Error('Alteração não autorizada! A doação já foi finalizada.')

         doacao.generoAlimenticio = req.body.generoAlimenticio
         doacao.higienePessoal = req.body.higienePessoal
         doacao.artigoLimpeza = req.body.artigoLimpeza
         doacao.outros = req.body.outros
         doacao.observacoes = req.body.observacoes
         doacao.dispEntrega = req.body.dispEntrega
         
         //0 - Aguardando Entrega; 1 - Aguardando Retirada; 2 - Aguardando confirmação; 3 - Finalizada
         if(req.body.dispEntrega) doacao.status = 0;
         else doacao.status = 1
         
         if(req.user.group == 'U')
            doacao.parceiroId = req.body.parceiroId
         else{
            //O parceiro pode definir o status de uma doação
            if(req.body.status) doacao.status = req.body.status;
         }

         await doacao.save()
         res.status(200).json({msg:"Doação editada com sucesso!"})
         
      }catch(error){
         res.status(500).json({msg:"Erro ao editar doação", 'error': error.message})
      }
   },
   remover:async (req, res, next)=>{
      let condition = {
         id: req.query.id,
         removed: false
      }
      
      if(req.user.group == 'U') condition.usuarioId = req.user.id;
      else{
         condition.createdBy = req.user.group
         condition.parceiroId = req.user.parceiroId
      }

      try{
         let doacao = await Doacao.findOne({
            where:condition
         })

         if(!doacao) return res.status(403).json({msg:'Alteração não autorizada! O usuário logado não tem permissão para fazer essa operação.', error: null})
         if(doacao.status == 2 || doacao.status == 3) throw new Error('Alteração não autorizada! Doação já finalizada.')

         doacao.removed = true;
         
         await doacao.save()
         res.status(200).json({msg: "Doação removida com sucesso!"})  
      }catch(error){
         res.status(500).json({msg: "Erro ao remover doação!" , 'error' :error.message})
      }
   },
   //Ao finalizar uma doação, o parceiro ou pedido vinculado deve confirmar a entrega
   finalizar: async (req, res, next)=>{
      // Se Usuário - Status vai para 2 - Aguardando confirmação
      // Se Parceiro - Status vai para 3 - Finalizado
      let data = {}
      let condition = {}

      condition.id = req.query.id
      
      if(req.user.group == 'U'){
         data.status = 2
         data.deliveredAt = new Date().toString()
         condition.usuarioId = req.user.id
      }else{
         data.status = 3
         data.finishedAt = new Date().toString()
         condition.parceiroId = req.user.parceiroId
      }

      try{
         let success = await Doacao.update(data,{
                  where: condition,
                  removed: false
               })
         if(success[0]) res.status(200).json({msg: "Doação confirmada e aguardando finalização!"})
         else return res.status(403).json({msg:'Alteração não autorizada! O usuário logado não tem permissão para fazer essa operação.', error: null})
         
      }catch(error){
         res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
      }
   },
}