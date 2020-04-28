/** 
  @swagger
  {
    "components":{
      "schemas":{
        "Usuario":{
          "properties":{
            "id":{"type":"integer"},
            "nome":{"type":"string"},
            "telefone":{"type":"string"},
            "senha":{"type":"string"},
            "rua": {"type":"string"},
            "numero": {"type":"string"},
            "bairro":{"type":"string"},
            "complemento":{"type":"string"},
            "cidade":{"type":"string"},
            "estados":{"type":"string"},
            "group": {"type": "string", "enum":["U", "R", "P", "A"]}
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
            "usuarioId":{"type:":"integer"},
            "atendidoPor":{"type": "integer"},
            "atendidoPorGroup":{"type": "string"},
            "status": {"type": "string", "enum":[0,1,2]}
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
            "usuarioId":{"type:":"integer"},
            "status": {"type": "string", "enum":[0,1,2,3]},
            "pedidoId": {"type:":"integer"},
            "parceiroId":{"type:":"integer"},
            "pontoEntregaId": {"type:":"integer"}
          }
        },
        "Parceiro":{
          "properties":{
            "id":{"type":"integer"},
            "nome":{"type":"string"},
            "telefone":{"type":"string"},
            "rua": {"type":"string"},
            "numero": {"type":"string"},
            "bairro":{"type":"string"},
            "complemento":{"type":"string"},
            "cidade":{"type":"string"},
            "estado":{"type":"string"}
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
