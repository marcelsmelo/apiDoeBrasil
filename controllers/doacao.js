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
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
            include:[{
                model: Usuario,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] }
            }]
        })
        .then(doacao=>{
            res.status(200).json(doacao[0])
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao cadastrar doação", 'error': error.message})
        })
    },
    buscarTodas:(req, res, next)=>{
        Doacao.findAll({
            where: {},
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
            include:[{
                model: Usuario,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] }
            }]
        })
        .then(doacoes=>{
            res.status(200).json(doacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar doações", 'error': error.message})
        })
    },
    buscarPorStatus:(req, res, next)=>{
        Doacao.findAll({
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
        .then(doacoes=>{
            res.status(200).json(doacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar doações", 'error': error.message})
        })
    },
    minhasDoacoes:(req, res, next)=>{
        Doacao.findAll({
            where: {
                usuarioId: req.user.id
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
            include:[{
                model: Usuario,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] }
            }]
        })
        .then(doacoes=>{
            res.status(200).json(doacoes)
        })
        .catch(error=>{
            res.status(500).json({msg:"Erro ao buscar doações", 'error': error.message})
        })
    },
    minhasPorStatus:(req, res, next)=>{
        Doacao.findAll({
            where: {
                usuarioId: req.user.id,
                status: req.params.status
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
            include:[{
                model: Usuario,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] }
            }]
        })
        .then(doacoes=>{
            res.status(200).json(doacoes)
        })
        .catch(error=>{
            res.status(500).json({msg:"Erro ao buscar doações", 'error': error.message})
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
                usuarioId: req.user.id,
                pedidoId: req.body.pedidoId ? req.body.pedidoId : null
            })

        doacao.save()
        .then(novaDoacao =>{
            res.status(200).json(novaDoacao)
        })
        .catch(error=>{
            res.status(500).json({msg:"Erro ao cadastrar doação", 'error': error.message})
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
        .then(ok =>{
            res.status(200).json({msg:"Doação editada com sucesso!"})
        })
        .catch(error=>{
            res.status(500).json({msg:"Erro ao editar doação", 'error': error.message})
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
            res.status(500).json({msg: "Erro ao remover doação!" , 'error' :error.message})
        })
    },
    alterarStatus:(req, res, next)=>{
        Doacao.update({
            status: req.body.status
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            }
        })
        .then(ok=>{
            res.status(200).json({msg: "Status da doação atualizada!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
        })
    }
}