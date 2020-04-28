const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.pedido;

    app.get('/pedido/:id', auth.jwtVerify, controller.buscarPorId);
    app.get('/pedido', auth.jwtVerify, controller.buscarTodos);
    app.get('/pedido/status/:status', auth.jwtVerify, controller.buscarPorStatus);
   
    app.get('/meus-pedidos/', auth.jwtVerify, controller.meusPedidos);
    app.get('/meus-pedidos/status/:status', auth.jwtVerify, controller.meusPorStatus);
  
    app.post('/pedido', auth.jwtVerify, controller.cadastrar);
    app.put('/pedido/:id',auth.jwtVerify, controller.editar)
    app.delete('/pedido/:id', auth.jwtVerify, controller.remover);

    app.put('/pedido/confirmar/:id', auth.jwtVerify, controller.confirmar)
    app.put('/pedido/atender/:id', auth.jwtVerify, auth.groupVerify(['R', 'P', 'A']),controller.atenderPedido)
    app.put('/pedido/finalizar/:id', auth.jwtVerify, auth.groupVerify(['R', 'P', 'A']), controller.finalizar)

    app.put('/pedido/status/:id', auth.jwtVerify, auth.groupVerify(['A']), controller.alterarStatus)
}