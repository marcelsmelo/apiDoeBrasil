let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
const Parceiro = require('../models/Parceiro')
let Pedido = require('../models/Pedido')
let Doacao = require('../models/Doacao')


chai.use(chaiHttp);

describe("Parceiro Tests",()=>{ 
   let tokenUsuario;
   let tokenParceiro;
   let tokenUsuarioParceiro;

   let parceiroId;
   let pedidoId;
   let doacaoId;
   let doacao2Id;
   let userPartnerId;

   let partner = {
      nome:'Prefeitura de Morrinhos',
      telefone:'+55 34 99636-3333',
      senha: '123456789',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro:'Felício Chaves',
      estado: 'GO',  
      cidade: 'Morrinhos'
   }

   let userPartner = {
      nome: 'User Partner',
      telefone: '+55 34 99636-8899',
      senha: '123456789',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro: 'Felício Chaves',
      estado: 'GO',
      cidade: 'Morrinhos'
   }

   let user = {
      nome: 'Marcel Melo',
      telefone: '+55 34 99636-8898',
      senha: '123456789',
   }

   before(done => {
      // runs once before the first test in this block
      chai.request(base_url)
      .post('/usuario/login')
      .send({telefone: user.telefone, senha: user.senha})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.property('token')
         tokenUsuario = res.body.token
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
      .set('authorization', 'Bearer '+tokenUsuario)
      .send(pedido)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.mascara).to.be.equal(pedido.mascara)
         pedidoId = res.body.id
         done();
      })
   })

   before(done =>{
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
      .set('authorization', 'Bearer '+tokenUsuario)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(1)
         doacaoId = res.body.id
         done();
      })
   })

  before(done =>{
      let doacao = {
         generoAlimenticio: false,
         higienePessoal: false, 
         artigoLimpeza: true, 
         mascara: true,
         dispEntrega: false,
         observacoes: 'Entrega após as 30h'
      }

      chai.request(base_url)
      .post('/doacao')
      .set('authorization', 'Bearer '+tokenUsuario)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(1)
         doacao2Id = res.body.id
         done();
      })
   })

   before(done=>{
      chai.request(base_url)
      .post('/usuario/')
      .send(userPartner)
      .end((err, res) => {
         expect(res).to.have.status(201)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         expect(res.body).to.have.property('usuario')
         expect(res.body.usuario.nome).to.equal(userPartner.nome);
         userPartnerId = res.body.usuario.id
         done();
      })
   })


  it("Try login with not exist Parceiro",(done)=>{
      chai.request(base_url)
      .post('/parceiro/login')
      .send({telefone:'+55 33 33333-3333', senha: '123456789'})
      .end((err, res)=>{
         expect(res).to.have.status(500)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('error')
         done();
      })
   });

   it('Create a new Parceiro', (done)=>{
      chai.request(base_url)
      .post('/parceiro')
      .send(partner)
      .end((err, res)=>{
         expect(res).to.have.status(201)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('nome')
         expect(res.body.nome).to.be.equal(partner.nome)
         parceiroId = res.body.id;
         done();
      })
   })

   it('Try login on created Parceiro', (done)=>{
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

   it('Set User a User-Partner by the Partner', (done)=>{
      chai.request(base_url)
      .put('/usuario/parceiro/'+userPartnerId)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Try login on created Usuario-Parceiro', (done)=>{
      chai.request(base_url)
      .post('/parceiro/login')
      .send({telefone: userPartner.telefone, senha: userPartner.senha})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.property('token')
         tokenUsuarioParceiro = res.body.token
         done();
      })
   })

   it('Permit edit a created Parceiro by the owner', (done)=>{
      let parceiro = {
         nome:'Prefeitura de Morrinhos',
         telefone:'+55 64 99636-3333',
         rua: 'Avenida Senador Hermenegildo',
         numero: '160',
         complemento: '',
         bairro:'Centro',
         estado: 'GO',  
         cidade: 'Morrinhos'
      }

      chai.request(base_url)
      .put('/parceiro/')
      .send(parceiro)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('NOT Permit edit a created Parceiro by the Usuario-Parceiro', (done)=>{
      chai.request(base_url)
      .put('/parceiro/')
      .send(partner)
      .set('authorization', 'Bearer '+tokenUsuarioParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(403)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Permit remove a created Parceiro by the owner', (done)=>{
      chai.request(base_url)
      .delete('/parceiro/')
      .send(partner)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   //app.get('/parceiro/doacao/disponivel', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.disponivelParceiro)
   it('Get all available Doacoes on the Partner city', (done)=>{
      chai.request(base_url)
      .get('/parceiro/doacao/disponivel')
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.a('array')
         expect(res.body.length).to.be.equal(2)
         done();
      })
   })

   it('Get all available Doacoes on the User-Partner city', (done)=>{
      chai.request(base_url)
      .get('/parceiro/doacao/disponivel')
      .set('authorization', 'Bearer '+tokenUsuarioParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.a('array')
         expect(res.body.length).to.be.equal(2)
         done();
      })
   })

   it('Not permit Users see available Doacoes on city', (done)=>{
      chai.request(base_url)
      .get('/parceiro/doacao/disponivel')
      .set('authorization', 'Bearer '+tokenUsuario)
      .end((err, res)=>{
         expect(res).to.have.status(403)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it("Get 0 Donations owned by Partner Logged", (done) => {
      chai.request(base_url)
      .get('/doacao/')
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(0)
         done()
      })
   });
   
   //app.put('/parceiro/doacao/selecionar/:id', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.selecionarParaRetirada);
   it('Select Doacao by the Partner', (done)=>{
      chai.request(base_url)
      .put('/parceiro/doacao/selecionar/'+doacaoId)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Select Doacao by the User-Partner', (done)=>{
      chai.request(base_url)
      .put('/parceiro/doacao/selecionar/'+doacao2Id)
      .set('authorization', 'Bearer '+tokenUsuarioParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it("Get all Donations owned by Logged Partner", (done) => {
      chai.request(base_url)
      .get('/doacao/')
      .set('authorization', 'Bearer '+tokenUsuarioParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(2)
         done()
      })
   });
   
   it("Get 0 Pedidos selected by Partner Logged", (done) => {
      chai.request(base_url)
      .get('/pedido')
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(0)
         done();
      })
   });

   //app.put('/parceiro/pedido/atender/:id', auth.jwtVerify, auth.groupVerify(['P', 'A']), controller.selecionarParaAtender
   it('Select Pedido by the Partner', (done)=>{
      chai.request(base_url)
      .put('/parceiro/pedido/atender/'+pedidoId)
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it("Get all Pedidos selected by Partner Logged", (done) => {
      chai.request(base_url)
      .get('/pedido')
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('array')
         expect(res.body.length).to.be.equal(1)
         done();
      })
   });

   after(done=>{
      Parceiro.destroy({
         where: {},
         cascade: true
      })
      .then(()=>{
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
});