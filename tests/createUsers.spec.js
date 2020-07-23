let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
let Usuario = require('../models/Usuario')

chai.use(chaiHttp);

describe("Create Users for Test", () => {
   // a funcao it eh o que vamos testar realmente, neste caso o endpoint /cards, que deve retornar no maximo 100 cartas
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

   // let requester = {
   //    nome: 'Solicitante',
   //    telefone: '+55 34 99636-8888',
   //    cpfCnpj: '12345678910',
   //    senha: '123456',
   //    rua: 'FC 05',
   //    numero: 'QA L6',
   //    complemento: 'Casa 02',
   //    bairro: 'Felício Chaves',
   //    estado: 'GO',
   //    cidade: 'Morrinhos'
   // }

   // let giver = {
   //    nome: 'Giver',
   //    telefone: '+55 34 99636-9999',
   //    cpfCnpj: '32165498701',
   //    senha: '123456',
   //    rua: 'FC 05',
   //    numero: 'QA L6',
   //    complemento: 'Casa 02',
   //    bairro: 'Felício Chaves',
   //    estado: 'GO',
   //    cidade: 'Morrinhos'
   // }

   let partner = {
      nome: 'User Partner',
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

   it('Create a new User', (done) => {
      chai.request(base_url)
         .post('/signup/usuario/')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            done();
         })
   })

   it('Create a new Partner-user', (done) => {
      chai.request(base_url)
         .post('/signup/parceiro')
         .send(partner)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            done();
         })
   })

   it('Usuário não pode ser criado (usuário já cadastrado)', (done) => {
      chai.request(base_url)
         .post('/signup/usuario/')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            expect(res.body).to.have.property('error')
            done();
         })
   })

   it('Usuário não pode ser criado (usuário já cadastrado)', (done) => {
      chai.request(base_url)
         .post('/signup/parceiro/')
         .send(partner)
         .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            expect(res.body).to.have.property('error')
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