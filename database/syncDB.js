require('./dbMysql')

const Usuario = require('../models/Usuario')
const Pedido = require('../models/Pedido')
const Doacao = require('../models/Doacao')
const Parceiro = require('../models/Parceiro')
const PontoEntrega = require('../models/PontoEntrega')

Parceiro.sync()
.then(()=>{
  PontoEntrega.sync()
  Usuario.sync()
  .then(()=>{
    Pedido.sync()
    .then(()=>{
      Doacao.sync()
    })
  })
})







