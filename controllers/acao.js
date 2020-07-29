let Acao = require('../models/Acao')
let Usuario = require('../models/Usuario')

module.exports = {
    //Busca todos as ações
    //TODO: Filtrar por data??? 
    buscar: async (req, res, next)=>{
      let condition = {removed : false}

      if(req.query.parceiroId) condition.parceiroId = req.query.parceiroId;
      else if(req.query.id) condition.id = req.query.id;
      else return res.status(500).json({msg: "Erro ao buscar Ações", 'error': "Deve ser especificado o ID do Parceiro ou ID da Ação"});
      
      if(req.query.ativo) condition.id = req.query.ativo;

      try{
         let acoes = await Acao.findAll({
            where: condition,
            include:[{
               model: Usuario,
               as: 'parceiro',
               attributes:['id','nome', 'cpfCnpj', 'email', 'cidade', 'estado']
            }]
        })
        res.status(200).json(acoes)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar Ações", 'error': error.message})
      }
    },

    //Busca todas ações do parceiro logado  OK
    minhasAcoes: async (req, res, next)=>{
      try{
         let acoes = await Acao.findAll({
            where: {
               parceiroId: req.user.parceiroId,
               removed: false
            },
            //attributes: ['id', 'nome', 'telefone', 'rua', 'bairro', 'numero', 'complemento','cidade', 'estado']
         })
        
         res.status(200).json(acoes)
      }catch(error){
         res.status(500).json({msg: "Erro ao buscar ações do parceiro logado", 'error': error.message})
      }
    },

    //Cadastra uma nova Ação OK
    cadastrar: async (req, res, next)=>{
      let acao = new Acao({
         nome: req.body.nome,
         descricao: req.body.descricao,
         dataInicio: req.body.dataInicio? req.body.dataInicio: null, 
         dataFim: req.body.dataFim? req.body.dataFim: null,
         ativo: req.body.ativo? req.body.ativo: null,
         parceiroId: req.user.parceiroId
      })

      try{
         let novaAcao = await acao.save()  
         res.status(200).json({msg:"Ação cadastrada com sucesso!"})
      }catch(error){
         res.status(500).json({msg: "Erro ao cadastrar Ação. Tente novamente!", 'error': error.message})
      }
   },
   //Edita uma Ação cadastrada. Permitido apenas para parceiros   OK
   editar: async (req, res, next)=>{
      try{
         let success = await PontoEntrega.update({
            nome: req.body.nome,
            descricao: req.body.descricao,
            dataInicio: req.body.dataInicio? req.body.dataInicio: null, 
            dataFim: req.body.dataFim? req.body.dataFim: null,
            ativo: req.body.ativo? req.body.ativo: null
            },{
               where: {
                  id: req.query.id,
                  parceiroId: req.user.parceiroId,
                  removed: false
               }
         })
         if(!success[0]) throw new Error('Nenhuma Ação alterada')
         res.status(200).json({msg: "Ação editada com sucesso!"})
      }catch(error){
         res.status(500).json({msg: "Erro ao editar uma Ação", 'error': error.message})
      }
   },
   //Remove uma Ação cadastrada. Permitido apenas para Parceiros   OK
   remover: async (req, res, next)=>{
      try{
         let success = await PontoEntrega.update({
            removed: true
         },{
            where: {
               id: req.query.id,
               parceiroId: req.user.parceiroId,
               removed: false
            }
         })
         if(!success[0]) throw new Error('Nenhuma Ação removida!')
         res.status(200).json({msg: "Ação removida com sucesso!"})
      }catch(error){
         res.status(500).json({msg: "Erro ao remover uma Ação", 'error': error.message})
      }
  },
}