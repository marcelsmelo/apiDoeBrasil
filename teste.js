require('./database/dbMysql')

const Usuario = require('./models/Usuario')
const Pedido = require('./models/Pedido')


Pedido.findAll({
   where: {
       
   },
   raw:true,
   include:[{
      model: Usuario,
      attributes:['id', 'nome', 'telefone', 'group', 'parceiroId'],
      trought:{attribute:['atendidoPor']},
      where: {'parceiroId': 1}
  }]
})
.then(pedidos=>{
   console.log("Sucesso", pedidos)
})
.catch(error=>{
   console.log("error", error)
})