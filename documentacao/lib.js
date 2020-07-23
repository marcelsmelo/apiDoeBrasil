/**
@swagger
{
  components:{
    parameters:{
      'idParam':{
        'description': "ID do elemento",
        'in': 'query',
        'required': true,
        "schema":{
          "type": "int"
        }
      },
      'optionalIdParam':{
        'description': "ID do elemento (Opcional)",
        'in': 'query',
        'required': false,
        "schema":{
          "type": "int"
        }
      },
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
        "description": "Array de Parceiros solicitados",
        "content":{
          "application/json":{
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/Usuario"
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
              "$ref":"#/components/schemas/Usuario"
            }
          }
        }
      },
      "arrayUsuarios":{
        "description": "Array de Usuários solicitados",
        "content":{
          "application/json":{
            "schema":{
              "type":"array",
              "items":{
                "$ref":"#/components/schemas/Usuario"
              }
            }
          }
        }
      },
      "singleUsuario":{
        "description": "Usuário solicitado",
        "content":{
          "application/json":{
            "schema":{
              "$ref":"#/components/schemas/Usuario"
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