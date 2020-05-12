/**
@swagger
{
  "/ponto-entrega/{id}": {
    "get": {
      "description": "Busca o Ponto de Entrega pelo ID informado",
      "tags":['Ponto de Entrega'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do Ponto de Entrega",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/singlePontoEntrega"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    },
    "put": {
      "description": "Altera o Ponto de Entrega pelo ID informado (Disponível apenas pelo Parceiro responsável)",
      "tags":['Ponto de Entrega'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do Ponto de Entrega",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        },
         "$ref":"#/components/parameters/pontoEntregaParam"
      ],
      "responses": {
        "200":{
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
      "description": "Remove o Ponto de Entrega pelo ID informado (Disponível apenas para Parceiro responsável)",
      "tags":['Ponto de Entrega'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do Ponto de Entrega",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
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
    }
  },
  "/ponto-entrega/" : {
    "post": {
      "description": "Adiciona um novo Ponto de Entrega vinculado ao Parceiro logado (Disponível apenas para o Parceiros)",
      "tags":['Ponto de Entrega'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        "$ref":"#/components/parameters/pontoEntregaParam"
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/singlePontoEntrega"
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
    }
  },
  "/ponto-entrega/parceiro/{parceiroId}": {
    "get": {
      "description": "Busca os Pontos de Entrega vinculados ao ID do Parceiro informado",
      "tags":['Ponto de Entrega'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "parceiroId",
          'description': "ID do Parceiro",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayPontosEntrega"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    }
   },
   "/meus-pontos-entrega/": {
    "get": {
      "description": "Busca todos os Pontos de Entrega vinculados Parceiro logado (Disponível apenas para o Parceiro responsável)",
      "tags":['Ponto de Entrega'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayPontosEntrega"
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
    }
   }
}
*/