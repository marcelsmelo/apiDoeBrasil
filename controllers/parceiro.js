let Parceiro = require('../models/Parceiro')
let Usuario = require('../models/Usuario')


module.exports = {
    buscarPorId:(req, res, next)=>{
        Parceiro.findOne({
            where: {
                id: req.params.id
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        .then(parceiros=>{
            res.status(200).json(parceiros)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar parceiro", 'error': error.message})
        })
    },

    buscarTodos:(req, res, next)=>{
        Parceiro.findAll({
            where: {
               cidade: req.user.cidade
            },
            attributes: { exclude: ['createdAt', 'updatedAt']}
        })
        .then(parceiros=>{
            res.status(200).json(parceiros)
        })
        .catch(error=>{
            res.status(500).json({msg: "Erro ao buscar parceiros", 'error': error.message})
        })
    },

    cadastrar:(req, res, next)=>{
      let parceiro = new Parceiro({
        nome: req.body.nome,
        telefone: req.body.telefone,
        rua: req.body.rua, 
        numero: req.body.numero,
        bairro: req.body.bairro,
        complemento: req.body.complemento,
        estado: req.body.estado,
        cidade: req.body.cidade
      })

      parceiro.save()
      .then(novoParceiro =>{
          Usuario.update({
              group: 'R',
              parceiroId: novoParceiro.id
          },{
              where:{
                  id: req.user.id
              }
          })
          .then(ok=>{
            res.status(200).json(novoParceiro)
          })
          .catch(error=>{
            res.status(500).json({msg: "Erro ao atualizar usuário responsável", 'error': error.message})
          })
      })
      .catch(error=>{
        res.status(500).json({msg: "Erro ao cadastrar parceiro", 'error': error.message})
      })
  },
  editar: (req, res, next)=>{
      Parceiro.update({
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
              id: req.user.parceiroId
          }
      }).then(ok=>{
          res.status(200).json({msg: "Parceiro editado com sucesso!"})
      })
      .catch(error=>{
          res.status(500).json({msg: "Erro ao editar parceiro", 'error': error.message})
      })
  },
  remover:(req, res, next)=>{
    Parceiro.update({
          removido: true
      },{
          where: {
              id: req.params.id,
              id: req.user.parceiroId
          }
      })
      .then(ok=>{
          res.status(200).json({msg: "Parceiro removido com sucesso!"})
      })
      .catch(error=>{
          res.status(500).json({msg: "Erro ao remover Parceiro!" , 'error': error.message})
      })
  }
}