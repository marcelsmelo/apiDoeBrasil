let Usuario = require('../models/Usuario')
let Doacao = require('../models/Doacao')
let Pedido = require('../models/Pedido')

module.exports = {
    buscarPorId:(req, res, next)=>{
        Doacao.findOne({
            where: {
                id: req.params.id
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'usuarioId'] },
            include:[{
                model: Usuario,
                attributes: { exclude: ['createdAt', 'updatedAt', 'group'] }
            }]
        })
        .then(doacao=>{
            res.status(200).json(doacao)
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
        let status;
        //0 - Aguardando Entrega; 1 - Aguardando REtirada; 2- Aguardando Confirmação; 3 - Finalizada
        if(req.body.pedidoId){//Usuário vinculou a doação com um pedido, deve realizar a entrega
            status = 0
            req.body.dispEntrega = true;
        }else{//Se a doação não for vinculada a um pedido
            //Realizar o usuário for realizar a entrega, deve ter selecionado um parceiro e um ponto de entrega
            if(req.body.dispEntrega && req.body.parceiroId && req.body.pontoEntregaId) status = 0 
            else if(!req.body.dispEntrega) status = 1 //Parceiro irá retirar a doação na casa do doador
            else { //Não foi selecionado um parceiro
                res.status(500).json({msg:"Erro: Selecione um parceiro e ponto de entrega para entrega da doação", 'error': null})
                return;
            }
        }
        
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
            if(req.body.pedidoId && req.body.pedidoId != 0){
                Pedido.update({
                    status: 1,
                    atendidoPor: req.user.id,
                    atendidoPorGroup: 'U'
                },{
                    where:{
                        id: req.body.pedidoId,
                        status: 0
                    }
                })
                .then(ok=>{//Tudo OK
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
    editar: (req, res, next)=>{
        Doacao.update({
                generoAlimenticio: req.body.generoAlimenticio,
                higienePessoal: req.body.higienePessoal, 
                artigoLimpeza: req.body.artigoLimpeza, 
                mascara: req.body.mascara, 
                observacoes: req.body.observacoes,
                dispEntrega: req.body.dispEntrega,
                parceiroId: req.body.parceiroId,
                pontoEntregaId: req.body.pontoEntregaId
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
    confirmar:(req, res, next)=>{
        //Ao finalizar uma doação, o parceiro ou pedido vinculado deve confirmar a entrega
        // Assim o status vai para 2 - Aguardando confirmação
        //Se status=2 e pedidoId=null (parceiro precisa confirmar)
        //Se status=2 e pedidoId!= null (pedido precisa finalizar/confirmar)
        Doacao.update({
            status: 2
        },{
            where: {
                id: req.params.id,
                usuarioId: req.user.id
            }
        })
        .then(()=>{
            res.status(200).json({msg: "Doação confirmada e aguardando finalização!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
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
    },
    finalizar:(req, res, next)=>{
        //O parceiro pode acusar entrega ou retirada e finalizar a doação
        Doacao.update({
            status: 3
        },{
            where: {
                id: req.params.id,
                parceiroId: req.user.parceiroId
            }
        })
        .then(()=>{
            res.status(200).json({msg: "Doação finalizada com sucesso!"})
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao atualizar solicitação!" , 'error':error.message})
        })
    }
}