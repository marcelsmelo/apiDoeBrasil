/**
@swagger
{
  "/parceiro/usuario/": {
      "put": {
        "description": "Permite que o Parceiro cadastrado selecione o Usuário (ID) como Usuário-Parceiro (UP)<br> Disponível apenas para Parceiro (P)",
        "tags":['Parceiro'],
        "parameters":[
          "$ref": "#/components/parameters/idParam"
        ],
        "security": [
          { "BearerAuth": [] }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/singleMsg"
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
       "delete": {
        "description": "Remove a vinculação de um Usuário-Parceiro (ID) ao Parceiro Logado. Ao final o Usuário-Parceiro (UP) voltará a ter atribuições apenas de Usuários (U) <br> Disponível apenas para Parceiro (P)",
        "tags":['Parceiro'],
        "parameters":[
          "$ref": "#/components/parameters/idParam"
        ],
        "security": [
          { "BearerAuth": [] }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/singleMsg"
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
      "get": {
        "description": "Busca todos os Usuários-Parceiros (UP) vinculados ao Parceiro (P) logado. Caso seja passado um ID como parâmetro, realiza retorna o Usuári0-Parceiro com o ID informado <br> Disponível apenas para Parceiro (P)",
        "tags":['Parceiro'],
        "parameters":[
          "$ref": "#/components/parameters/optionalIdParam"
        ],
        "security": [
            { "BearerAuth": [] }
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
    },
    "/parceiro/" : {
      "get": {
        "description": "Busca todos os Parceiros (P) cadastrados na cidade do usuário logado. Caso seja passado um ID como parâmetro, realiza retorna o Parceiro com o ID informado",
        "tags":['Parceiro'],
        "parameters":[
          "$ref": "#/components/parameters/optionalIdParam"
        ],
        "security": [
            { "BearerAuth": [] }
          ],
        "responses": {
          "200":{
            "$ref": "#/components/responses/arrayParceiros"
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
        "description": "Edita os dados do Parceiro (P) logado.",
        "tags":['Parceiro'],
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
        "description": "Remove o Parceiro (P) logado. Ao remover um Parceiro (P), todos os Usuários-Parceiros (UP) vinculados a este Parceiro serão transformados em Usuários (U)",
        "tags":['Parceiro'],
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
    }
}
*/