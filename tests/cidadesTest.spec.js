let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const baseUrl = 'http://localhost:3000'

chai.use(chaiHttp);

describe("Entrega de cidades pela UF do Estado",()=>{
  // a funcao it eh o que vamos testar realmente, neste caso o endpoint /cards, que deve retornar no maximo 100 cartas
  it("Deve receber as cidades do Goiás",(done)=>{
    chai.request(baseUrl)
    .get('/cidades/GO')
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.be.a('object')
      expect(res.body.sigla).to.be.equal('GO')
      expect(res.body.cidades).to.be.a('array')
      done();
    })
  });

  it("Não deve receber nenhuma cidade",(done)=>{
    chai.request(baseUrl)
    .get('/cidades/AZ')
    .end((err, res)=>{
      expect(res).to.have.status(200)
      expect(res.body).to.not.have.property('sigla')
      expect(res.body).to.not.have.property('cidades')
      done();
    })
  });

  it("Não enviar a UF do estado",(done)=>{
    chai.request(baseUrl)
    .get('/cidades/')
    .end((err, res)=>{
      expect(res).to.have.status(404)
      expect(res.body).to.not.have.property('sigla')
      expect(res.body).to.not.have.property('cidades')
      done();
    })
  });
  
});

