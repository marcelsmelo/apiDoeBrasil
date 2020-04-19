const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.doacao;

    app.get('/doacao/:id', auth.jwtVerify, controller.buscarPorId);
    app.get('/doacao', auth.jwtVerify, controller.buscarTodas);
    app.get('/doacao/me', auth.jwtVerify, controller.buscarMinhasDoacoes)
    app.get('/doacao/finalizadas', auth.jwtVerify, controller.buscarFinalizadas)
    app.post('/doacao', auth.jwtVerify, controller.cadastrar);
    app.put('/doacao/:id',auth.jwtVerify, controller.editar)
    app.delete('/doacao/:id', auth.jwtVerify, controller.remover);
    app.post('/doacao/alterarStatusEntrega', auth.jwtVerify, controller.alterarStatusEntrega)
}