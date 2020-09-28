/**
@swagger
  {
    "/usuario/" : {
      "get": {
        "description": "Busca todos os Usuários (U), sem vinculação com algum ao Parceiro (P), na cidade do Parceiro logado. Caso seja passado um ID OU cpfCnpj como parâmetro, filtra somente o Usuário (U) com o ID ou CPF/CNPJ informado. <br> Disponível apenas para Parceiro (P)",
        "tags":['Usuário'],
        "security": [
            { "BearerAuth": [] }
          ],
        "parameters":[
          {
          'name': "id",
          'description': "(OPCIONAL) ID do Usuário",
          'in': "query",
         'required':false,
          "schema": {
            'type': 'integer'
          }
        },{
          'name': "cpfCnpj",
          'description': "(OPCIONAL) CPF ou CNPJ do usúario",
          'in': "query",
         'required':false,
          "schema": {
            'type': 'integer'
          }
        }
        ],
        "responses": {
          "200":{
            "$ref": "#/components/responses/arrayUsuarios"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          },
          "401":{
            "$ref": "#/components/responses/autenticacaoError"
          },
          "403":{
            "$ref": "#/components/responses/acessoError"
          }
        }
      },
      "put":{
        "description": "Edita os dados do Usuário (U) ou Usuário-Parceiro (UP) logado.",
        "tags":['Usuário'],
        "security": [
            { "BearerAuth": [] }
          ],
        "parameters":[],
        "responses": {
          "200":{
            "$ref": "#/components/responses/singlemsg"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          },
          "401":{
            "$ref": "#/components/responses/autenticacaoError"
          }
        }
      },
      "delete": {
        "description": "Remove o Usuário (U) ou Usuário-Parceiro (UP) logado.",
        "tags":['Usuário'],
        "security": [
            { "BearerAuth": [] }
          ],
        "parameters":[],
        "responses": {
          "200":{
            "$ref": "#/components/responses/singlemsg"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          },
          "401":{
            "$ref": "#/components/responses/autenticacaoError"
          }
        }
      },
    },
    "/usuario/hasEmail": {
    "get": {
      "description": "Verifica se o e-mail informado já está cadastrado no sistema.",
      "tags":['Usuário'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "email",
          'description': "E-mail a ser verificado",
          'in': "query",
          'required':true,
          "schema": {
            'type': 'String'
          }
        }
      ],
      "responses": {
        "200":{
          "description": "O e-mail informado já está cadastrado no sistema",
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
        "204":{
          "description": "O e-mail informado NÃO está cadastrado no sistema",
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        },
      }
    },
  },
  "/usuario/hasCpfCnpj": {
    "get": {
      "description": "Verifica se o CPF ou CNPJ informado já está cadastrado no sistema.",
      "tags":['Usuário'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "cpfCnpj",
          'description': "CPF ou CNPJ a ser verificado",
          'in': "query",
          'required':true,
          "schema": {
            'type': 'String'
          }
        }
      ],
      "responses": {
        "200":{
          "description": "O CPF ou CNPJ informado já está cadastrado no sistema",
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
        "204":{
          "description": "O CPF ou CNPJ informado NÃO está cadastrado no sistema",
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        },
      }
    },
  },
  }
*/