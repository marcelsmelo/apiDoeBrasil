let PontoEntrega = require('../models/PontoEntrega')
const Parceiro = require('../models/Parceiro');

module.exports = {
    buscarPorId:(req, res, next)=>{
      PontoEntrega.findOne({
            where: {
                id: req.params.id
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'parceiroId']},
            include:[{
                model: Parceiro,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        })
        .then(pontosEntrega=>{
            res.status(200).json(pontosEntrega)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar Pontos de Entrega", 'error': error.message})
        })
    }, 
    buscarTodosPorParceiro:(req, res, next)=>{
        PontoEntrega.findAll({
            where: {
              cidade: req.user.cidade,
              parceiroId: req.params.parceiroId
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'parceiroId'] },
            include:[{
                model: Parceiro,
                attributes: ['id', 'nome', 'telefone']
            }]
        })
        .then(pontosEntrega=>{
            res.status(200).json(pontosEntrega)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar Pontos de Entrega", 'error': error.message})
        })
    },
    buscarTodos:(req, res, next)=>{
        PontoEntrega.findAll({
            where: {
              cidade: req.user.cidade
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'parceiroId'] },
            include:[{
                model: Parceiro,
                attributes: ['id', 'nome', 'telefone']
            }]
        })
        .then(pontosEntrega=>{
            res.status(200).json(pontosEntrega)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar Pontos de Entrega", 'error': error.message})
        })
    },
    meusPontosEntrega:(req, res, next)=>{
        PontoEntrega.findAll({
            where: {
              parceiroId: req.user.parceiroId
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'parceiroId'] }
        })
        .then(pontosEntrega=>{
            res.status(200).json(pontosEntrega)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar Pontos de Entrega", 'error': error.message})
        })
    }, 
    cadastrar:(req, res, next)=>{
      let pontoEntrega = new PontoEntrega({
        nome: req.body.nome,
        telefone: req.body.telefone,
        rua: req.body.rua, 
        numero: req.body.numero,
        bairro: req.body.bairro,
        complemento: req.body.complemento,
        estado: req.body.estado,
        cidade: req.body.cidade,
        parceiroId: req.user.parceiroId
      })

      pontoEntrega.save()
      .then(novoPontoEntrega =>{
          res.status(200).json(novoPontoEntrega)
      })
      .catch(error=>{
          res.status(500).json({msg: "Erro ao cadastrar Ponto de Entrega", 'error': error.message})
      })
  },
  editar: (req, res, next)=>{
    PontoEntrega.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        rua: req.body.rua, 
        numero: req.body.numero,
        bairro: req.body.bairro,
        complemento: req.body.complemento,
        estado: req.body.estado,
        cidade: req.body.cidade
      },{
          where: {
              id: req.params.id,
              parceiroId: req.user.parceiroId
          }
      }).then(ok=>{
          res.status(200).json({msg: "Ponto de Entrega editado com sucesso!"})
      })
      .catch(error=>{
          res.status(500).json({msg: "Erro ao editar Ponto de Entrega", 'error': error.message})
      })
  },
  remover:(req, res, next)=>{
      PontoEntrega.update({
          removido: true
      },{
          where: {
              id: req.params.id,
              parceiroId: req.user.parceiroId
          }
      })
      .then(ok=>{
          res.status(200).json({msg: "Ponto de Entrega removido com sucesso!"})
      })
      .catch(error=>{
          res.status(500).json({msg: "Erro ao remover Ponto de Entrega!" , 'error': error.message})
      })
  },
}