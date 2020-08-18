const app = require('../bin/www')

let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
let Usuario = require('../models/Usuario')

chai.use(chaiHttp);


chai.use(chaiHttp);

describe("Parceiro Tests",()=>{ 
   let tokenParceiro;


   let parceiro1 = {
      nome:'Prefeitura de Morrinhos',
      cpfCnpj: '33333333333',
      telefone:'+55 34 99636-1111',
      email: 'prefeitura@morrinhos.com.br',
      sobre:'Prefeitura de Rio quente, juntos com você kkkkkk',
      senha: '123456',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro:'Felício Chaves',
      estado: 'GO',  
      cidade: 'Morrinhos'
   }

   let parceiro2 = {
      nome:'Prefeitura de Rio Quente',
      cpfCnpj: '22222222222',
      telefone:'+55 34 99636-5555',
      senha: '123456',
      email: 'prefeitura@rioquente.com.br',
      sobre:'Prefeitura de Rio quente, juntos com você kkkkkk',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro:'Felício Chaves',
      estado: 'GO',  
      cidade: 'Rio Quente'
   }

   let parceiro3 = {
      nome:'Parceiro 3',
      cpfCnpj: '11111111111',
      telefone:'+55 34 99636-3333',
      senha: '123456',
      email: 'parceiro@naosei.com.br',
      sobre:'Grupo de apoio a familias em situação de vulnerabilidade social de alguma cidade',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro:'Felício Chaves',
      estado: 'GO',  
      cidade: 'Rio Quente'
   }

   let acao1 = {
      nome: "Ação 01",
      descricao: "Ação para auxilio durante a pandemia Covid-19",
      dataInicio: Date.now(),
      aberto: true
   }

   let acao2 = {
     nome: "Ação 02",
     descricao: "Ação permanente para atendimento de Rio Quente",
     dataInicio: Date.now(),
     aberto: true
  }

  let acao3 = {
      nome: "Ação 03 - Fechada",
      descricao: "Ação permanente",
      dataInicio: Date.now(),
      dataFim: Date.now(),
      aberto: false
   }


   it('Create a new Parceiro 1', (done) => {
      chai.request(base_url)
         .post('/parceiro/signup/')
         .send(parceiro1)
         .end((err, res) => {
            console.log(res.body)
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            done();
         })
   })

   it('Create a new Parceiro 2', (done) => {
      chai.request(base_url)
         .post('/parceiro/signup/')
         .send(parceiro2)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            done();
         })
   })

   it('Create a new Parceiro 3', (done) => {
      chai.request(base_url)
         .post('/parceiro/signup/')
         .send(parceiro3)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            done();
         })
   })

   it("Realizar o login como parceiro",(done)=>{
      chai.request(base_url)
      .post('/parceiro/login/')
      .send({cpfCnpj: parceiro2.cpfCnpj, senha: parceiro2.senha})
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        tokenParceiro = res.body.token
        done();
      })
    });


    it('Cadastrar uma nova acao pelo Parceiro Logado', (done)=>{
      chai.request(base_url)
       .post('/acao')
       .send(acao1)
       .set('authorization', 'Bearer '+tokenParceiro)
       .end((err, res)=>{
         expect(res).to.have.status(200);
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
       }) 
    })

    it('Cadastrar uma nova acao pelo Parceiro Logado', (done)=>{
      chai.request(base_url)
       .post('/acao')
       .send(acao2)
       .set('authorization', 'Bearer '+tokenParceiro)
       .end((err, res)=>{
         expect(res).to.have.status(200);
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
       }) 
    })

    
    it('Cadastrar uma nova acao pelo Parceiro Logado', (done)=>{
      chai.request(base_url)
       .post('/acao')
       .send(acao3)
       .set('authorization', 'Bearer '+tokenParceiro)
       .end((err, res)=>{
         expect(res).to.have.status(200);
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
       }) 
    })

});