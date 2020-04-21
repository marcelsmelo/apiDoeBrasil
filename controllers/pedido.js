let Usuario = require('../models/Usuario')
let Pedido = require('../models/Pedido')

module.exports = {
    buscarPorId:(req, res, next)=>{
        Pedido.findAll({
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
            res.status(200).json(pedido[0])
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar pedido", 'error': error.message})
        })
    },
    buscarTodos:(req, res, next)=>{
        Pedido.findAll({
            where: {
               
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
            include:[{
                model: Usuario,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] },
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
            generoAlimenticio: req.body.cestaBasica,
            higienePessoal: req.body.alcoolGel, 
            artigoLimpeza: req.body.mascara, 
            mascara: req.body.outrosItens, 
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
        .then(ok=>{
            res.status(200).json({msg: "Pedido removido com sucesso!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao remover pedido!" , 'error': error.message})
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
    }
}
