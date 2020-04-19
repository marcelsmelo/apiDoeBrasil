const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.solicitacao;

    app.get('/solicitacao/:id', auth.jwtVerify, controller.buscarPorId);
    app.get('/solicitacao', auth.jwtVerify, controller.buscarTodas);
    app.get('/solicitacao/me', auth.jwtVerify, controller.buscarMinhasSolicitacoes);
    app.get('/solicitacao/nao-atendidas', auth.jwtVerify, controller.buscarTodasNaoAtendidas);
    app.get('/solicitacao/atendidas', auth.jwtVerify, controller.buscarTodasAtendidas);
    app.post('/solicitacao', auth.jwtVerify, controller.cadastrar);
    app.put('/solicitacao/:id',auth.jwtVerify, controller.editar)
    app.delete('/solicitacao/:id', auth.jwtVerify, controller.remover);
    app.post('/solicitacao/alterarStatusEntrega', auth.jwtVerify, controller.alterarStatusEntrega)
}