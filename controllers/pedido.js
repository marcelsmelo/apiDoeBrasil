const Sequelize = require('sequelize');
let Usuario = require('../models/Usuario')
let Pedido = require('../models/Pedido')
let Parceiro = require('../models/Parceiro')
let Doacao = require('../models/Doacao')
const Op = Sequelize.Op

module.exports = {
   //Busca um pedido por ID
   buscarPorId: async (req, res, next)=>{
      try{
         let pedido = await Pedido.findOne({
            where: {
               id: req.params.id,
               removed: false
            },
            attributes: ['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'mascara', 'observacoes', 'status'],
            include:[{
                  model: Usuario,
                  required: true,
                  attributes: { exclude: ['createdAt', 'updatedAt', 'group', 'parceiroId'] },
                  on:{
                     id: Sequelize.where(Sequelize.col("pedido.usuarioId"), "=", Sequelize.col("usuario.id")),
                  }},{
                  model: Usuario,
                  as: 'atendidoPorUsuario',
                  attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
                  },{
                  model: Parceiro,
                  as: 'atendidoPorParceiro',
                  attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
            }]
         })
         res.status(200).json(pedido)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar pedido", 'error': error.message})
      }
   },

   //Buscar todos os Pedidos abertos pelo Usuário Logado ou atendidos pelo Parceiro Logado
   buscarTodos: async (req, res, next)=>{
      let condition={}
      condition.removed = false
      
      if(req.user.group == 'U') condition.usuarioId = req.user.id
      else condition.atendidoPorParceiroId = req.user.parceiroId

      try{
         let pedidos = await Pedido.findAll({
            where: condition,
            attributes: ['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'mascara', 'observacoes', 'status'],
         })
         res.status(200).json(pedidos)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
      }
   },

   //Busca os pedidos por Status criados pelo usuário logado ou atendidos pelo Parceiro Logado
   buscarPorStatus: async (req, res, next)=>{
      let condition={}
      condition.status = req.params.status
      condition.removed = false

      if(req.user.group == 'U') condition.usuarioId = req.user.id
      else condition.atendidoPorParceiroId = req.user.parceiroId

      try{
         let pedidos = await Pedido.findAll({
            where: condition,
            attributes: ['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'mascara', 'observacoes', 'status'],
            include:[{
               model: Usuario,
               required: true,
               attributes: ['rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
               on:{
                  id: Sequelize.where(Sequelize.col("pedido.usuarioId"), "=", Sequelize.col("usuario.id")),
              }
            }]
         })
         res.status(200).json(pedidos)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
      }
   },

   //Busca os pedidos em aberto na cidade do usuário logado (status=0) excluindo os abertos pelo usuário logado
   naoAtendidos: async (req, res, next)=>{
      let condition = {}
      condition.status = 0
      condition.removed = false

      if(req.user.group == 'U') condition.usuarioId = {[Op.ne]: req.user.id}

      try{
         let pedidos = await Pedido.findAll({
            where: condition,
            attributes:['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'mascara', 'observacoes', 'status'],
            include:[{
               model: Usuario,
               required: true,
               attributes: ['rua', 'bairro', 'numero', 'complemento','cidade', 'estado'], 
               on:{
                   id: Sequelize.where(Sequelize.col("pedido.usuarioId"), "=", Sequelize.col("usuario.id")),
               },
               where:{'cidade': req.user.cidade}
           }]
         })
         res.status(200).json(pedidos)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
      }
   },
   //Cadastra um novo pedido vinculado ao usuário logado
   cadastrar: async (req, res, next)=>{
      if(!req.body.generoAlimenticio && !req.body.higienePessoal &&
         !req.body.artigoLimpeza && !req.body.mascara){
            res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': 'Solicite pelo menos um material!'})
            return;
      }

      let pedido = new Pedido({
            generoAlimenticio: req.body.generoAlimenticio,
            higienePessoal: req.body.higienePessoal, 
            artigoLimpeza: req.body.artigoLimpeza, 
            mascara: req.body.mascara, 
            observacoes: req.body.observacoes,
            status: 0, //Marcar como não atendida
            usuarioId: req.user.id})

      try{
         let novoPedido = await pedido.save()
         res.status(200).json(novoPedido)
      }catch(error){
         res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': error.message})
      }
   },
   //Edita um pedido pertencente ao usuário logado
   editar: async (req, res, next)=>{
      try{
         let pedido = await Pedido.findOne({
            where: {
               id: req.params.id,
               usuarioId: req.user.id,
               removed: false
            }
         })
   
         if(!pedido)
            return res.status(403).json({msg: 'Alteração não autorizada! O usuário logado não tem permissão para realizar essa operação', error: null});
         
         if(pedido.status == 0){
            pedido.generoAlimenticio = req.body.generoAlimenticio
            pedido.higienePessoal = req.body.higienePessoal
            pedido.artigoLimpeza = req.body.artigoLimpeza
            pedido.mascara = req.body.mascara
            pedido.observacoes = req.body.observacoes
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
      try{
         let success = await Pedido.update({
            removed: true
         },{
            where: {
               id: req.params.id,
               usuarioId: req.user.id,
               status: 0
            }
         })
         
         if(success[0]) res.status(200).json({msg: "Pedido removido com sucesso!"})
        else throw new Error('Alteração não autorizada! O usuário logado não tem permissão ou o pedido já foi selecionado para atendimento.')
      }catch(error){
         res.status(500).json({msg: "Erro ao remover pedido!" , 'error': error.message})
      }
   },
   //Permite que o usuário ou parceiro finalize o pedido. Somente o parceiro que atende ao pedido
   finalizar: (req, res, next)=>{
      let condition = {}
      condition.id = req.params.id
      condition.status = 1
      condition.removed = false

      if(req.user.group == 'U') condition.usuarioId = req.user.id
      else condition.atendidoPorParceiroId = req.user.parceiroId


      Pedido.update({
         status: 2,
         finishedAt: new Date().toString()
      },{
         where: condition
      }).then((success)=>{
         //Verificar se há uma doação vinculada ao pedido. Caso exista, finalizar doação
         //Se status=2 e pedidoId!= null (pedido precisa finalizar/confirmar)
         if(success[0]){//Pedido foi finalizado
            Doacao.update({
               status : 3,
               finishedAt: new Date().toString()
            }, {
               where:{pedidoId: req.params.id}
            })
            .then(()=>{
               res.status(200).json({msg: "Doação confirmada e finalizada!"})
            })
            .catch(error=>{
               res.status(500).json({msg: "Erro ao atualizar Doação/Pedido!" , 'error':error.message})
            })      
         }
        else throw new Error('Alteração não autorizada! O usuário logado não tem permissão ou o pedido já está em aberto.')
      })
      .catch(error=>{
         res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
      })
   },
   //Permite que o Parceiro logado selecione um pedido para atendimento
   selecionarParaAtender: async (req, res, next)=>{
      try{
         let success = await Pedido.update({
            status: 1,
            atendidoPorParceiroId: req.user.parceiroId,
            answeredAt: new Date().toString()
         },{
            where: {
               id: req.params.id,
               status: 0,
               removed: false
            }
         })
         if(success[0]) res.status(200).json({msg: "Entrega selecionada para atendimento pelo parceiro!"})
         else throw new Error('Alteração não autorizada!')
         
      }catch(error){
         res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
      }
   },

   //Permite que o ADMIN altere o status de qualquer Pedido
   alterarStatus: async (req, res, next)=>{
      try{
         await Pedido.update({
            status: req.body.status
         },{
             where: {
               id: req.params.id,
               removed: false
            }
         })
         res.status(200).json({msg: "Status da entrega atualizada!"})
      }catch(error){
         res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
      }
   },
}
