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
            "observacoes": {"type":"string"}
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
            "dispEntrega":{"type":"boolean"}
          }
        }
      }
    }
  }
*/