const Sequelize = require('sequelize');
let Usuario = require('../models/Usuario')
let Pedido = require('../models/Pedido')
let Doacao = require('../models/Doacao')
const Op = Sequelize.Op

module.exports = {
   //Busca um pedido por ID
   buscarPedidos: async (req, res, next)=>{
      let condition = {
         removed: false
      }

      //Buscar por ID
      if(req.query.id)
         condition.id = req.query.id 
      else{//Em caso de BuscarTodos, busca os pedidos vinculados aos usuários e/ou Parceiros logados
         
         if(req.user.group == 'U') condition.usuarioId = req.user.id; //Usuário comum - Busca todos pedidos do usuário
         else if(req.user.group == 'P') condition.parceiroId = req.user.parceiroId; //Parceiro - Busca todos pedidos associados ao parceiro
         
         //Verifica também a busca por status
         if(req.query.status && (req.query.status == 0 || req.query.status == 1 || req.query.status == 2)){
            condition.status = req.query.status
            //Busca de todos pedidos em aberto (status = 0 ) na cidade do parceiro logado
            if(req.user.group == 'P' && req.query.status == 0){
               condition.parceiroId = null;
            } 
         }
            
      } 
      
      try{
         let pedidos = await Pedido.findAll({
            where: condition,
            attributes: ['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'outros', 'observacoes', 'status'],
            include:[{
                  model: Usuario,
                  required: true,
                  attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
                  on:{
                     id: Sequelize.where(Sequelize.col("pedido.usuarioId"), "=", Sequelize.col("usuario.id"))
                  },
                  where:{'cidade': req.user.cidade}
               },{
                  model: Usuario,
                  as: 'cadastradoPor',
                  attributes: ['id', 'nome'],
                  on:{
                     id: Sequelize.where(Sequelize.col("pedido.cadastradoPorId"), "=", Sequelize.col("cadastradoPor.id"))
                  },
               },{
                  model: Usuario,
                  as: 'parceiro',
                  attributes: ['id', 'nome', 'cpfCnjp', 'email'],
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

   // //Buscar todos os Pedidos abertos pelo Usuário Logado ou atendidos pelo Parceiro Logado
   // buscarTodos: async (req, res, next)=>{
   //    let condition={}
   //    condition.removed = false
      
   //    if(req.user.group == 'U') condition.usuarioId = req.user.id
   //    else condition.atendidoPorParceiroId = req.user.parceiroId

   //    try{
   //       let pedidos = await Pedido.findAll({
   //          where: condition,
   //          attributes: ['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'mascara', 'observacoes', 'status'],
   //       })
   //       res.status(200).json(pedidos)
   //    }catch(error){
   //       res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
   //    }
   // },

   //Busca os pedidos por Status criados pelo usuário logado ou atendidos pelo Parceiro Logado
   // buscarPorStatus: async (req, res, next)=>{
   //    let condition={}
   //    condition.status = req.params.status
   //    condition.removed = false

   //    if(req.user.group == 'U') condition.usuarioId = req.user.id
   //    else condition.atendidoPorParceiroId = req.user.parceiroId

   //    try{
   //       let pedidos = await Pedido.findAll({
   //          where: condition,
   //          //attributes: ['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'mascara', 'observacoes', 'status'],
   //          include:[{
   //             model: Usuario,
   //             required: true,
   //             attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
   //             on:{
   //                id: Sequelize.where(Sequelize.col("pedido.usuarioId"), "=", Sequelize.col("usuario.id")),
   //             }},{
   //             model: Usuario,
   //             as: 'atendidoPorUsuario',
   //             //attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
   //             },{
   //             model: Parceiro,
   //             as: 'atendidoPorParceiro',
   //            // attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
   //          }]
   //       })
   //       res.status(200).json(pedidos)
   //    }catch(error){
   //       res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
   //    }
   // },

   //Busca os pedidos em aberto na cidade do usuário logado (status=0) excluindo os abertos pelo usuário logado
   // naoAtendidos: async (req, res, next)=>{
   //    let condition = {}
   //    condition.status = 0
   //    condition.removed = false

   //    if(req.user.group == 'U') condition.usuarioId = {[Op.ne]: req.user.id}

   //    try{
   //       let pedidos = await Pedido.findAll({
   //          where: condition,
   //          attributes:['id', 'generoAlimenticio', 'higienePessoal', 'artigoLimpeza', 'mascara', 'observacoes', 'status'],
   //          include:[{
   //             model: Usuario,
   //             required: true,
   //             attributes: ['rua', 'bairro', 'numero', 'complemento','cidade', 'estado'], 
   //             on:{
   //                 id: Sequelize.where(Sequelize.col("pedido.usuarioId"), "=", Sequelize.col("usuario.id")),
   //             },
   //             where:{'cidade': req.user.cidade}
   //         }]
   //       })
   //       res.status(200).json(pedidos)
   //    }catch(error){
   //       res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
   //    }
   // },
   //Cadastra um novo pedido vinculado ao usuário logado
   cadastrar: async (req, res, next)=>{
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
      if(req.user.group == 'P' && req.body.usuarioId){
         return res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': 'O Pedido deve ser vinculado a um usuário!'})
      }

      let pedido = new Pedido({
            generoAlimenticio: req.body.generoAlimenticio,
            higienePessoal: req.body.higienePessoal, 
            artigoLimpeza: req.body.artigoLimpeza, 
            outros: req.body.outros, 
            observacoes: req.body.observacoes,
            status: 0, //Marcar como não atendida
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

   //Edita um pedido pertencente ao usuário logado
   editar: async (req, res, next)=>{
      let condition = {
         id: req.query.id,
         removed: false
      }

      if(req.user.group = 'U') condition.usuarioId = req.user.id;
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

      if(req.user.group = 'U') condition.usuarioId = req.user.id;
      else condition.parceiroId = req.user.parceiroId;

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

   //Permite que o usuário ou parceiro finalize o pedido. Somente o parceiro que atende ao pedido
   finalizar: (req, res, next)=>{
      let condition = {}
      condition.id = req.query.id
      condition.status = 1
      condition.removed = false

      if(req.user.group == 'U') condition.usuarioId = req.user.id
      else condition.parceiroId = req.user.parceiroId


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



   //Permite que o ADMIN altere o status de qualquer Pedido
   // alterarStatus: async (req, res, next)=>{
   //    try{
   //       await Pedido.update({
   //          status: req.body.status
   //       },{
   //           where: {
   //             id: req.params.id,
   //             removed: false
   //          }
   //       })
   //       res.status(200).json({msg: "Status da entrega atualizada!"})
   //    }catch(error){
   //       res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
   //    }
   // },

   verificarPedidoAberto: async (req, res, next)=>{//TODO: Documentar
      let nroPedidos = await nroPedidosAbertos(req.user.id);
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
