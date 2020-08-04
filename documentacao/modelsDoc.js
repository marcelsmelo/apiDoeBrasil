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
            "sobre":{"type":"string"},
            "url_image":{"type":"string"},
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
            "outros": {"type":"string"},
            "observacoes": {"type":"string"},
            "dispEntrega":{"type":"boolean"},
            "status": {"type": "string", "enum":[0,1,2,3]},
            "createdBy": {"type": "char", "enum":['U', 'P']},
            "usuarioId":{"type:":"integer"},
            "parceiroId":{"type:":"integer"}
          }
        },
        "Acao":{
          "properties":{
            "id":{"type":"integer"},
            "nome":{"type":"string"},
            "descricao":{"type":"string"},
            "dataInicio": {"type":"date"},
            "dataFim": {"type":"date"},
            "ativo":{"type":"boolean"},
            "parceiroId":{"type:":"integer"}
          }
        },
      }
    }
  }
*/
