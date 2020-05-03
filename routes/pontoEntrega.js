const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.pontoEntrega;

    app.get('/ponto-entrega/:id', auth.jwtVerify, controller.buscarPorId);
    //app.get('/ponto-entrega', auth.jwtVerify, auth.groupVerify(['A']),controller.buscarTodos);
    app.get('/ponto-entrega/parceiro/:parceiroId', auth.jwtVerify, controller.buscarTodosPorParceiro);
    app.get('/meus-pontos-entrega', auth.jwtVerify, auth.groupVerify(['P', 'R']), controller.meusPontosEntrega);
   
    app.post('/ponto-entrega', auth.jwtVerify, auth.groupVerify(['P', 'R']), controller.cadastrar);
    app.put('/ponto-entrega/:id',auth.jwtVerify, auth.groupVerify(['P', 'R']), controller.editar)
    app.delete('/ponto-entrega/:id', auth.jwtVerify, auth.groupVerify(['P', 'R']), controller.remover);

}