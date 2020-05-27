const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.usuario;

    app.post('/usuario/login', controller.login);
    app.post('/usuario/', controller.cadastrar);
    app.post('/usuario/logout', auth.jwtVerify, controller.logout);
    app.put('/usuario/', auth.jwtVerify, controller.editar);
    app.put('/usuario/parceiro/:id', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.selecionarComoParceiro)
    app.get('/usuario/parceiro', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.usuariosParceiro)//TODO: Documentar
    app.get('/usuario', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.usuariosSemParceiro)//TODO: Documentar
    app.get('/usuario/me/dados', auth.jwtVerify, controller.meusDados);
    app.delete('/usuario/parceiro/:id', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.removerComoParceiro)//TODO:Documentar
    app.get('/cidades/:uf', controller.getCidadeFromUF);
}