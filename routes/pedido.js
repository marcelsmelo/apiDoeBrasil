const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.pedido;

    // app.get('/pedido/:id', auth.jwtVerify, controller.buscarPorId);

    
    // app.get('/pedido/', auth.jwtVerify, controller.buscarTodos);
    // app.get('/pedido/status/:status', auth.jwtVerify, controller.buscarPorStatus);
    
    // app.get('/pedidos-nao-atendidos/', auth.jwtVerify, controller.naoAtendidos);
    // app.get('/pedido/me/aberto', auth.jwtVerify, controller.verificarPedidoAberto);
    
    // app.post('/pedido', auth.jwtVerify, auth.groupVerify(['U']), controller.cadastrar);
    // app.put('/pedido/:id',auth.jwtVerify, auth.groupVerify(['U']),  controller.editar)
    // app.delete('/pedido/:id', auth.jwtVerify, auth.groupVerify(['U']),  controller.remover);

    // app.put('/pedido/finalizar/:id', auth.jwtVerify, controller.finalizar)
    
    // //Operação exclusivas para Parceiros
    // app.put('/parceiro/pedido/atender/:id', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.selecionarParaAtender)

    // //Operação exclusivas para SuperADMIN
    // app.put('/pedido/status/:id', auth.jwtVerify, auth.groupVerify(['A']), controller.alterarStatus)
}