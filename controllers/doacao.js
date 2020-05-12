let Usuario = require('../models/Usuario')
let Doacao = require('../models/Doacao')
let Pedido = require('../models/Pedido')
let Parceiro = require('../models/Parceiro')
let PontoEntrega = require('../models/PontoEntrega')

module.exports = {
   //Busca doação por ID
    buscarPorId: async (req, res, next)=>{
      try{
         let doacao = await Doacao.findOne({
            where: {
               id: req.params.id
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
            include:[{
               model: Usuario,
               attributes: { exclude: ['createdAt', 'updatedAt', 'group'] }
            }]
         })
         res.status(200).json(doacao)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar doação", 'error': error.message})
      }
    },
    //Busca todas doações criadas pelo Usuario ou vinculadas ao Parceiro
    buscarTodas: async (req, res, next)=>{
       let condition = {}
       if(req.user.group == 'U') condition.usuarioId = req.user.id
       else condition.parceiroId = req.user.parceiroId

       try{
         let doacoes = await Doacao.findAll({
            where: condition,
            attributes: {exclude: ['createdAt', 'updatedAt', 'usuarioId']},
            include:[{
                  model: Pedido,
                  attributes: { exclude: ['createdAt', 'updatedAt'] }
               },{   
                  model: Parceiro,
                  attributes: { exclude: ['createdAt', 'updatedAt'] } 
               },{
                  model: PontoEntrega,
                  attributes: { exclude: ['createdAt', 'updatedAt'] } 
            }]
         })
         res.status(200).json(doacoes)
      }catch (error){
         res.status(500).json({msg: "Erro ao buscar doações", 'error': error.message})
      }
   },
   //Busca as Doações pelo seu Status criadas pelo Usuário logado 
   buscarPorStatus: async (req, res, next)=>{
      let condition = {}
      condition.status = req.params.status 

      if(req.user.group == 'U') condition.usuarioId = req.user.id
      else condition.parceiroId = req.user.parceiroId

      try{
          let doacoes = await Doacao.findAll({
             where: condition,
             attributes: {exclude: ['createdAt', 'updatedAt', 'usuarioId']},
             include:[{
                model: Usuario,
                required:true,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] },
                where:{'cidade': req.user.cidade}
             }]
          })
          res.status(200).json(doacoes)
       }catch (error){
          res.status(500).json({msg: "Erro ao buscar doações", 'error': error.message})
       }
   },
   //Busca todas doações disponíveis para o Parceiro
   disponivelParceiro: async (req, res, next)=>{
      try{
         let doacoes = await Doacao.findAll({
            where: {
               status: 1,
               parceiroId: null
            },
            attributes: {exclude: ['createdAt', 'updatedAt', 'usuarioId']},
            include:[{
               model: Usuario,
               required:true,
               attributes: { exclude: ['createdAt', 'updatedAt', 'group'] },
                  where:{'cidade': req.user.cidade}
            }]
         })
         res.status(200).json(doacoes)
      }catch (error){
         res.status(500).json({msg: "Erro ao buscar doações", 'error': error.message})
      }
   },
    //Cadastra uma nova Doação vinculada ao usuário Logado
    cadastrar: (req, res, next)=>{
      let status;
      //0 - Aguardando Entrega; 1 - Aguardando Retirada; 2- Aguardando Confirmação; 3 - Finalizada
      if(req.body.pedidoId){//Usuário vinculou a doação com um pedido, deve realizar a entrega
         status = 0
         req.body.dispEntrega = true;
         req.body.parceiroId = null,
         req.body.pontoEntregaId = null;
      }else{//Se a doação não for vinculada a um pedido
         //Realizar o usuário for realizar a entrega, deve ter selecionado um parceiro e um ponto de entrega
         if(req.body.dispEntrega && req.body.parceiroId && req.body.pontoEntregaId) status = 0 
         else if(!req.body.dispEntrega) status = 1 //Parceiro irá retirar a doação na casa do doador
         else { //Não foi selecionado um parceiro
            res.status(500).json({msg:"Erro: Selecione um parceiro e ponto de entrega para entrega da doação", 'error': null})
            return;
         }
      }
      //TODO: Verificar dados iguais ao pedido, caso vinculado
      let doacao = new Doacao({
         generoAlimenticio: req.body.generoAlimenticio,
         higienePessoal: req.body.higienePessoal, 
         artigoLimpeza: req.body.artigoLimpeza, 
         mascara: req.body.mascara, 
         observacoes: req.body.observacoes,
         dispEntrega: req.body.dispEntrega,
         usuarioId: req.user.id,
         pedidoId: req.body.pedidoId,
         status: status,
         parceiroId: req.body.parceiroId,
         pontoEntregaId: req.body.pontoEntregaId
      })

      doacao.save()
      .then(novaDoacao =>{
         //Se for uma doação vinculada ao pedido, deve atualizar o status do pedido
         if(req.body.pedidoId){
            Pedido.update({
               status: 1,
               atendidoPorUsuario: req.user.id
            },{
               where:{
                  id: req.body.pedidoId,
                  status: 0
               }
            })
            .then(()=>{//Tudo OK
               res.status(200).json(novaDoacao)
            })
            .catch(error=>{//Erro ao atualizar o pedido
               res.status(500).json({msg:"Erro ao atualizar dados de pedido/doação", 'error': error.message})
            })
         }else{
            //Doação não vinculada a pedido
            res.status(200).json(novaDoacao)
         }      
      })
      .catch(error=>{//Erro ao cadastrar doação
         res.status(500).json({msg:"Erro ao cadastrar doação", 'error': error.message})
      })
   },
   //Permite que um usuário edite uma doação salva
    editar: async (req, res, next)=>{
      try{//TODO: Verificar quais dados podem ser atualizados, verificar igual cadastrar???

         let doacao = await Doacao.findOne({
            where: {
               id: req.params.id,
               usuarioId: req.user.id
            }
         })

         if(!doacao) return res.status(403).json({msg: 'Alteração não autorizada! O usuário logado não tem permissão para fazer essa operação.', error: null})
         if(doacao.status == 2 || doacao.status == 3) throw new Error('Alteração não autorizada! A doação já foi finalizada.')

         if(doacao.pedidoId){
            doacao.observacoes = req.body.observacoes
            await doacao.save()
            res.status(200).json({msg:"Doação editada com sucesso!"})
         }else{//TODO: confirmar retirada pelo parceiro?
            doacao.generoAlimenticio = req.body.generoAlimenticio
            doacao.higienePessoal = req.body.higienePessoal
            doacao.artigoLimpeza = req.body.artigoLimpeza
            doacao.mascara = req.body.mascara
            doacao.observacoes = req.body.observacoes
            doacao.dispEntrega = req.body.dispEntrega
            doacao.parceiroId = req.body.parceiroId
            doacao.pontoEntregaId = req.body.pontoEntregaId
            await doacao.save()
            res.status(200).json({msg:"Doação editada com sucesso!"})
         }
      }catch(error){
         res.status(500).json({msg:"Erro ao editar doação", 'error': error.message})
      }
   },
   remover:async (req, res, next)=>{//TODO: Ao remover uma doacao, atualizar o pedido para status=0
      try{
         let doacao = await Doacao.findOne({
            where:{
               id: req.params.id,
               usuarioId: req.user.id
            }
         })

         if(!doacao) return res.status(403).json({msg:'Alteração não autorizada! O usuário logado não tem permissão para fazer essa operação.', error: null})
         if(doacao.status == 2 || doacao.status == 3) throw new Error('Alteração não autorizada! A doação já foi finalizada.')

         doacao.removida = true;
         
         if(doacao.pedidoId){
            let pedido = await Pedido.findOne({
               where:{
                  id: doacao.pedidoId,
                  atendidoPorUsuario: req.user.id
               }
            })

            if(!pedido) throw new Error('Erro ao atualizar Pedido')
            pedido.status = 0
            pedido.atendidoPorUsuario = null
            await pedido.save()
            await doacao.save()
            res.status(200).json({msg: "Doação removida com sucesso!"})
         }else{
            await doacao.save()
            res.status(200).json({msg: "Doação removida com sucesso!"})
         }

         // let success = await Doacao.update({
         //          removida: true
         //       },{
         //       where: {
         //           id: req.params.id,
         //           usuarioId: req.user.id
         //       }
         //    })
         // if(success[0])  res.status(200).json({msg: "Doação removida com sucesso!"})
         // else throw new Error('Alteração não autorizada! O usuário logado não tem permissão para fazer essa operação.')
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

      condition.id = req.params.id
      
      if(req.user.group == 'U'){
         data.status = 2
         condition.usuarioId = req.user.id
      }else{
         data.status = 3
         condition.parceiroId = req.user.parceiroId
      }

      try{
         let success = await Doacao.update(data,{
                  where: condition
               })
         if(success[0]) res.status(200).json({msg: "Doação confirmada e aguardando finalização!"})
         else return res.status(403).json({msg:'Alteração não autorizada! O usuário logado não tem permissão para fazer essa operação.', error: null})
         
      }catch(error){
         res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
      }
   },
   //Seleciona as doações para retirada pelo Parceiro Logado
   selecionarParaRetirada: async (req, res, next)=>{
      //Doações marcadas para dispEntrega=false e que não definiram um parceiro específico
      //O parceiro terá oportunidade de selecionar a doação para buscá-la
      try{
         let success = await Doacao.update({
               status: 1,
               parceiroId: req.user.parceiroId
            },{
            where: {
               id: req.params.id
            }
         })
         if(!success[0]) throw new Error('Doação não atualizada!')
         res.status(200).json({msg: "Doação selecionada para retirada pelo parceiro!"})
      }catch(error){
         res.status(500).json({msg: "Erro ao atualizar Doação!" , 'error':error.message})
      }
    },

   //Permite que o superAdmin altere o status de qualquer Doação
   alterarStatus: async (req, res, next)=>{
      try{
         await Doacao.update({
            status: req.body.status
         },{
            where: {
               id: req.params.id,
               usuarioId: req.user.id
            }
         })

         res.status(200).json({msg: "Status da doação atualizada!"})
      }catch(error){
          res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
      }
   },
}