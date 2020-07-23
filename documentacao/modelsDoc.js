/** 
  @swagger
  {
    "components":{
      "schemas":{
        "Usuario":{
          "properties":{
            "id":{"type":"integer"},
            "nome":{"type":"string"},
            "cpfCnpj":{"type":"string"},
            "telefone":{"type":"string"},
            "email":{"type":"string"},
            "senha":{"type":"string"},
            "rua": {"type":"string"},
            "numero": {"type":"string"},
            "bairro":{"type":"string"},
            "complemento":{"type":"string"},
            "cidade":{"type":"string"},
            "estados":{"type":"string"}
          }
        },
        "Pedido":{
          "properties":{
            "id":{"type":"integer"},
            "generoAlimenticio":{"type":"boolean"},
            "higienePessoal":{"type":"boolean"},
            "artigoLimpeza":{"type":"boolean"},
            "mascara": {"type":"boolean"},
            "observacoes": {"type":"string"},
            "status": {"type": "string", "enum":[0,1,2]},
            "usuarioId":{"type:":"integer"},
            "atendidoPorUsuario":{"type": "integer"},
            "atendidoPorParceiro":{"type": "string"},
            
          }
        },
        "Doacao":{
          "properties":{
            "id":{"type":"integer"},
            "generoAlimenticio":{"type":"boolean"},
            "higienePessoal":{"type":"boolean"},
            "artigoLimpeza":{"type":"boolean"},
            "mascara": {"type":"boolean"},
            "observacoes": {"type":"string"},
            "dispEntrega":{"type":"boolean"},
            "status": {"type": "string", "enum":[0,1,2,3]},
            "usuarioId":{"type:":"integer"},
            "pedidoId": {"type:":"integer"},
            "parceiroId":{"type:":"integer"},
            "pontoEntregaId": {"type:":"integer"}
          }
        },
        "PontoEntrega":{
          "properties":{
            "id":{"type":"integer"},
            "nome":{"type":"string"},
            "telefone":{"type":"string"},
            "rua": {"type":"string"},
            "numero": {"type":"string"},
            "bairro":{"type":"string"},
            "complemento":{"type":"string"},
            "cidade":{"type":"string"},
            "estado":{"type":"string"},
            "parceiroId":{"type:":"integer"}
          }
        },
      }
    }
  }
*/
