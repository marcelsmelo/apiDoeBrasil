const Sequelize = require('sequelize');
let Usuario = require('../models/Usuario')
let Pedido = require('../models/Pedido')
let Doacao = require('../models/Doacao')

module.exports = {
    buscarPorId:(req, res, next)=>{
        Pedido.findOne({
            where: {
                id: req.params.id
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
            include:[{
                model: Usuario,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] }
            }]
        })
        .then(pedido=>{
            res.status(200).json(pedido)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar pedido", 'error': error.message})
        })
    },
    buscarTodos:(req, res, next)=>{
        console.log(req.user);

        Pedido.findAll({
            where: {
               
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include:[{
                model: Usuario,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] }, 
                on:{
                    id: Sequelize.where(Sequelize.col("pedido.usuarioId"), "=", Sequelize.col("usuario.id")),
                },
                where:{'cidade': req.user.cidade}
            }]
        })
        .then(pedidos=>{
            res.status(200).json(pedidos)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
        })
    },
    buscarPorStatus:(req, res, next)=>{
        Pedido.findAll({
            where: {
               status: req.params.status
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
            include:[{
                model: Usuario,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] },
                on:{
                    id: Sequelize.where(Sequelize.col("pedido.usuarioId"), "=", Sequelize.col("usuario.id")),
                },
                where:{'cidade': req.user.cidade}
            }]
        })
        .then(pedidos=>{
            res.status(200).json(pedidos)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
        })
    },
    meusPedidos:(req, res, next)=>{
        Pedido.findAll({
            where: {
                usuarioId: req.user.id
            }
        })
        .then(pedidos=>{
            res.status(200).json(pedidos)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
        })
    },
    meusPorStatus:(req, res, next)=>{
        Pedido.findAll({
            where: {
                usuarioId: req.user.id,
                status: req.params.status
            }
        })
        .then(pedidos=>{
            res.status(200).json(pedidos)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar pedidos", 'error': error.message})
        })
    },
    
    cadastrar:(req, res, next)=>{
        let pedido = new Pedido({
             generoAlimenticio: req.body.generoAlimenticio,
             higienePessoal: req.body.higienePessoal, 
             artigoLimpeza: req.body.artigoLimpeza, 
             mascara: req.body.mascara, 
             observacoes: req.body.observacoes,
             status: 0, //Marcar como não atendida
             usuarioId: req.user.id})

        pedido.save()
        .then(novoPedido =>{
            res.status(200).json(novoPedido)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao cadastrar pedido", 'error': error.message})
        })
    },
    editar: (req, res, next)=>{
        Pedido.update({
            generoAlimenticio: req.body.generoAlimenticio,
            higienePessoal: req.body.higienePessoal, 
            artigoLimpeza: req.body.artigoLimpeza, 
            mascara: req.body.mascara, 
            observacoes: req.body.observacoes,
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            }
        }).then(ok=>{
            res.status(200).json({msg: "Pedido editado com sucesso!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao editar pedido", 'error': error.message})
        })
    },
    remover:(req, res, next)=>{
        Pedido.update({
            removida: true
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            }
        })
        .then(()=>{
            res.status(200).json({msg: "Pedido removido com sucesso!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao remover pedido!" , 'error': error.message})
        })
    },
    confirmar:(req, res, next)=>{
        Pedido.update({
            status: 2
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id,
                status: 1
            }
        })
        .then(()=>{
            //Verificar se há uma doação vinculada ao pedido. Caso exista, finalizar doação
            //Se status=2 e pedidoId!= null (pedido precisa finalizar/confirmar)
            Doacao.update({
                status : 3
            }, {
                where: {
                    pedidoId: req.params.id
                }
            })
            .then(()=>{
                res.status(200).json({msg: "Doação confirmada e finalizada!"})
            })
            .catch(error=>{
                res.status(500).json({msg: "Erro ao atualizar Doação/Pedido!" , 'error':error.message})
            })
            
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
        })
    },
    alterarStatus:(req, res, next)=>{
        Pedido.update({
            status: req.body.status
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            }
        })
        .then(ok=>{
            res.status(200).json({msg: "Status da entrega atualizada!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
        })
    },
    atenderPedido:(req, res, next)=>{
        Pedido.update({
            status: 1,
            atendidoPor: req.user.id,
            atendidoPorGroup: 'P'
        },{
            where: {
                id: req.params.id
            }
        })
        .then(ok=>{
            res.status(200).json({msg: "Entrega selecionada para atendimento pelo parceiro!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
        })
    },
    finalizar:(req, res, next)=>{
        Pedido.update({
            status: 2
        },{
            where: {
                id: req.params.id
            },
            include:[{
                model: Usuario,
                attributes:['id', 'nome', 'telefone', 'group', 'parceiroId'],
                trought:{attribute:['atendidoPor']},
                where: {'parceiroId': req.user.parceiroId}
            }]
        })
        .then(ok=>{
            res.status(200).json({msg: "Entrega finalizada pelo parceiro!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
        })
    }
}
