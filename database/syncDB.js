require("./dbMysql");

const Usuario = require("../models/Usuario");
const Acao = require("../models/Acao");
const Pedido = require("../models/Pedido");
const Doacao = require("../models/Doacao");

Usuario.sync().then(() => {
  Acao.sync().then(() => {
    Doacao.sync().then(() => {
      Pedido.sync().then(() => {
        console.log("Sincronização realizada com sucesso!");
      });
    });
  });
});
