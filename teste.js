require('./database/dbMysql')
const Usuario = require('./models/Usuario')
const Pedido = require('./models/Pedido')
const Doacao = require('./models/Doacao')


Usuario.sync()
Pedido.sync()
Doacao.sync()


