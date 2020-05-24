const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.parceiro;

    app.get('/parceiro/:id', auth.jwtVerify, controller.buscarPorId);
    app.get('/parceiro', auth.jwtVerify, controller.buscarTodos);
    app.get('/parceiro/me/dados', auth.jwtVerify, controller.meusDados);
   
    app.post('/parceiro', controller.cadastrar);
    app.put('/parceiro',auth.jwtVerify, auth.groupVerify(['P']), controller.editar)
    app.delete('/parceiro', auth.jwtVerify, auth.groupVerify(['P']), controller.remover);

    app.post('/parceiro/login', controller.login);
    app.post('/parceiro/logout', auth.jwtVerify, auth.groupVerify(['P']), controller.logout);

}