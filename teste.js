require('./database/dbMysql')
const Usuario = require('./models/Usuario')
const Doacao = require('./models/Doacao')
const Solicitacao = require('./models/Solicitacao')

Usuario.sync()
Doacao.sync()
Solicitacao.sync()

