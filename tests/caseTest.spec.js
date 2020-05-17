let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';


chai.use(chaiHttp);

describe("Ponto de Entrega Tests",()=>{

   let tokenParceiro;
   let parceiroId;
   
   let partner = {
      nome:'Parceiro 02',
      telefone:'+55 64 98888-9999',
      senha: '123456789',
      rua: 'Avenida Teste',
      numero: '190',
      complemento: '',
      bairro:'Teste',
      estado: 'GO',  
      cidade: 'Rio Quente'
   }

   let pontoEntrega1 = {
      nome:'Ponto Entrega 04',
      telefone:'+55 34 23763-3324',
      rua: 'Teste 04',
      numero: '785',
      complemento: 'Casa 04',
      bairro:'Centro',
      estado: 'GO',  
      cidade: 'Rio Quente'
   }

   let pontoEntrega2 = {
      nome:'Ponto Entrega 05',
      telefone:'+55 34 76564-3453',
      rua: 'Teste 05',
      numero: '522',
      complemento: 'Casa 05',
      bairro:'Santa Monica',
      estado: 'GO',  
      cidade: 'Rio Quente'
   }

   let pontoEntrega3 = {
      nome:'Ponto Entrega 06',
      telefone:'+55 34 01287-3333',
      rua: 'Teste 03',
      numero: '342',
      complemento: 'Casa 06',
      bairro:'Aeroporto',
      estado: 'GO',  
      cidade: 'Rio Quente'
   }

   it('Create a Partner', (done)=>{
      chai.request(base_url)
      .post('/parceiro/')
      .send(partner)
      .end((err, res)=>{
         expect(res).to.have.status(201)
         expect(res.body).to.be.a('object')
         expect(res.body.nome).to.be.equal(partner.nome)
         parceiroId = res.body.id
         done();
      })
   })

   it('Partner Login', (done)=>{
      chai.request(base_url)
      .post('/parceiro/login')
      .send({telefone: partner.telefone, senha: partner.senha})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.property('token')
         tokenParceiro = res.body.token
         done();
      })
   })


   it('Try create a new Ponto de Entrega by logged Parceiro', (done)=>{
      chai.request(base_url)
      .post('/ponto-entrega/')
      .send(pontoEntrega1)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         done();
      })
   })

   it('Try create a new Ponto de Entrega by logged Parceiro', (done)=>{
      chai.request(base_url)
      .post('/ponto-entrega/')
      .send(pontoEntrega2)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         done();
      })
   })

   it('Try create a new Ponto de Entrega by logged Parceiro', (done)=>{
      chai.request(base_url)
      .post('/ponto-entrega/')
      .send(pontoEntrega3)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         done();
      })
   })
});