const Sequelize = require('sequelize');
let Usuario = require('../models/Usuario')
let Pedido = require('../models/Pedido');
const database = require('../config/database');
const Op = Sequelize.Op

module.exports = {
   //Busca um pedido por ID
   buscarPedido: async (req, res, next)=>{
      let condition = {
         removed: false
      }

      //Buscar por ID
      if(req.query.id)
         condition.id = req.query.id 
      else{//Em caso de BuscarTodos, busca os pedidos vinculados aos usuários e/ou Parceiros logados
         
         if(req.user.loginType == 'U') condition.usuarioId = req.user.id; //Usuário comum - Busca todos pedidos do usuário
         else if(req.user.loginType == 'P') condition.parceiroId = req.user.parceiroId; //Parceiro - Busca todos pedidos associados ao parceiro
         
         //Verifica também a busca por status
         if(req.query.status && (req.query.status == 0 || req.query.status == 1 || req.query.status == 2)){
            condition.status = req.query.status
         }
      } 
      
      try{
         let pedidos = await Pedido.findAll({
            where: condition,
            attributes: ['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'outros', 'observacoes', 'status'],
            include:[{
                  model: Usuario,
                  as: 'usuario',
                  required: true,
                  attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
                  on:{
                     id: Sequelize.where(Sequelize.col("pedido.usuarioId"), "=", Sequelize.col("usuario.id"))
                  },
                  where:{'cidade': req.user.cidade}
               },{
                  model: Usuario,
                  as: 'parceiro',
                  attributes: ['id', 'nome', 'cpfCnpj', 'email'],
                  on:{
                     id: Sequelize.where(Sequelize.col("pedido.parceiroId"), "=", Sequelize.col("parceiro.id"))
                  },
            }]
         })
         res.status(200).json(pedidos)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
      }
   },
   //Cadastra um novo pedido vinculado ao usuário logado
   cadastrar: async (req, res, next)=>{
      let status = 0;
      //Verificar se o usuário já possui algum pedido aberto. 
      let nroPedidos = await nroPedidosAbertos(req.user.id)
      if(nroPedidos > 0){//Não permitir a criação de um novo pedido enquanto existir pedido em aberto
         return res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': 'O usuário já possui pedido em aberto!'})
      }
      
      //Verificar se o usuário solicitou pelo menos um material
      if(!req.body.generoAlimenticio && !req.body.higienePessoal &&
         !req.body.artigoLimpeza && !req.body.outros){
            return res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': 'Solicite pelo menos um material!'})
      }

      //Se for aberto pelo Parceiro, deve indicar para qual usuário (U)
      if(req.user.loginType == 'U'){
         if(!req.body.parceiroId)//Ao solicitar ajuda, o usuário deve selecionar um Parceiro
            return res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': 'O Pedido deve ser vinculado a um usuário!'})
         
         req.body.usuarioId = req.user.id;
         req.body.createdBy = 'U';
      }else if(req.user.loginType == 'P'){
         if(!req.body.usuarioId)
            return res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': 'O Pedido deve ser vinculado a um usuário!'})
         
         req.body.parceiroId = req.user.parceiroId;
         req.body.createdBy = 'P';
         
         //O parceiro pode definir qual o status da Doação no momento da criação
         //0 - Aguardando Atendimento; 1 - Aguardando Entrega; 2 - Finalizada   
         if(req.body.status) status = req.body.status;

      }else{
         return res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': 'Usuário inválido, tente novamente!'})
      }

      let pedido = new Pedido({
            generoAlimenticio: req.body.generoAlimenticio,
            higienePessoal: req.body.higienePessoal, 
            artigoLimpeza: req.body.artigoLimpeza, 
            outros: req.body.outros, 
            observacoes: req.body.observacoes,
            status: status, //Marcar como não atendida
            createdBy: req.body.createdBy,
            cadastradoPorId : req.user.id //Cadastrado pelo usuário logado
      });

      if(req.user.group == 'P'){ //Se for parceiro, vincular o pedido a um usuário cadastrado
         pedido.usuarioId = req.body.usuarioId
         pedido.parceiroId = req.user.parceiroId
      }else{
         pedido.usuarioId = req.user.id
         //Verificar se foi vinculado o pedido a um parceiro específico.
         pedido.parceiroId = req.body.parceiroId ? req.body.parceiroId : null;
      }

      try{
         let novoPedido = await pedido.save()
         res.status(200).json(novoPedido)
      }catch(error){
         res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': error.message})
      }
   },

   //Edita um pedido criado pelo Usuário/Parceiro logado
   editar: async (req, res, next)=>{
      let condition = {
         id: req.query.id,
         createdBy: req.user.loginType,
         removed: false
      }

      if(req.user.loginType == 'U') condition.usuarioId = req.user.id;
      else condition.parceiroId = req.user.parceiroId;
      
      try{
         let pedido = await Pedido.findOne({
            where: condition
         })
   
         if(!pedido)
            return res.status(403).json({msg: 'Alteração não autorizada! O usuário logado não tem permissão para realizar essa operação', error: null});
         
         
         if(pedido.status == 0){
            pedido.generoAlimenticio = req.body.generoAlimenticio
            pedido.higienePessoal = req.body.higienePessoal
            pedido.artigoLimpeza = req.body.artigoLimpeza
            pedido.outros = req.body.outros
            pedido.observacoes = req.body.observacoes

            if(req.user.loginType == 'U')//O usuário pode alterar o parceiro do pedido.
               doacao.parceiroId = req.body.parceiroId
            else{
               //O parceiro pode definir o status de uma doação
               if(req.body.status) doacao.status = req.body.status;
            }

            await pedido.save()
            res.status(200).json({msg: "Pedido editado com sucesso!"})
         }else{
            throw new Error('Alteração não autorizada! O pedido já foi selecionado para entrega ou finalizado')
         }
      }catch(error){
         res.status(500).json({msg: "Erro ao editar pedido", 'error': error.message})
      }
   },
   //Remove um pedido pertencente ao usuário logado
   remover: async (req, res, next)=>{
      let condition = {
         id: req.query.id,
         removed: false
      }

      if(req.user.loginType == 'U') condition.usuarioId = req.user.id;
      else{
         condition.parceiroId = req.user.parceiroId;
         condition.createdBy = 'P'
      } 

      let pedido = await Pedido.findOne({
         where: condition
      })

      if(!pedido)
         return res.status(403).json({msg: 'Alteração não autorizada! O usuário logado não tem permissão para realizar essa operação', error: null});
      
      if(pedido.status != 0)
         return res.status(403).json({msg: 'Alteração não autorizada! Pedido já selecionado para atendimento!', error: null});

      try{
         pedido.removed = true;
         await pedido.save();
         res.status(200).json({msg: "Pedido removido com sucesso!"})
      }catch(error){
         res.status(500).json({msg: "Erro ao remover pedido!" , 'error': error.message})
      }
   },
   
   //Permite que o usuário ou parceiro finalize o pedido. Somente o parceiro que atende ao pedido
   finalizar: (req, res, next)=>{
      let condition = {}
      condition.id = req.query.id
      condition.status = 1
      condition.removed = false

      if(req.user.loginType == 'U') condition.usuarioId = req.user.id
      else condition.parceiroId = req.user.parceiroId


      Pedido.update({
         status: 2,
         finishedAt: new Date().toString()
      },{
         where: condition
      }).then((success)=>{
         if(success[0])//Pedido foi finalizado
            res.status(200).json({msg: "Pedido finalizado com sucesso!"}) 
         else 
            throw new Error('Alteração não autorizada! O usuário logado não tem permissão ou o pedido já está em aberto.')
      })
      .catch(error=>{
         res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
      })
   },

   verificarPedidoAberto: async (req, res, next)=>{
      let nroPedidos;

      if(req.user.loginType == 'U')
         nroPedidos = await nroPedidosAbertos(req.user.id);
      else{
         if(req.query.usuarioId)
            nroPedidos = await nroPedidosAbertos(req.query.usuarioId);
         else
            return res.status(500).json({msg:"O ID do usuário é obrigatório!"})
      }  
         
      if(!nroPedidos) res.status(200).json({msg: `O usuário não possui pedidos em aberto!`})
      else res.status(500).json({msg:`O usuário possui ${nroPedidos} abertos!`})
   },
}

async function nroPedidosAbertos(usuarioId){
   let condition = {
      usuarioId: usuarioId,
      status: {[Op.or]: [0, 1]},
      removed: false
   }
   return await Pedido.count({where: condition})
}
