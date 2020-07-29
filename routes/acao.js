const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.acao;

    app.get('/acao/', auth.jwtVerify, controller.buscar);
    app.get('/acao/me/', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.minhasAcoes);
    app.post('/acao/', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.cadastrar);
    app.put('/acao/',auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.editar)
    app.delete('/acao/', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.remover);

}