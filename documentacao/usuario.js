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
  }
*/