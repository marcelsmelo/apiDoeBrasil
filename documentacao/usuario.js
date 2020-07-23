/**
@swagger
  {
    "/usuario/" : {
      "get": {
        "description": "Busca todos os Usuários (U), sem vinculação com algum ao Parceiro (P), na cidade do Parceiro logado. Caso seja passado um ID como parâmetro, realiza retorna o Usuário (U) com o ID informado <br> Disponível apenas para Parceiro (P)",
        "tags":['Usuário'],
        "security": [
            { "BearerAuth": [] }
          ],
        "parameters":[
          "$ref": "#/components/parameters/optionalIdParam"
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