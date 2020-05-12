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
      },
      'parceiroParam':{
        'description': "Objeto Parceiro",
        'in': "body",
        'requiered':true,
        "schema": {
          "$ref": "#/components/schemas/Parceiro"
        }
      },
      'pontoEntregaParam':{
        'description': "Objeto PontoEntrega",
        'in': "body",
        'requiered':true,
        "schema": {
          "$ref": "#/components/schemas/PontoEntrega"
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
        "description": "Array de Pedidos solicitados",
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
        "description": "Array de Doações solicitadas",
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
      },
      "arrayParceiros":{
        "description": "Array de Parceiros solicitadas",
        "content":{
          "application/json":{
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/Parceiro"
              }
            }
          }
        }
      },
      "singleParceiro":{
        "description": "Parceiro solicitada",
        "content":{
          "application/json":{
            "schema":{
              "$ref":"#/components/schemas/Parceiro"
            }
          }
        }
      },
      "arrayPontosEntrega":{
        "description": "Array de Pontos de Entrega solicitados",
        "content":{
          "application/json":{
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/PontoEntrega"
              }
            }
          }
        }
      },
      "singlePontoEntrega":{
        "description": "PontoEntrega solicitado",
        "content":{
          "application/json":{
            "schema":{
              "$ref":"#/components/schemas/PontoEntrega"
            }
          }
        }
      },
      "autenticacaoError":{
        "description": "Erro na autenticação ou verificação do token de acesso!",
        "content":{
          "application/json":{
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error":{ "type": "string"}
              }
            }
          }
        }
      },
      "acessoError":{
        "description": "O usuário não tem acesso a esta rota!",
        "content":{
          "application/json":{
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error":{ "type": "string"}
              }
            }
          }
        }
      },
    }
  }
}
*/