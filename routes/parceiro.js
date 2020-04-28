const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.parceiro;

    app.get('/parceiro/:id', auth.jwtVerify, controller.buscarPorId);
    app.get('/parceiro', auth.jwtVerify, controller.buscarTodos);
   
    app.post('/parceiro', auth.jwtVerify, controller.cadastrar);
    app.put('/parceiro/:id',auth.jwtVerify, auth.groupVerify(['R']), controller.editar)
    app.delete('/parceiro/:id', auth.jwtVerify, auth.groupVerify(['R']), controller.remover);

}