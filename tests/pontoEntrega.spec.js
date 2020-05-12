let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
const Parceiro = require('../models/Parceiro')
let PontoEntrega = require('../models/PontoEntrega')


chai.use(chaiHttp);

describe("Ponto de Entrega Tests",()=>{

   let tokenParceiro;
   let tokenUsuario;

   let pontoEntregaId;
   let parceiroId;

   let user = {
      nome: 'Marcel Melo',
      telefone: '+55 34 99636-8898',
      senha: '123456789',
   }
   
   let partner = {
      nome:'Prefeitura de Morrinhos',
      telefone:'+55 64 99636-3333',
      senha: '123456789',
      rua: 'Avenida Senador Hermenegildo',
      numero: '160',
      complemento: '',
      bairro:'Centro',
      estado: 'GO',  
      cidade: 'Morrinhos'
   }

   let pontoEntrega = {
      nome:'Casa Rosa',
      telefone:'+55 34 99636-3333',
      rua: 'Teste 01',
      numero: '222',
      complemento: 'Casa 03',
      bairro:'Centro',
      estado: 'GO',  
      cidade: 'Morrinhos'
   }

   before((done)=>{
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

   before((done)=>{
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

   before((done)=>{
      chai.request(base_url)
      .post('/usuario/login')
      .send({telefone: user.telefone, senha: user.senha})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.property('token')
         tokenUsuario = res.body.token
         done();
      })
   })

   it('Get 0 Pontos de Entrega owned by logged Parceiro', (done)=>{
      chai.request(base_url)
      .get('/meus-pontos-entrega')
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(0)
         done();
      })
   })

   it('Try create a new Ponto de Entrega by logged Parceiro', (done)=>{
      chai.request(base_url)
      .post('/ponto-entrega/')
      .send(pontoEntrega)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         pontoEntregaId = res.body.id
         done();
      })
   })

   it('Get All Pontos de Entrega owned by logged Parceiro', (done)=>{
      chai.request(base_url)
      .get('/meus-pontos-entrega')
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(1)
         done();
      })
   })

   it('Get a Ponto de Entrega by ID (User)', (done)=>{
      chai.request(base_url)
      .get('/ponto-entrega/'+pontoEntregaId)
      .send(pontoEntrega)
      .set('authorization', 'Bearer '+tokenUsuario)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.id).to.be.equal(pontoEntregaId)
         expect(res.body.nome).to.be.equal(pontoEntrega.nome)
         done();
      })
   })

   it('Get all Pontos de Entrega owned by de Partner ID (User)', (done)=>{
      chai.request(base_url)
      .get('/ponto-entrega/parceiro/'+parceiroId)
      .set('authorization', 'Bearer '+tokenUsuario)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(1)
         done();
      })
   })

   it('Try edit a exist Ponto de Entrega by logged Parceiro', (done)=>{
      let pontoEntregaEdit ={
         nome:'Casa Rosa Edit',
         telefone:'+55 64 99636-3333',
         rua: 'Teste 01',
         numero: '222',
         complemento: 'Casa 03',
         bairro:'Centro',
         estado: 'GO',  
         cidade: 'Morrinhos'
      }

      chai.request(base_url)
      .put('/ponto-entrega/'+pontoEntregaId)
      .send(pontoEntregaEdit)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Not Permit that User remove a Ponto de Entrega owned by de Partner', (done)=>{
      chai.request(base_url)
      .delete('/ponto-entrega/'+pontoEntregaId)
      .set('authorization', 'Bearer '+tokenUsuario)
      .end((err, res)=>{
         expect(res).to.have.status(403)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Get remove a Ponto de Entrega owned by de Partner', (done)=>{
      chai.request(base_url)
      .delete('/ponto-entrega/'+pontoEntregaId)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   after(done =>{
      PontoEntrega.destroy({
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