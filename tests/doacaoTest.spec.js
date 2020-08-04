const app = require('../bin/www')

let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
let Doacao = require('../models/Doacao')
let Usuario = require('../models/Usuario')

chai.use(chaiHttp);

describe("Donation tests",()=>{
   let partnerId;
   let giverId;
   let giver2Id;
   
   let tokenPartner;
   let tokenGiver;
   let tokenGiver2;


   let doacaoId1;
   let doacaoId2;
   let doacaoId3;

   let giver = {
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

   let giver2 = {
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
           .send(giver)
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
           .send(giver2)
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
      .send({cpfCnpj: giver.cpfCnpj, senha: giver.senha})
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        tokenGiver = res.body.token
        done();
      })
    });

    before(done => {
      chai.request(base_url)
      .post('/usuario/login')
      .send({cpfCnpj: giver2.cpfCnpj, senha: giver2.senha})
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        tokenGiver2 = res.body.token
        done();
      })
    });

   before(done => {
      chai.request(base_url)
      .get('/parceiro')
      .set('authorization', 'Bearer '+tokenGiver)
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
         giverId = res.body[0].id
         giver2Id = res.body[1].id
         done();
      })
    });

   it('Não permitir criar uma doação, pelo usuário, parceiroID não informado!', done =>{
       let doacao = {
          generoAlimenticio: true,
          higienePessoal: false,
          artigoLimpeza: true,
          outros: 'Qualquer coisa',
          dispEntrega: false,
          observacoes: 'Teste sem parceiroID'
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

   it('Não permitir criar uma doação, pelo Parceiro, usuarioID não informado!', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         dispEntrega: false,
         observacoes: 'Teste sem usuarioID'
      }

     chai.request(base_url)
     .post('/doacao')
     .set('authorization', 'Bearer '+tokenPartner)
     .send(doacao)
     .end((err, res)=>{
        expect(res).to.have.status(500)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('msg')
        done();
     })
  })

   it('Criar uma doação, pelo usuário. (dispEntrega = true)', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         dispEntrega: true,
         parceiroId: partnerId,
         observacoes: 'DispEntrega false'
      }

      chai.request(base_url)
      .post('/doacao')
      .set('authorization', 'Bearer '+tokenGiver)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(0)
         doacaoId1 = res.body.id;
         done();
      })
   })

   it('Criar uma doação, pelo usuário. (dispEntrega = false)', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         dispEntrega: false,
         parceiroId: partnerId,
         observacoes: 'DispEntrega true'
      }

      chai.request(base_url)
      .post('/doacao')
      .set('authorization', 'Bearer '+tokenGiver2)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(1)
         doacaoId2 = res.body.id;
         done();
      })
   })

   it('Criar uma doação, pelo Parceiro. (dispEntrega = true)', done =>{
      let doacao = {
         generoAlimenticio: false,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         dispEntrega: false,
         usuarioId: giverId,
         observacoes: 'Parceiro'
      }

      chai.request(base_url)
      .post('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body.status).to.be.equal(1)
         doacaoId3 = res.body.id;
         done();
      })
   })

   it('Buscar doações criadas pelo usuário.', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenGiver)
      .query({})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(2)
         done();
      })
   })

   it('Buscar doações criadas pelo usuário 2.', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenGiver2)
      .query({})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(1)
         done();
      })
   })

   it('Buscar doações vinculadas ao parceiro logado.', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({})
      .end((err, res)=>{  
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(3)
         done();
      })
   })

   it('Buscar doações vinculadas ao Parceiro pelo status (Aguardando Entrega).', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({status: 0})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(1)
         done();
      })
   })

   it('Buscar doações vinculadas ao Parceiro pelo status (Aguardando retirada).', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({status: 1})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(2)
         done();
      })
   })

   it('Não permitir que o Parceiro edite uma doação que ele não criou', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: true,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         dispEntrega: true,
         observacoes: 'Editado pelo Parceiro'
      }

      chai.request(base_url)
      .put('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({id: doacaoId1})
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(403)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Permitir que o Parceiro edite uma doação que ele criou', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: true,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         dispEntrega: false,
         observacoes: 'Editado pelo Parceiro'
      }

      chai.request(base_url)
      .put('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({id: doacaoId3})
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Permitir que o Usuário edite uma doação que ele criou', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         dispEntrega: false,
         observacoes: 'Editado pelo Usuario'
      }

      chai.request(base_url)
      .put('/doacao')
      .set('authorization', 'Bearer '+tokenGiver)
      .query({id: doacaoId1})
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Não Permitir que o Usuário edite uma doação que ele não criou', done =>{
      let doacao = {
         generoAlimenticio: true,
         higienePessoal: false,
         artigoLimpeza: true,
         outros: 'Qualquer coisa',
         dispEntrega: false,
         observacoes: 'Editado pelo Usuario'
      }

      chai.request(base_url)
      .put('/doacao')
      .set('authorization', 'Bearer '+tokenGiver)
      .query({id: doacaoId2})
      .send(doacao)
      .end((err, res)=>{
         expect(res).to.have.status(403)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Buscar doações vinculadas ao Parceiro pelo status (Aguardando Entrega).', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({status: 0})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(0)
         done();
      })
   })

   it('Buscar doações vinculadas ao Parceiro pelo status (Aguardando retirada).', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({status: 1})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(3)
         done();
      })
   })

   it('Não Permitir que o Parceiro apague uma doação que ele não criou', done =>{
      chai.request(base_url)
      .delete('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({id: doacaoId1})
      .end((err, res)=>{
         expect(res).to.have.status(403)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Permitir que o Parceiro apague uma doação que ele criou', done =>{
      chai.request(base_url)
      .delete('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({id: doacaoId3})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Permitir que o Usuário finalize uma doação que ele criou', done =>{
      chai.request(base_url)
      .put('/doacao/finalizar')
      .set('authorization', 'Bearer '+tokenGiver)
      .query({id: doacaoId1})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Permitir que o Parceiro finalize uma doação a ele vinculado', done =>{
      chai.request(base_url)
      .put('/doacao/finalizar')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({id: doacaoId2})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.be.an('object')
         expect(res.body).to.have.property('msg')
         done();
      })
   })

   it('Buscar doações vinculadas ao Parceiro pelo status (Aguardando retirada).', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({status: 1})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(0)
         done();
      })
   })

   it('Buscar doações vinculadas ao Parceiro pelo status (Aguardando Confirmação).', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({status: 2})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(1)
         done();
      })
   })

   it('Buscar doações vinculadas ao Parceiro pelo status (Finalizada).', done =>{
      chai.request(base_url)
      .get('/doacao')
      .set('authorization', 'Bearer '+tokenPartner)
      .query({status: 3})
      .end((err, res)=>{
         expect(res).to.have.status(200)
         expect(res.body).to.have.lengthOf(1)
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