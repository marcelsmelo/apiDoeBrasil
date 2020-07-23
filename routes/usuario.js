const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.usuario;

    app.post('/login', controller.login);//OK
    app.post('/logout', auth.jwtVerify, controller.logout);//ok
    app.get('/meus-dados', auth.jwtVerify, controller.meusDados);

    
    //Usuários
    app.post('/signup/usuario', (req, res, next)=>{req.body.group = 'U'; next();}, controller.cadastrar);//cadastrar usuário
    app.get('/usuario', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.buscarUsuarios)
    app.put('/usuario', auth.jwtVerify, controller.editar);//ok
    app.delete('/usuario', auth.jwtVerify, controller.remover)
    


    //Parceiros
    app.post('/signup/parceiro', (req, res, next)=>{req.body.group = 'P'; next();}, controller.cadastrar);//cadastrar parceiro
    app.get('/parceiro', auth.jwtVerify, controller.buscarParceiros);
    app.delete('/parceiro', auth.jwtVerify, controller.remover)
    app.put('/parceiro', auth.jwtVerify, controller.remover)

    app.put('/parceiro/usuario/', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.selecionarComoParceiro)
    app.delete('/parceiro/usuario/', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.removerComoParceiro)
    app.get('/parceiro/usuario', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.usuariosParceiro)
    

    app.get('/cidades/:uf', controller.getCidadeFromUF);
}