let Usuario = require('../models/Usuario')
const Parceiro = require('../models/Parceiro');


describe("Entrega de cidades pela UF do Estado",()=>{

   it('Remove all Usuario data created on Test', done =>{
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
   });

   it('Delete all Parceiro data', done=>{
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

   // it('Remove all Pedido data created on Test', done =>{
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
   // });

   // it('Remove all Pedido data created on Test', done =>{
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
   // });
});

