const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.doacao;

    app.get('/doacao/:id', auth.jwtVerify, controller.buscarPorId);

    app.get('/doacao', auth.jwtVerify, controller.buscarTodas);//TODO: /doacao/em-aberto Transformar para doações não atendidas na cidade (sometne parceiros)
    app.get('/doacao/status/:status', auth.jwtVerify, auth.groupVerify(['A', 'R', 'P']), controller.buscarPorStatus); //TODO: Somente para parceiros, com fitlro de parceiro

    app.get('/minhas-doacoes/', auth.jwtVerify, controller.minhasDoacoes);
    app.get('/minhas-doacoes/status/:status', auth.jwtVerify, controller.minhasPorStatus);

    app.post('/doacao', auth.jwtVerify, controller.cadastrar);
    app.put('/doacao/:id',auth.jwtVerify, controller.editar)
    app.delete('/doacao/:id', auth.jwtVerify, controller.remover);

    app.put('/doacao/confirmar/:id', auth.jwtVerify, controller.confirmar);
    app.put('/doacao/finalizar/:id', auth.jwtVerify, auth.groupVerify(['A', 'R', 'P']), controller.finalizar);
    
    app.put('/doacao/status/:id', auth.jwtVerify, auth.groupVerify(['A']), controller.alterarStatus); 
}