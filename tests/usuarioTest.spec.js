let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
let Usuario = require('../models/Usuario')

chai.use(chaiHttp);

describe("User Login test",()=>{
  let token;
  let usuarioId;

  let user = {
    nome: 'Marcel Melo',
    cpfCnpj: '08911211613',
    telefone: '+55 34 99636-8898',
    email: 'kasks@aksdfja.com',
    senha: '123456',
    rua: 'FC 05',
    numero: 'QA L6',
    complemento: 'Casa 02',
    bairro: 'Felício Chaves',
    estado: 'GO',
    cidade: 'Morrinhos'
 }

  let userEdited = {
    nome: 'Marcelo Melo',
    telefone: '+55 34 99636-6885',
    rua: 'FC 05',
    numero: 'QA L6',
    complemento: 'Casa 02',
    bairro: 'Felício Chaves',
    estado: 'GO',
    cidade: 'Morrinhos'
  }

  before(done => {
    // runs once before the first test in this block
    chai.request(base_url)
         .post('/signup/usuario/')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            done();
         })
  });
  
  it("Tentar logar com um usuário não existente",(done)=>{
    chai.request(base_url)
    .post('/usuario/login')
    .send({cpfCnpj: '86453233535533', senha: '66857566'})
    .end((err, res)=>{
      expect(res).to.have.status(500)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.property('msg')
      done();
    })
  });

  it('Não conseguir realizar login de um usuário cadastrado como Parceiro', (done)=>{
    chai.request(base_url)
    .post('/parceiro/login')
    .send({cpfCnpj: user.cpfCnpj, senha: user.senha})
    .end((err, res)=>{
      expect(res).to.have.status(500)
      expect(res.body).to.have.property('error')
      done();
    })
  });

  it('Realizar login de um usuário cadastrado', (done)=>{
    chai.request(base_url)
    .post('/usuario/login')
    .send({cpfCnpj: user.cpfCnpj, senha: user.senha})
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('token')
      token = res.body.token
      done();
    })
  });

  it('Recuperar os dados do usuário logado', (done)=>{
    chai.request(base_url)
    .get('/me')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('id')
      expect(res.body.nome).to.be.equal(user.nome)
      usuarioId = res.body.id
      done();
    })
  })

  it('Editar os dados do usuário logado', (done)=>{
    chai.request(base_url)
    .put('/usuario/')
    .send(userEdited)
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('msg')
      done();
    })
  })

  it('Recuperar os dados do usuário logado (Editado)', (done)=>{
    chai.request(base_url)
    .get('/me')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('id')
      expect(res.body.telefone).to.be.equal(userEdited.telefone)
      expect(res.body.nome).to.be.not.equal(user.nome)
      done();
    })
  })

  it('Tentar realizar o logout sem passar o token de acesso', (done)=>{
    chai.request(base_url)
    .post('/logout')
    .end((err, res)=>{
      expect(res).to.have.status(401)
      expect(res.body).to.have.property('msg')
      done();
    })
  })

  it('Tentar realizar o logout de um usuário logado', (done)=>{
    chai.request(base_url)
    .post('/logout')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('msg')
      done();
    })
  })

  after(done =>{
    Usuario.destroy({
       where: {},
       cascade: true
    })
    .then(success=>{
       done()
    })
    .catch(error=>{
       done(error)
    })
 })
});

