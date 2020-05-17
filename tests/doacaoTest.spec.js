let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
let Pedido = require('../models/Pedido')
let Doacao = require('../models/Doacao')


chai.use(chaiHttp);

describe("Donation tests",()=>{

   let tokenRequester;
   let tokenGiver;
   let doacaoId;
   let doacao2Id
   let pedidoId;
   let doacaoPedidoId

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

   before(done=>{
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

   it('Create a new Donation without pedidoId and dispEntrega=false', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false, 
         artigoLimpeza: true, 
         mascara: false,
         dispEntrega: false,
         observacoes: 'Entrega após as 18h'
      }

      chai.request(base_url)
      .post('/doacao')
      .set('authorization', 'Bearer '+tokenGiver)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(1)
         doacaoId = res.body.id
         done();
      })
   })

   it('Create a another Donation without pedidoId and dispEntrega=false', done =>{
      let doacao = {
         generoAlimenticio: false,
         higienePessoal: false, 
         artigoLimpeza: true, 
         mascara: false,
         dispEntrega: false,
         observacoes: 'Entrega após as 30h'
      }

      chai.request(base_url)
      .post('/doacao')
      .set('authorization', 'Bearer '+tokenGiver)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(1)
         doacao2Id = res.body.id
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
         doacaoPedidoId = res.body.id
         done();
      })
   })

   it("Get Pedido By ID", (done) => {
      chai.request(base_url)
      .get('/pedido/'+pedidoId)
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(1)
         expect(res.body.atendidoPorUsuario).to.be.not.null
         done()
      })
   });

   it('Not permit create a new Donation with dispEntrega=false and parceiroId=null', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false, 
         artigoLimpeza: true, 
         mascara: false,
         dispEntrega: true,
         observacoes: 'Entrega após as 18h'
      }

      chai.request(base_url)
      .post('/doacao')
      .set('authorization', 'Bearer '+tokenGiver)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })


   it("Get All Donations owned by Logged User (Giver)", (done) => {
      chai.request(base_url)
      .get('/doacao/')
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(3)
         done()
      })
   });

   it("Get 0 Donations owned by Logged User (Requester)", (done) => {
      chai.request(base_url)
      .get('/doacao/')
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(0)
         done()
      })
   });

   it('Try Edit a Donation owned by Logged User', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: true, 
         artigoLimpeza: true, 
         mascara: true,
         observacoes: 'Entrega após as 20h'
      }

      chai.request(base_url)
      .put('/doacao/'+doacaoId)
      .set('authorization', 'Bearer '+tokenGiver)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Not permit Edit a Donation owned by Logged User (Requester)', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: true, 
         artigoLimpeza: true, 
         mascara: true,
         observacoes: 'Entrega após as 20h'
      }

      chai.request(base_url)
      .put('/doacao/'+doacaoId)
      .set('authorization', 'Bearer '+tokenRequester)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(403)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('error')
         done();
      })
   })

   it('Finish a Donation owned by Logged User', done =>{
      chai.request(base_url)
      .put('/doacao/finalizar/'+doacaoId)
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Not permit Edit a Donation finished by Logged User', done =>{
      let doacao = {
         generoAlimenticio: false,
         higienePessoal: false, 
         artigoLimpeza: false, 
         mascara: true,
         observacoes: 'Entrega após as 20h'
      }

      chai.request(base_url)
      .put('/doacao/'+doacaoId)
      .set('authorization', 'Bearer '+tokenGiver)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('error')
         done();
      })
   })

   it("Get All Donations waiting confirmation(status=2) owned by Logged User (Giver)", (done) => {
      chai.request(base_url)
      .get('/doacao/status/2')
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(1)
         done()
      })
   });

   it("Get All Delivery Donations (status=0) owned by Logged User (Giver)", (done) => {
      chai.request(base_url)
      .get('/doacao/status/0')
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(1)
         done()
      })
   });

   it("Not permit remove a Finished Donation owned by Logged User (Giver)", (done) => {
      chai.request(base_url)
      .delete('/doacao/'+doacaoId)
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('error')
         done()
      })
   });

   it("Remove a Donation owned by Logged User (Giver)", (done) => {
      chai.request(base_url)
      .delete('/doacao/'+doacao2Id)
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done()
      })
   });

   it("Remove a Donation linked by a Pedido owned by Logged User (Giver)", (done) => {
      chai.request(base_url)
      .delete('/doacao/'+doacaoPedidoId)
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done()
      })
   });

   it("Get Pedido linked to a Donation of User's Logged (Requester)", (done) => {
      chai.request(base_url)
      .get('/pedido/'+pedidoId)
      .set('authorization', 'Bearer '+tokenRequester)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(0)
         done()
      })
   });

   it("Get All Finished Donations (status=3) owned by Logged User (Giver)", (done) => {
      chai.request(base_url)
      .get('/doacao/status/3')
      .set('authorization', 'Bearer '+tokenGiver)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(0)
         done()
      })
   });

   // after(done =>{
   //    Pedido.destroy({
   //       where: {},
   //       cascade: true
   //    })
   //    .then(success=>{
   //       done()
   //    })
   //    .catch(error=>{
   //       done(error)
   //    })
   // })

   // after(done =>{
   //    Doacao.destroy({
   //       where: {},
   //       cascade: true
   //    })
   //    .then(success=>{
   //       done()
   //    })
   //    .catch(error=>{
   //       done(error)
   //    })
   // })

});