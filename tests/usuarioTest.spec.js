let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';

chai.use(chaiHttp);

describe("User Login test",()=>{
  // a funcao it eh o que vamos testar realmente, neste caso o endpoint /cards, que deve retornar no maximo 100 cartas
  let token;

  let user = {
    nome:'Marcel Melo',
    telefone:'+55 34 99636-8898',
    senha: '123456789',
    rua: 'FC 05',
    numero: 'QA L6',
    complemento: 'Casa 02',
    bairro:'Felício Chaves',
    estado: 'GO',  
    cidade: 'Morrinhos'
  }
  
  it("Try login with not exist user",(done)=>{
    chai.request(base_url)
    .post('/usuario/login')
    .send({telefone:'+55 33 33333-3333', senha: '123456789'})
    .end((err, res)=>{
      expect(res).to.have.status(500)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.property('msg')
      done();
    })
  });

  it('Try login on created User', (done)=>{
    chai.request(base_url)
    .post('/usuario/login')
    .send({telefone: user.telefone, senha: user.senha})
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('token')
      token = res.body.token
      done();
    })
  })

  it('Try logout of User without token', (done)=>{
    chai.request(base_url)
    .post('/usuario/logout')
    .end((err, res)=>{
      expect(res).to.have.status(401)
      expect(res.body).to.have.property('msg')
      done();
    })
  })

  it('Try logout of User', (done)=>{
    chai.request(base_url)
    .post('/usuario/logout')
    .set('authorization', 'Bearer '+token)
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('msg')
      done();
    })
  })
});

