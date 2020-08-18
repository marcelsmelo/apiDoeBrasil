const app = require('../bin/www')

let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
let Pedido = require('../models/Pedido')
let Usuario = require('../models/Usuario')


chai.use(chaiHttp);

describe("Pedidos tests",()=>{
   let partnerId;
   let requesterID;
   let requester2ID;
   
   let tokenPartner;
   let tokenRequester;
   let tokenRequester2;


   let reqID;
   let req2ID;
   let req3ID;

   let requester = {
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

   let requester2 = {
      nome: 'Marcelo Melo',
      cpfCnpj: '7556658325',
      telefone: '+55 34 99636-9999',
      email: 'gjhfdhg@asdfas.com',
      senha: '123456',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro: 'Felício Chaves',
      estado: 'GO',
      cidade: 'Morrinhos'
   }
  
   let partner = {
      nome: 'Partner',
      telefone: '+55 34 99636-8899',
      cpfCnpj: '85236974102',
      email: "email@email.com",
      sobre: "Uns detalhes do Parceiro",
      senha: '123456',
      descricao: "Descrição do parceiro!",
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
           .post('/parceiro/signup/')
           .send(partner)
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
           .post('/usuario/signup/')
           .send(requester)
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
           .post('/usuario/signup/')
           .send(requester2)
           .end((err, res) => {
              expect(res).to.have.status(201)
              expect(res.body).to.be.a('object')
              expect(res.body).to.have.property('msg')
              done();
           })
   });
  
   before(done => {
      chai.request(base_url)
      .post('/parceiro/login')
      .send({cpfCnpj: partner.cpfCnpj, senha: partner.senha})
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        tokenPartner = res.body.token
        done();
      })
    });

   before(done => {
      chai.request(base_url)
      .post('/usuario/login')
      .send({cpfCnpj: requester.cpfCnpj, senha: requester.senha})
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        tokenRequester = res.body.token
        done();
      })
    });

    before(done => {
      chai.request(base_url)
      .post('/usuario/login')
      .send({cpfCnpj: requester2.cpfCnpj, senha: requester2.senha})
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        tokenRequester2 = res.body.token
        done();
      })
    });

   before(done => {
      chai.request(base_url)
      .get('/parceiro')
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(1)
         partnerId = res.body[0].id
         done();
      })
    });

   before(done => {
      chai.request(base_url)
      .get('/usuario')
      .set('authorization', 'Bearer '+tokenPartner)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(2)
         requesterID = res.body[0].id
         requester2ID = res.body[1].id
         done();
      })
    });

   it('Não permitir criar um pedido, pelo usuário, parceiroID não informado!', done =>{
       let doacao = {
          generoAlimenticio: true,
          higienePessoal: false,
          artigoLimpeza: true,
          outros: 'Qualquer coisa',
          observacoes: 'Teste sem parceiroID'
       }

      chai.request(base_url)
      .post('/pedido')
      .set('authorization', 'Bearer '+tokenRequester)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })


   it('Não permitir criar um pedido, pelo Parceiro, usuarioID não informado!', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         observacoes: 'Teste sem usuarioID'
      }

     chai.request(base_url)
     .post('/pedido')
     .set('authorization', 'Bearer '+tokenPartner)
     .send(doacao)
     .end((err, res)=>{
        expect(res).to.have.status(500)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('msg')
        done();
     })
  })

   it('Criar um Pedido, pelo usuário.', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         parceiroId: partnerId,
         observacoes: 'DispEntrega false'
      }

      chai.request(base_url)
      .post('/pedido')
      .set('authorization', 'Bearer '+tokenRequester)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(0)
         reqID = res.body.id;
         done();
      })
   })

   it('Criar um Pedido, pelo Parceiro. ', done =>{
      let doacao = {
         generoAlimenticio: false,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         usuarioId: requesterID,
         observacoes: 'Parceiro'
      }

      chai.request(base_url)
      .post('/pedido')
      .set('authorization', 'Bearer '+tokenPartner)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(0)
         req2ID = res.body.id;
         done();
      })
   })

   it('Criar um Pedido, pelo usuário 2.', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         parceiroId: partnerId,
         observacoes: 'DispEntrega true'
      }

      chai.request(base_url)
      .post('/pedido')
      .set('authorization', 'Bearer '+tokenRequester2)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(0)
         req3ID = res.body.id;
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

   after(done =>{
      Pedido.destroy({
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