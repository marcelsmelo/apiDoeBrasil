const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.pedido;

    app.get('/pedido/:id', auth.jwtVerify, controller.buscarPorId);
    app.get('/pedidos-nao-atendidos/', auth.jwtVerify, controller.buscarNaoAtendidos); 
    
    app.get('/meus-pedidos/', auth.jwtVerify, controller.meusPedidos);
    app.get('/meus-pedidos/status/:status', auth.jwtVerify, controller.meusPorStatus);
    
    app.post('/pedido', auth.jwtVerify, controller.cadastrar);
    app.put('/pedido/:id',auth.jwtVerify, controller.editar)
    app.delete('/pedido/:id', auth.jwtVerify, controller.remover);

    app.put('/pedido/confirmar/:id', auth.jwtVerify, controller.confirmar)

    //TODO: Mover para Parceiro
    //TODO: Documentar
    app.get('/parceiro/pedido/entrega/', auth.jwtVerify, auth.groupVerify(['R', 'P', 'A']), controller.minhasEntregas)
    app.get('/parceiro/pedido/status/:status', auth.jwtVerify, auth.groupVerify(['R', 'P', 'A']),  controller.buscarPorStatus); 
    app.put('/parceiro/pedido/atender/:id', auth.jwtVerify, auth.groupVerify(['R', 'P', 'A']),controller.atenderPedido)
    app.put('/parceiro/pedido/finalizar/:id', auth.jwtVerify, auth.groupVerify(['R', 'P', 'A']), controller.finalizar)
   
    app.put('/pedido/status/:id', auth.jwtVerify, auth.groupVerify(['A']), controller.alterarStatus)
}