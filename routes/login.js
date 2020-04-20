const auth = require('../lib/auth')

module.exports = (app) => {
    const controller = app.controllers.login;

    app.post('/login', controller.login);
    app.post('/signup', controller.cadastrar);
    app.post('/logout', auth.jwtVerify, controller.logout);
    app.get('/cidades/:uf', controller.getCidadeFromUF);
}