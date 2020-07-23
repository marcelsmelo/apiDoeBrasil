let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
let Usuario = require('../models/Usuario')

chai.use(chaiHttp);

describe("User Login test",()=>{
  let token;
  let parceiroId;
  let userPartnerId;

  let partner = {
    nome: 'Partner',
    telefone: '+55 34 99636-8899',
    cpfCnpj: '85236974102',
    senha: '123456',
    rua: 'FC 05',
    numero: 'QA L6',
    complemento: 'Casa 02',
    bairro: 'Felício Chaves',
    estado: 'GO',
    cidade: 'Morrinhos'
  }

  let user = {
    nome: 'Marcel Melo',
    cpfCnpj: '08911211613',
    telefone: '+55 34 99636-8898',
    senha: '123456',
    rua: 'FC 05',
    numero: 'QA L6',
    complemento: 'Casa 02',
    bairro: 'Felício Chaves',
    estado: 'GO',
    cidade: 'Morrinhos'
  }

  let userPartner = {
    nome: 'Usuario Parceiro',
    telefone: '+55 34 99636-8888',
    cpfCnpj: '12345678910',
    senha: '123456',
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

  before(done => {
    // runs once before the first test in this block
    chai.request(base_url)
         .post('/signup/usuario/')
         .send(userPartner)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            done();
         })
  });

  before(done => {
    // runs once before the first test in this block
    chai.request(base_url)
         .post('/signup/parceiro/')
         .send(partner)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            done();
         })
  });
  
  it("Realizar o login como parceiro",(done)=>{
    chai.request(base_url)
    .post('/login')
    .send({cpfCnpj: partner.cpfCnpj, senha: partner.senha})
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.property('token')
      token = res.body.token
      done();
    })
  });

  it("Buscar todos os parceiros cadastrados na cidade do usuário logado",(done)=>{
    chai.request(base_url)
    .get('/parceiro')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.lengthOf(1)
      done();
    })
  });

  it("Buscar todos os usuários (U) da cidade do parceiro logado",(done)=>{
    chai.request(base_url)
    .get('/usuario')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.lengthOf(2)
      userPartnerId = res.body[1].id;
      done();
    })
  });

  it("Buscar todos os Usuários-Parceiros (UP) vinculados ao parceiro logado",(done)=>{
    chai.request(base_url)
    .get('/parceiro/usuario')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.lengthOf(0)
      done();
    })
  });

  it("Transformar Usuario (U) em Usuário-Parceiro (UP) vinculado-o ao parceiro logado",(done)=>{
    chai.request(base_url)
    .put('/parceiro/usuario/')
    .query({'id': userPartnerId})
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('msg')
      done();
    })
  });

  it("Buscar todos os usuários (U) da cidade do parceiro logado",(done)=>{
    chai.request(base_url)
    .get('/usuario')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.lengthOf(1)
      done();
    })
  });

  it("Buscar todos os Usuários-Parceiros (UP) vinculados ao parceiro logado",(done)=>{
    chai.request(base_url)
    .get('/parceiro/usuario')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.lengthOf(1)
      done();
    })
  });

  it("Buscar um Usuário-Parceiro (UP) por um ID específico",(done)=>{
    chai.request(base_url)
    .get('/parceiro/usuario')
    .set('authorization', 'Bearer '+token)
    .query({'id': userPartnerId})
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.lengthOf(1)
      done();
    })
  });


  it("Remover Usuario-Parceiro (UP) do vinculo com o Parceiro (P), transformando-o em Usuario (U)",(done)=>{
    chai.request(base_url)
    .delete('/parceiro/usuario/')
    .query({'id': userPartnerId})
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('msg')
      done();
    })
  });

  it("Buscar todos os usuários (U) da cidade do parceiro logado",(done)=>{
    chai.request(base_url)
    .get('/usuario')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.lengthOf(2)
      done();
    })
  });

  it("Buscar todos os Usuários-Parceiros (UP) vinculados ao parceiro logado",(done)=>{
    chai.request(base_url)
    .get('/parceiro/usuario')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.lengthOf(0)
      done();
    })
  });

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