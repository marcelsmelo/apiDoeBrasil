let Usuario = require('../models/Usuario')
let Solicitacao = require('../models/Solicitacao')

module.exports = {
    buscarPorId:(req, res, next)=>{
        Solicitacao.findAll({
            where: {
                id: req.params.id
            },
            include:[{
                model: Usuario
            }]
        })
        .then(solicitacao=>{
            res.status(200).json(solicitacao[0])
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    buscarTodas:(req, res, next)=>{
        Solicitacao.findAll({
            include:[{
                model: Usuario
            }]
        })
        .then(solicitacoes=>{
            res.status(200).json(solicitacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    buscarTodasNaoAtendidas:(req, res, next)=>{
        Solicitacao.findAll({
            where: {
                [Op.or]: [{statusEntrega: null}, {statusEntrega: false}]
            },
            include:[{
                model: Usuario
            }]
        })
        .then(solicitacoes=>{
            res.status(200).json(solicitacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    buscarTodasAtendidas:(req, res, next)=>{
        Solicitacao.findAll({
            where: {
                statusEntrega: true
            },
            include:[{
                model: Usuario
            }]
        })
        .then(solicitacoes=>{
            res.status(200).json(solicitacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    buscarMinhasSolicitacoes:(req, res, next)=>{
        Solicitacao.findAll({
            where: {
                usuarioId: req.user.id
            }
        })
        .then(solicitacoes=>{
            res.status(200).json(solicitacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    cadastrar:(req, res, next)=>{
        let solicitacao = new Solicitacao({
             cestaBasica: req.body.cestaBasica,
             alcoolGel: req.body.alcoolGel, 
             mascara: req.body.mascara, 
             outrosItens: req.body.outrosItens, 
             observacoes: req.body.observacoes,
             usuarioId: req.user.id})

        solicitacao.save()
        .then(novaSolicitacao =>{
            res.status(200).json(novaSolicitacao)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    editar: (req, res, next)=>{
        
        Solicitacao.update({
            cestaBasica: req.body.cestaBasica,
            alcoolGel: req.body.alcoolGel, 
            mascara: req.body.mascara, 
            outrosItens: req.body.outrosItens, 
            observacoes: req.body.observacoes
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            }
        })
    },
    remover:(req, res, next)=>{
        Solicitacao.update({
            removida: true
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            }
        })
        .then(ok=>{
            res.status(200).json({msg: "Solicitacao removida com sucesso!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao remover solicitação!" , err:error.message})
        })
    },
    alterarStatusEntrega:(req, res, next)=>{
        Solicitacao.update({
            statusEntrega: req.body.status
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