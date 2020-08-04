const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.doacao;
    
    app.get('/doacao/', auth.jwtVerify, controller.buscarDoacao)
    
    app.post('/doacao', auth.jwtVerify, controller.cadastrar);
    app.put('/doacao/',auth.jwtVerify, controller.editar)
    app.delete('/doacao/', auth.jwtVerify, controller.remover);

    app.put('/doacao/finalizar/', auth.jwtVerify, controller.finalizar);

}