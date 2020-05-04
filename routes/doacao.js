const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.doacao;

    app.get('/doacao/:id', auth.jwtVerify, controller.buscarPorId);

    app.get('/minhas-doacoes/', auth.jwtVerify, controller.minhasDoacoes);
    app.get('/minhas-doacoes/status/:status', auth.jwtVerify, controller.minhasPorStatus);

    app.post('/doacao', auth.jwtVerify, controller.cadastrar);
    app.put('/doacao/:id',auth.jwtVerify, controller.editar)
    app.delete('/doacao/:id', auth.jwtVerify, controller.remover);

    app.put('/doacao/confirmar/:id', auth.jwtVerify, controller.confirmar);
    
    //TODO: Mover para Parceiro
    //TODO: Documentar
    app.get('/parceiro/doacao/em-aberto', auth.jwtVerify, auth.groupVerify(['A', 'R', 'P']), controller.buscarAbertas);
    app.get('/parceiro/doacao/status/:status', auth.jwtVerify, auth.groupVerify(['A', 'R', 'P']), controller.buscarPorStatus); 
    app.get('/parceiro/doacao/retirada', auth.jwtVerify, auth.groupVerify(['A', 'R', 'P']), controller.minhasRetiradas);
    app.put('/parceiro/doacao/finalizar/:id', auth.jwtVerify, auth.groupVerify(['A', 'R', 'P']), controller.finalizar);
    app.put('/parceiro/doacao/selecionar/:id', auth.jwtVerify, auth.groupVerify(['A', 'R', 'P']), controller.selecionarParaRetirada);
    

    app.put('/doacao/status/:id', auth.jwtVerify, auth.groupVerify(['A']), controller.alterarStatus); 
}