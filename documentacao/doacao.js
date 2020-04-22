/**
@swagger
{
  "/doacao/{id}": {
    "get": {
      "description": "Busca a Doação pelo ID informado",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da doação",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/singleDoacao"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    },
    "put": {
      "description": "Altera a Doação pelo ID informado",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da doação",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        },
         "$ref":"#/components/parameters/doacaoParam"
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
      "description": "Remove a Doação pelo ID informado",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da doação",
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
  "/doacao/": {
    "get": {
      "description": "Busca todas as doações da cidade do usuário logado",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayDoacoes"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    },
    "post": {
      "description": "Adiciona uma nova Doação vinculadas ao usuário logado",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        "$ref":"#/components/parameters/doacaoParam"
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/singlePedido"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    }
  },
  "/doacao/status/{status}": {
    "get": {
      "description": "Busca todas as Doações no Status informado na cidade do usuário logado",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "status",
          'description': "Status da doação <br><br> 0 - Não atendido <br> 1 - Aguardando Retirada <br> 2 - Aguardando Entrega <br> 3 - Finalizado",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayDoacoes"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    }
  },
  "/minhas-doacoes/": {
    "get": {
      "description": "Busca todas as Doações vinculadas ao usuário logado",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayDoacoes"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    }
  },
  "/minhas-doacoes/status/{status}": {
    "get": {
      "description": "Busca todas as Doações no Status informado vinculadas ao usuário logado",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "status",
          'description': "Status da doação <br><br> 0 - Não atendido <br> 1 - Aguardando Retirada <br> 2 - Aguardando Entrega <br> 3 - Finalizado",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayDoacoes"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    }
  },
  "/doacao/status/{id}": {
    "put": {
      "description": "Altera o Status da Doação informada pelo ID ",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do doação",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        },
        {
          'name': "status",
          'description': "Status da doação <br><br> 0 - Não atendido <br> 1 - Aguardando Retirada <br> 2 - Aguardando Entrega <br> 3 - Finalizado",
          'in': "body",
         'requiered':true,
          "schema": {
            'type': 'object',
            "properties":{
                "status": {'type': 'integer', enum: [0, 1, 2]}
            }
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
}
*/