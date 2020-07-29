const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.doacao;

    // app.get('/doacao/:id', auth.jwtVerify, controller.buscarPorId);

    // app.get('/doacao/', auth.jwtVerify, controller.buscarTodas)
    // app.get('/doacao/status/:status', auth.jwtVerify, controller.buscarPorStatus); 

    // app.post('/doacao', auth.jwtVerify, auth.groupVerify(['U']), controller.cadastrar);
    // app.put('/doacao/:id',auth.jwtVerify, auth.groupVerify(['U']), controller.editar)
    // app.delete('/doacao/:id', auth.jwtVerify, auth.groupVerify(['U']), controller.remover);

    // app.put('/doacao/finalizar/:id', auth.jwtVerify, controller.finalizar);

    // //Operação exclusivas para Parceiros
    // app.get('/parceiro/doacao/disponivel', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.disponivelParceiro)
    // app.put('/parceiro/doacao/selecionar/:id', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.selecionarParaRetirada);
    
    // //Operações exclusivas para SuperAdmin
    // app.put('/doacao/status/:id', auth.jwtVerify, auth.groupVerify(['A']), controller.alterarStatus); 
}