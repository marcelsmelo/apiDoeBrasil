let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';

chai.use(chaiHttp);

describe("Create Users for Test", () => {
   // a funcao it eh o que vamos testar realmente, neste caso o endpoint /cards, que deve retornar no maximo 100 cartas
   let user = {
      nome: 'Marcel Melo',
      telefone: '+55 34 99636-8898',
      senha: '123456789',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro: 'Felício Chaves',
      estado: 'GO',
      cidade: 'Morrinhos'
   }

   let requester = {
      nome: 'Solicitante',
      telefone: '+55 34 99636-8888',
      senha: '123456789',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro: 'Felício Chaves',
      estado: 'GO',
      cidade: 'Morrinhos'
   }

   let giver = {
      nome: 'Giver',
      telefone: '+55 34 99636-9999',
      senha: '123456789',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro: 'Felício Chaves',
      estado: 'GO',
      cidade: 'Morrinhos'
   }

   // let partner = {
   //    nome: 'User Partner',
   //    telefone: '+55 34 99636-8899',
   //    senha: '123456789',
   //    rua: 'FC 05',
   //    numero: 'QA L6',
   //    complemento: 'Casa 02',
   //    bairro: 'Felício Chaves',
   //    estado: 'GO',
   //    cidade: 'Morrinhos'
   // }

   it('Create a new User', (done) => {
      chai.request(base_url)
         .post('/usuario/')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            expect(res.body).to.have.property('usuario')
            expect(res.body.usuario.nome).to.equal(user.nome);
            done();
         })
   })

   it('Create a new Request-user', (done) => {
      chai.request(base_url)
         .post('/usuario/')
         .send(requester)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            expect(res.body).to.have.property('usuario')
            expect(res.body.usuario.nome).to.equal(requester.nome);
            done();
         })
   })

   it('Create a new Giver-user', (done) => {
      chai.request(base_url)
         .post('/usuario/')
         .send(giver)
         .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            expect(res.body).to.have.property('usuario')
            expect(res.body.usuario.nome).to.equal(giver.nome);
            done();
         })
   })

   // it('Create a new Partner-user', (done) => {
   //    chai.request(base_url)
   //       .post('/signup')
   //       .send(partner)
   //       .end((err, res) => {
   //          expect(res).to.have.status(201)
   //          expect(res.body).to.be.a('object')
   //          expect(res.body).to.have.property('msg')
   //          expect(res.body).to.have.property('usuario')
   //          expect(res.body.usuario.nome).to.equal(partner.nome);
   //          done();
   //       })
   // })

   it('Usuário não pode ser criado (telefone já cadastrado)', (done) => {
      chai.request(base_url)
         .post('/usuario/')
         .send(user)
         .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('msg')
            expect(res.body).to.have.property('error')
            done();
         })
   })
});