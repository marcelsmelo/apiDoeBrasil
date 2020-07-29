/**
@swagger
{
  "/acao/": {
    "get": {
      "description": "Busca as ações de um parceiro específico e/ou por ID. Deve ser passado, pelo menos, o parceiroID ou ID da ação.",
      "tags":['Ação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "(OPCIONAL) ID da ação",
          'in': "query",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        },
        {
          'name': "parceiroId",
          'description': "(OPCIONAL) ID do parceiro criador da Ação",
          'in': "query",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        },
        {
          'name': "ativo",
          'description': "(OPCIONAL) Buscar ações ativas ou inativas vinculadas a um parceiro. É necessário passar o parceiroId.",
          'in': "query",
         'requiered':true,
          "schema": {
            'type': 'boolean'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayAcoes"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    },
     "post": {
      "description": "Adiciona uma nova Ação vinculada ao Parceiro logado (Disponível apenas para o Parceiros)",
      "tags":['Ação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        "$ref":"#/components/parameters/acaoParam"
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
    "put": {
      "description": "Altera a Ação do ID informado (Disponível apenas para o Parceiro responsável)",
      "tags":['Ação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da Ação",
          'in': "query",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        },
         "$ref":"#/components/parameters/AcaoParam"
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
      "description": "Remove a Ação do ID informado (Disponível apenas para o Parceiro responsável)",
      "tags":['Ação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da Ação",
          'in': "query",
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
  "/acao/me": {
    "get": {
      "description": "Busca as Ações vinculadas ao Parceiro logado. Disponível apenas para o Parceiro Responsável",
      "tags":['Ação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayAcoes"
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
}
*/