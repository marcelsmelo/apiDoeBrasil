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
        }
      }
    },
    "put": {
      "description": "Altera o Ponto de Entrega pelo ID informado (Somente o parceiro responsável)",
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
        }
      }
    },
    "delete": {
      "description": "Remove o Ponto de Entrega pelo ID informado (somente o parceiro responsável)",
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
        }
      }
    }
  },
  "/ponto-entrega/" : {
    "post": {
      "description": "Adiciona um novo Ponto de Entrega vinculados ao Parceiro logado (Somente o parceiro responsável)",
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
        }
      }
    }
   },
   "/meus-pontos-entrega/": {
    "get": {
      "description": "Busca todos os Pontos de Entrega vinculados Parceiro logado (Somente o Parceiro responsável)",
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
        }
      }
    }
   }
}
*/