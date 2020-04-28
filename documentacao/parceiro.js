/**
@swagger
{
  "/parceiro/{id}": {
    "get": {
      "description": "Busca o Parceiro pelo ID informado",
      "tags":['Parceiro'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do parceiro",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/singleParceiro"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    },
    "put": {
      "description": "Altera o Parceiro pelo ID informado (somente para Parceiros)",
      "tags":['Parceiro'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do Parceiro",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        },
         "$ref":"#/components/parameters/parceiroParam"
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
      "description": "Remove o Parceiro pelo ID informado (somente para Parceiros)",
      "tags":['Parceiro'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
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
          "$ref": "#/components/responses/singleMsg"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    }
  },
  "/parceiro/" : {
    "get": {
      "description": "Busca todos os Parceiros da cidade do usuário logado",
      "tags":['Parceiro'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayParceiros"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    },
    "post": {
      "description": "Adiciona um novo Parceiro vinculados ao usuário logado (somente para Parceiros)",
      "tags":['Parceiro'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        "$ref":"#/components/parameters/parceiroParam"
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/singleParceiro"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    }
  }
}
*/