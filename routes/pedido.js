const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.pedido;

    app.get('/pedido/', auth.jwtVerify, controller.buscarPedido);


    app.get('/pedido/aberto/', auth.jwtVerify, controller.verificarPedidoAberto);
    
    app.post('/pedido/', auth.jwtVerify, controller.cadastrar);
    app.put('/pedido/',auth.jwtVerify,  controller.editar)
    app.delete('/pedido/', auth.jwtVerify,  controller.remover);

    app.put('/pedido/finalizar/', auth.jwtVerify, controller.finalizar)
    
}