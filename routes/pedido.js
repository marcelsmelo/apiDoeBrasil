const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.pedido;

    app.get('/pedido/:id', auth.jwtVerify, controller.buscarPorId);
    app.get('/pedido', auth.jwtVerify, controller.buscarTodos);
    app.get('/pedido/me', auth.jwtVerify, controller.meusPedidos);
    app.get('/pedido/nao-atendidas', auth.jwtVerify, controller.naoAtendidos);
    app.get('/pedido/atendidas', auth.jwtVerify, controller.atendidos);
    app.post('/pedido', auth.jwtVerify, controller.cadastrar);
    app.put('/pedido/:id',auth.jwtVerify, controller.editar)
    app.delete('/pedido/:id', auth.jwtVerify, controller.remover);
    app.post('/pedido/alterarStatus', auth.jwtVerify, controller.alterarStatus)
}