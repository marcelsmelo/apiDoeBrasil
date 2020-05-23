let PontoEntrega = require('../models/PontoEntrega')
const Parceiro = require('../models/Parceiro');

module.exports = {
   //Busca um ponto de entrega pelo ID informado
   buscarPorId: async (req, res, next)=>{
      try{
         let pontosEntrega = await PontoEntrega.findOne({
            where: {
               id: req.params.id, 
               removed: false
            },
            attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
            include:[{
               model: Parceiro,
               attributes: ['id', 'nome', 'telefone']
            }]
         })
         res.status(200).json(pontosEntrega)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar Pontos de Entrega", 'error': error.message})
      }
    },
    //Busca todos os pontos de entrega do ID do parceiro, informado por parâmetro
    buscarTodosPorParceiro: async (req, res, next)=>{
      try{
         let pontosEntrega = await PontoEntrega.findAll({
            where: {
               cidade: req.user.cidade,
               parceiroId: req.params.parceiroId,
               removed: false
            },
            attributes:['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
            include:[{
               model: Parceiro,
               attributes: ['id', 'nome', 'telefone']
            }]
         })
         res.status(200).json(pontosEntrega)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar Pontos de Entrega", 'error': error.message})
      }
    },
    //Busca todos os pontos de entrega da cidade
    buscarTodos: async (req, res, next)=>{
      try{
         let pontosEntrega = await PontoEntrega.findAll({
            where: {
               cidade: req.user.cidade,
               removed: false
            },
            attributes:['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado'],
            include:[{
               model: Parceiro,
               attributes: ['id', 'nome', 'telefone']
            }]
        })
        res.status(200).json(pontosEntrega)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar Pontos de Entrega", 'error': error.message})
      }
    },

    //Busca todos os pontos de entrega do parceiro logado
    meusPontosEntrega: async (req, res, next)=>{
      try{
         let pontosEntrega = await PontoEntrega.findAll({
            where: {
               parceiroId: req.user.parceiroId,
               removed: false
            },
            attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado']
         })
        
         res.status(200).json(pontosEntrega)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar Pontos de Entrega", 'error': error.message})
      }
    }, 
    //Cadastra um novo ponto de entrega
    cadastrar: async (req, res, next)=>{
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

      try{
         let novoPontoEntrega = await pontoEntrega.save()  
         res.status(200).json(novoPontoEntrega)
      }catch(error){
         res.status(500).json({msg: "Erro ao cadastrar Ponto de Entrega", 'error': error.message})
      }
   },
   //Edita um ponto de entrega cadastrado. Permitido apenas para parceiros
   editar: async (req, res, next)=>{
      try{
         let success = await PontoEntrega.update({
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
                  parceiroId: req.user.parceiroId,
                  removed: false
               }
         })
         if(!success[0]) throw new Error('Nenhum ponto de entrega alterado')
         res.status(200).json({msg: "Ponto de Entrega editado com sucesso!"})
      }catch(error){
         res.status(500).json({msg: "Erro ao editar Ponto de Entrega", 'error': error.message})
      }
   },
   //Remove um ponto de entrega cadastrado. Permitido apenas para Parceiros
   remover: async (req, res, next)=>{
      try{
         let success = await PontoEntrega.update({
            removed: true
         },{
            where: {
               id: req.params.id,
               parceiroId: req.user.parceiroId,
               removed: false
            }
         })
         if(!success[0]) throw new Error('Nenhum ponto de entrega removido!')
         res.status(200).json({msg: "Ponto de Entrega removido com sucesso!"})
      }catch(error){
          res.status(500).json({msg: "Erro ao remover Ponto de Entrega!" , 'error': error.message})
      }
  },
}