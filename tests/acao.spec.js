let chai = require("chai");
let chaiHttp = require('chai-http')
let expect = chai.expect;
const base_url = 'http://localhost:3000';
const Usuario = require('../models/Usuario')
const Acao = require('../models/Acao')

chai.use(chaiHttp);

describe("Teste de Ações",()=>{

   let tokenParceiro;
   let tokenUsuarioParceiro;
   let tokenUsuario;

   let userPartnerId;
   let parceiroId;

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

   let partner = {
      nome: 'Partner',
      telefone: '+55 34 99636-8899',
      cpfCnpj: '85236974102',
      senha: '123456',
      descricao: "Descrição do parceiro!",
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro: 'Felício Chaves',
      estado: 'GO',
      cidade: 'Morrinhos'
    }
   
    let userPartner = {
      nome: 'Usuario Parceiro',
      telefone: '+55 34 99636-8888',
      cpfCnpj: '12345678910',
      senha: '123456',
      rua: 'FC 05',
      numero: 'QA L6',
      complemento: 'Casa 02',
      bairro: 'Felício Chaves',
      estado: 'GO',
      cidade: 'Morrinhos'
    }

    let acao1 = {
       nome: "Ação 01",
       descricao: "Ação para auxilio durante a pandemia Covid-19",
       dataInicio: Date.now(),
       aberto: true
    }

    let acao2 = {
      nome: "Ação 02",
      descricao: "Ação permanente para atendimento de Morrinhos",
      dataInicio: Date.now(),
      aberto: true
   }

    before(done => {
      // runs once before the first test in this block
      chai.request(base_url)
           .post('/signup/usuario/')
           .send(user)
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
           .post('/signup/usuario/')
           .send(userPartner)
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
           .post('/signup/parceiro/')
           .send(partner)
           .end((err, res) => {
              expect(res).to.have.status(201)
              expect(res.body).to.be.a('object')
              expect(res.body).to.have.property('msg')
              done();
           })
    });

   it("Realizar o login como parceiro",(done)=>{
      chai.request(base_url)
      .post('/parceiro/login')
      .send({cpfCnpj: partner.cpfCnpj, senha: partner.senha})
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        tokenParceiro = res.body.token
        done();
      })
    });

    it("Realizar o login como usuário",(done)=>{
      chai.request(base_url)
      .post('/usuario/login')
      .send({cpfCnpj: user.cpfCnpj, senha: user.senha})
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        tokenUsuario = res.body.token
        done();
      })
    });

    it("Buscar todos os usuários (U) da cidade do parceiro logado",(done)=>{
      chai.request(base_url)
      .get('/usuario')
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.have.lengthOf(2)
        userPartnerId = res.body[1].id;
        done();
      })
    });

    it("Transformar Usuario (U) em Usuário-Parceiro (UP) vinculado-o ao parceiro logado",(done)=>{
      chai.request(base_url)
      .put('/parceiro/usuario/')
      .query({'id': userPartnerId})
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('msg')
        done();
      })
    });

    it("Realizar o login do usuário-parceiro como Parceiro",(done)=>{
      chai.request(base_url)
      .post('/parceiro/login')
      .send({cpfCnpj: userPartner.cpfCnpj, senha: userPartner.senha})
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        tokenUsuarioParceiro = res.body.token
        done();
      })
    });

    it('Recuperar os dados do parceiro logado', (done)=>{
      chai.request(base_url)
      .get('/me')
      .set('authorization', 'Bearer '+tokenParceiro)
      .end((err, res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('id')
        expect(res.body.nome).to.be.equal(partner.nome)
        parceiroId = res.body.id
        done();
      })
    })

    //Iniciar testes de Ações
    it('Buscar todas ações do parceiro logado', (done)=>{
       chai.request(base_url)
       .get('/acao/me')
       .set('authorization', 'Bearer '+tokenParceiro)
       .end((err, res)=>{
         expect(res).to.have.status(200);
         expect(res.body).to.have.lengthOf(0)
         done();
       })
    })

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

    it('Não permite que o Usuário cadastre uma nova acao', (done)=>{
      chai.request(base_url)
       .post('/acao')
       .send(acao2)
       .set('authorization', 'Bearer '+tokenUsuario)
       .end((err, res)=>{
         expect(res).to.have.status(403);
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('error')
         done();
       }) 
    })

    it('Cadastrar uma nova acao pelo Usuário-Parceiro Logado como Parceiro', (done)=>{
      chai.request(base_url)
       .post('/acao')
       .send(acao2)
       .set('authorization', 'Bearer '+tokenUsuarioParceiro)
       .end((err, res)=>{
         expect(res).to.have.status(200);
         expect(res.body).to.be.a('object')
         expect(res.body).to.have.property('msg')
         done();
       }) 
    })

    it('Buscar todas ações do parceiro logado', (done)=>{
      chai.request(base_url)
      .get('/acao')
      .query({parceiroId: parceiroId})
      .set('authorization', 'Bearer '+tokenUsuario)
      .end((err, res)=>{
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(2)
        done();
      })
   })

  
   // it('Get 0 Pontos de Entrega owned by logged Parceiro', (done)=>{
   //    chai.request(base_url)
   //    .get('/meus-pontos-entrega')
   //    .set('authorization', 'Bearer '+tokenParceiro)
   //    .end((err, res)=>{
   //       expect(res).to.have.status(200)
   //       expect(res.body).to.be.an('array')
   //       expect(res.body.length).to.be.equal(0)
   //       done();
   //    })
   // })

   // it('Try create a new Ponto de Entrega by logged Parceiro', (done)=>{
   //    chai.request(base_url)
   //    .post('/ponto-entrega/')
   //    .send(pontoEntrega)
   //    .set('authorization', 'Bearer '+tokenParceiro)
   //    .end((err, res)=>{
   //       expect(res).to.have.status(200)
   //       expect(res.body).to.be.an('object')
   //       pontoEntregaId = res.body.id
   //       done();
   //    })
   // })

   // it('Get All Pontos de Entrega owned by logged Parceiro', (done)=>{
   //    chai.request(base_url)
   //    .get('/meus-pontos-entrega')
   //    .set('authorization', 'Bearer '+tokenParceiro)
   //    .end((err, res)=>{
   //       expect(res).to.have.status(200)
   //       expect(res.body).to.be.an('array')
   //       expect(res.body.length).to.be.equal(1)
   //       done();
   //    })
   // })

   // it('Get a Ponto de Entrega by ID (User)', (done)=>{
   //    chai.request(base_url)
   //    .get('/ponto-entrega/'+pontoEntregaId)
   //    .send(pontoEntrega)
   //    .set('authorization', 'Bearer '+tokenUsuario)
   //    .end((err, res)=>{
   //       expect(res).to.have.status(200)
   //       expect(res.body).to.be.an('object')
   //       expect(res.body.id).to.be.equal(pontoEntregaId)
   //       expect(res.body.nome).to.be.equal(pontoEntrega.nome)
   //       done();
   //    })
   // })

   // it('Get all Pontos de Entrega owned by de Partner ID (User)', (done)=>{
   //    chai.request(base_url)
   //    .get('/ponto-entrega/parceiro/'+parceiroId)
   //    .set('authorization', 'Bearer '+tokenUsuario)
   //    .end((err, res)=>{
   //       expect(res).to.have.status(200)
   //       expect(res.body).to.be.an('array')
   //       expect(res.body.length).to.be.equal(1)
   //       done();
   //    })
   // })

   // it('Try edit a exist Ponto de Entrega by logged Parceiro', (done)=>{
   //    let pontoEntregaEdit ={
   //       nome:'Casa Rosa Edit',
   //       telefone:'+55 64 99636-3333',
   //       rua: 'Teste 01',
   //       numero: '222',
   //       complemento: 'Casa 03',
   //       bairro:'Centro',
   //       estado: 'GO',  
   //       cidade: 'Morrinhos'
   //    }

   //    chai.request(base_url)
   //    .put('/ponto-entrega/'+pontoEntregaId)
   //    .send(pontoEntregaEdit)
   //    .set('authorization', 'Bearer '+tokenParceiro)
   //    .end((err, res)=>{
   //       expect(res).to.have.status(200)
   //       expect(res.body).to.be.an('object')
   //       expect(res.body).to.have.property('msg')
   //       done();
   //    })
   // })

   // it('Not Permit that User remove a Ponto de Entrega owned by de Partner', (done)=>{
   //    chai.request(base_url)
   //    .delete('/ponto-entrega/'+pontoEntregaId)
   //    .set('authorization', 'Bearer '+tokenUsuario)
   //    .end((err, res)=>{
   //       expect(res).to.have.status(403)
   //       expect(res.body).to.be.an('object')
   //       expect(res.body).to.have.property('msg')
   //       done();
   //    })
   // })

   // it('Get remove a Ponto de Entrega owned by de Partner', (done)=>{
   //    chai.request(base_url)
   //    .delete('/ponto-entrega/'+pontoEntregaId)
   //    .set('authorization', 'Bearer '+tokenParceiro)
   //    .end((err, res)=>{
   //       expect(res).to.have.status(200)
   //       expect(res.body).to.be.an('object')
   //       expect(res.body).to.have.property('msg')
   //       done();
   //    })
   // })

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
      Acao.destroy({
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