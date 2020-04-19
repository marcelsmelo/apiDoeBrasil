let Usuario = require('../models/Usuario')
let Pedido = require('../models/Pedido')

module.exports = {
    buscarPorId:(req, res, next)=>{
        Pedido.findAll({
            where: {
                id: req.params.id
            },
            include:[{
                model: Usuario
            }]
        })
        .then(pedido=>{
            res.status(200).json(pedido[0])
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    buscarTodos:(req, res, next)=>{
        Pedido.findAll({
            include:[{
                model: Usuario
            }]
        })
        .then(pedidos=>{
            res.status(200).json(pedidos)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    naoAtendidos:(req, res, next)=>{
        Pedido.findAll({
            where: {
                status: 0
            },
            include:[{
                model: Usuario
            }]
        })
        .then(pedidos=>{
            res.status(200).json(pedidos)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    atendidos:(req, res, next)=>{
        Pedido.findAll({
            where: {
                status: 2
            },
            include:[{
                model: Usuario
            }]
        })
        .then(pedidos=>{
            res.status(200).json(pedidos)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
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
            res.status(500).json({msg: error.message})
        })
    },
    cadastrar:(req, res, next)=>{
        let pedido = new Pedido({
             generoAlimenticio: req.body.cestaBasica,
             higienePessoal: req.body.alcoolGel, 
             artigoLimpeza: req.body.mascara, 
             mascara: req.body.outrosItens, 
             observacoes: req.body.observacoes,
             usuarioId: req.user.id})

        pedido.save()
        .then(novoPedido =>{
            res.status(200).json(novoPedido)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
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
            res.status(500).json({msg: "Erro ao remover pedido!" , err:error.message})
        })
    },
    alterarStatus:(req, res, next)=>{
        Pedido.update({
            status: req.body.status
        },{
            where: {
                id: req.body.id,
                usuarioId: req.user.id
            }
        })
        .then(ok=>{
            res.status(200).json({msg: "Status da entrega atualizada!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao atualizar solicitação!" , err:error.message})
        })
    }
}