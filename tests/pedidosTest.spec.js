let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
let Pedido = require('../models/Pedido')
let Doacao = require('../models/Doacao')


chai.use(chaiHttp);

describe("Pedidos test",()=>{

   let tokenRequester;
   let tokenGiver;
   let pedidoId;
   let pedido2Id
   let pedidoDoacaoID

   let requester = {
      nome: 'Solicitante',
      telefone: '+55 34 99636-8888',
      senha: '123456789',
      cidade: 'Morrinhos'
   }

   let giver = {
      nome: 'Giver',
      telefone: '+55 34 99636-9999',
      senha: '123456789',
      cidade: 'Morrinhos'
   }


   before(done => {
      // runs once before the first test in this block
      chai.request(base_url)
      .post('/usuario/login')
      .send({telefone: requester.telefone, senha: requester.senha})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.property('token')
         tokenRequester = res.body.token
         done();
      })
    });

    before(done => {
      // runs once before the first test in this block
      chai.request(base_url)
      .post('/usuario/login')
      .send({telefone: giver.telefone, senha: giver.senha})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.property('token')
         tokenGiver = res.body.token
         done();
      })
    });

   it("Get all Pedidos owned by User Logged (Requester)", (done) => {
      chai.request(base_url)
      .get('/pedido')
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(0)
         done()
      })
   });

   it("Try create a new Pedido", done =>{
      let pedido = {
         generoAlimenticio: true,
         higienePessoal: false, 
         artigoLimpeza: true, 
         mascara: false, 
         observacoes: 'Entrega após as 18h'
      }

      chai.request(base_url)
      .post('/pedido')
      .set('authorization', 'Bearer '+tokenRequester)
      .send(pedido)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.mascara).to.be.equal(pedido.mascara)
         pedidoId = res.body.id
         done();
      })
   })

   it("Not permit to create a new Pedido", done =>{
      let pedido = {
         generoAlimenticio: false,
         higienePessoal: false, 
         artigoLimpeza: false, 
         mascara: false, 
         observacoes: 'Entrega após as 18h'
      }

      chai.request(base_url)
      .post('/pedido')
      .set('authorization', 'Bearer '+tokenRequester)
      .send(pedido)
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('error')
         done();
      })
   })

   it('Create a new Donation with pedidoId', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false, 
         artigoLimpeza: true, 
         mascara: false,
         pedidoId: pedidoId,
         observacoes: 'Entrega após as 18h'
      }

      chai.request(base_url)
      .post('/doacao')
      .set('authorization', 'Bearer '+tokenGiver)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(0)
         pedidoDoacaoID = res.body.id
         done();
      })
   })

   it("Get all Pedidos owned by User Logged (Giver)", (done) => {
      chai.request(base_url)
      .get('/pedido')
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(0)
         done();
      })
   });

   it("Not Permit edit a exists Pedido, status=1", done =>{
      let pedido = {
         generoAlimenticio: true,
         higienePessoal: true, 
         artigoLimpeza: true, 
         mascara: true, 
         observacoes: 'Entrega após as 18h (altered)'
      }

      chai.request(base_url)
      .put('/pedido/'+pedidoId)
      .set('authorization', 'Bearer '+tokenRequester)
      .send(pedido)
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it("Not permit edit a exists Pedido by not owned User (Giver)", done =>{
      let pedido = {
         generoAlimenticio: false,
         higienePessoal: true, 
         artigoLimpeza: true, 
         mascara: false, 
         observacoes: 'Entrega após as 18h'
      }

      chai.request(base_url)
      .put('/pedido/'+pedidoId)
      .set('authorization', 'Bearer '+tokenGiver)
      .send(pedido)
      .end((err, res)=>{
         expect(res).to.have.status(403)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('error')
         done();
      })
   })

  

   it("Try create a second new Pedido", done =>{
      let pedido = {
         generoAlimenticio: false,
         higienePessoal: false, 
         artigoLimpeza: true, 
         mascara: false, 
         observacoes: 'Entrega após as 18h'
      }

      chai.request(base_url)
      .post('/pedido')
      .set('authorization', 'Bearer '+tokenRequester)
      .send(pedido)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.mascara).to.be.equal(pedido.mascara)
         pedido2Id = res.body.id
         done();
      })
   })

   it("Get all Open Pedidos (Status=0) owned by Logged User (Requester)", (done) => {
      chai.request(base_url)
      .get('/pedido/status/0')
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(1)
         done()
      })
   });

   it("Permit edit a exists Open Pedido (status=0)", done =>{
      let pedido = {
         generoAlimenticio: true,
         higienePessoal: true, 
         artigoLimpeza: true, 
         mascara: true, 
         observacoes: 'Entrega após as 18h (altered)'
      }

      chai.request(base_url)
      .put('/pedido/'+pedido2Id)
      .set('authorization', 'Bearer '+tokenRequester)
      .send(pedido)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it("Get all Waiting delivery Pedidos (Status=1) owned by Logged User (Requester)", (done) => {
      chai.request(base_url)
      .get('/pedido/status/0')
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(1)
         done()
      })
   });

   it("Finish Pedido of User's Logged", (done) => {
      chai.request(base_url)
      .put('/pedido/finalizar/'+pedidoId)
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done()
      })
   });

   it("Donation linked by Pedido must be finished", (done)=>{
      chai.request(base_url)
      .get('/doacao/'+pedidoDoacaoID)
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(3)
         done()
      })
   })

   it("Not permit Finish Pedido with status=0", (done) => {
      chai.request(base_url)
      .put('/pedido/finalizar/'+pedido2Id)
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done()
      })
   });

   it("Get all Finished Pedidos (Status=2) from User's Logged City", (done) => {
      chai.request(base_url)
      .get('/pedido/status/2')
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(1)
         done()
      })
   });

   it("Get all Open Pedidos from User's Logged City", (done) => {
      chai.request(base_url)
      .get('/pedidos-nao-atendidos/')
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(1)
         done()
      })
   });

   it("Try remove a exists Pedido owned by Logged User (Requester)", done =>{
      chai.request(base_url)
      .delete('/pedido/'+pedido2Id)
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it("Not permit remove a exists Pedido by not owner User (Giver)", done =>{
      chai.request(base_url)
      .delete('/pedido/'+pedidoId)
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('error')
         done();
      })
   })

   it("Not permit remove a exists Pedido finished", done =>{
      chai.request(base_url)
      .delete('/pedido/'+pedidoId)
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('error')
         done();
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

   after(done =>{
      Doacao.destroy({
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
})