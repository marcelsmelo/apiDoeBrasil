let Usuario = require('../models/Usuario')
let Doacao = require('../models/Doacao')
let Pedido = require('../models/Pedido')

module.exports = {
    buscarPorId:(req, res, next)=>{
        Doacao.findAll({
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            },
            include:[{
                model: Usuario
            }]
        })
        .then(doacao=>{
            res.status(200).json(doacao[0])
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    buscarTodas:(req, res, next)=>{
        Doacao.findAll({
            include:[{
                model: Usuario
            }]
        })
        .then(doacoes=>{
            res.status(200).json(doacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    minhasDoacoes:(req, res, next)=>{
        Doacao.findAll({
            where: {
                usuarioId: req.user.id
            }
        })
        .then(doacoes=>{
            res.status(200).json(doacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    finalizadas:(req, res, next)=>{
        Doacao.findAll({
            where: {
                [Op.or]: [{statusEntrega: null}, {statusEntrega: false}]
            },
            include:[{
                model: Usuario
            }]
        })
        .then(doacoes=>{
            res.status(200).json(doacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    cadastrar:(req, res, next)=>{
        let doacao = new Doacao({
                generoAlimenticio: req.body.cestaBasica,
                higienePessoal: req.body.alcoolGel, 
                artigoLimpeza: req.body.mascara, 
                mascara: req.body.outrosItens, 
                observacoes: req.body.observacoes,
                dispEntrega: req.body.dispEntrega,
                usuarioId: req.user.id})

        doacao.save()
        .then(novaDoacao =>{
            res.status(200).json(novaDoacao)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    editar: (req, res, next)=>{
        
        Doacao.update({
                generoAlimenticio: req.body.cestaBasica,
                higienePessoal: req.body.alcoolGel, 
                artigoLimpeza: req.body.mascara, 
                mascara: req.body.outrosItens, 
                observacoes: req.body.observacoes,
                dispEntrega: req.body.dispEntrega,
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            }
        })
    },
    remover:(req, res, next)=>{
        Doacao.update({
            removida: true
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            }
        })
        .then(ok=>{
            res.status(200).json({msg: "Doação removida com sucesso!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao remover doação!" , err:error.message})
        })
    },
    alterarStatus:(req, res, next)=>{
        Doacao.update({
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