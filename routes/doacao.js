const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.doacao;

    app.get('/doacao/:id', auth.jwtVerify, controller.buscarPorId);

    app.get('/doacao', auth.jwtVerify, controller.buscarTodas);
    app.get('/doacao/status/:status', auth.jwtVerify, controller.buscarPorStatus);

    app.get('/doacao/me/', auth.jwtVerify, controller.minhasDoacoes);
    app.get('/doacao/me/status/:status', auth.jwtVerify, controller.minhasPorStatus);

    app.post('/doacao', auth.jwtVerify, controller.cadastrar);
    app.put('/doacao/:id',auth.jwtVerify, controller.editar)
    app.delete('/doacao/:id', auth.jwtVerify, controller.remover);
    app.put('/doacao/status/:id', auth.jwtVerify, controller.alterarStatus);
}