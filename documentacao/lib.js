/**
@swagger
{
  components:{
    parameters:{
      'userParam':{
        'description': "Objeto Usuário",
        'in': "body",
        'requiered':true,
        "schema": {
          "$ref": "#/components/schemas/Usuario"
        }
      },
      'pedidoParam':{
        'description': "Objeto Pedido",
        'in': "body",
        'requiered':true,
        "schema": {
          "$ref": "#/components/schemas/Pedido"
        }
      },
      'doacaoParam':{
        'description': "Objeto Doação",
        'in': "body",
        'requiered':true,
        "schema": {
          "$ref": "#/components/schemas/Doacao"
        }
      }
    },
    responses: {
      "genericError": {
        "description": "Erro ao executar a operação",
        "content":{
          "application/json":{
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error": { "type":"string"}
              }
            }
          }
        }
      },
      "singleMsg":{
        "description": "Operação realizada com sucesso",
        "content":{
          "application/json":{
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"}
              }
            }
          }
        }
      },
      "arrayPedidos":{
        "description": "Array de pedidos solicitados",
        "content":{
          "application/json":{
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/Pedido"
              }
            }
          }
        }
      },
      "singlePedido":{
        "description": "Pedido solicitado",
        "content":{
          "application/json":{
            "schema":{
              "$ref":"#/components/schemas/Pedido"
            }
          }
        }
      },
      "arrayDoacoes":{
        "description": "Array de doações solicitadas",
        "content":{
          "application/json":{
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/Doacao"
              }
            }
          }
        }
      },
      "singleDoacao":{
        "description": "Doação solicitada",
        "content":{
          "application/json":{
            "schema":{
              "$ref":"#/components/schemas/Doacao"
            }
          }
        }
      }
    }
  }
}
*/