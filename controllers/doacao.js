let Usuario = require('../models/Usuario')
let Doacao = require('../models/Doacao')
let Solicitacao = require('../models/Solicitacao')

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
    buscarMinhasDoacoes:(req, res, next)=>{
        Doacao.findAll()
        .then(doacoes=>{
            res.status(200).json(doacoes)
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    buscarFinalizadas:(req, res, next)=>{
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
             cestaBasica: req.body.cestaBasica,
             alcoolGel: req.body.alcoolGel, 
             mascara: req.body.mascara, 
             outrosItens: req.body.outrosItens, 
             observacoes: req.body.observacoes,
             dispEntrega: req.body.dispEntrega,
             dataEntrega: req.body.dataEntrega,
             usuarioId: req.user.id})

        doacao.save()
        .then(novaDoacao =>{
            if(req.id.solicitacaoId){
                Solicitacao.update({
                    doacaoId: novaDoacao.id
                },{
                    where: {
                        id: req.body.solicitacaoId
                    }
                })
                .then(ok=>{
                    res.status(200).json(novaDoacao)
                })
                .catch(error=>{
                    res.status(500).json({msg: "Erro ao atualizar solicitação!" , err:error.message})
                }) 
            }else{
                res.status(200).json(novaDoacao)
            }
        })
        .catch(error=>{
            res.status(500).json({msg: error.message})
        })
    },
    editar: (req, res, next)=>{
        
        Doacao.update({
            cestaBasica: req.body.cestaBasica,
            alcoolGel: req.body.alcoolGel, 
            mascara: req.body.mascara, 
            outrosItens: req.body.outrosItens, 
            observacoes: req.body.observacoes,
            dispEntrega: req.body.dispEntrega,
            dataEntrega: req.body.dataEntrega
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
    alterarStatusEntrega:(req, res, next)=>{
        Doacao.update({
            statusEntrega: req.body.statusEntrega,
            motivo: req.body.motivo
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