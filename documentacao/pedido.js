/**
@swagger
{
  "/pedido/{id}": {
    "get": {
      "description": "Busca o pedido pelo ID informado",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do pedido",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/singlePedido"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    },
    "put": {
      "description": "Altera o pedido pelo ID informado",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do pedido",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        },
         "$ref":"#/components/parameters/pedidoParam"
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
      "description": "Remove o pedido pelo ID informado",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do pedido",
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
  "/pedido/": {
    "get": {
      "description": "Busca todos os pedidos da cidade do usuário logado",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayPedidos"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    },
    "post": {
      "description": "Adiciona um novo Pedido vinculados ao usuário logado",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        "$ref":"#/components/parameters/pedidoParam"
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
  "/pedido/status/{status}": {
    "get": {
      "description": "Busca todos os pedidos pelo Status informado na cidade do usuário logado",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "status",
          'description': "Status do pedido <br><br> 0 - Não atendido <br> 1 - Aguardando Entrega <br> 2 - Finalizado",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayPedidos"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    }
  },
  "/meus-pedidos/": {
    "get": {
      "description": "Busca todos os pedidos vinculados ao usuário logado",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayPedidos"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    }
  },
  "/meus-pedidos/status/{status}": {
    "get": {
      "description": "Busca todos os pedidos pelo Status informado vinculados ao usuário logado",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "status",
          'description': "Status do pedido <br><br> 0 - Não atendido <br> 1 - Aguardando Entrega <br> 2 - Finalizado",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        }
      ],
      "responses": {
        "200":{
          "$ref": "#/components/responses/arrayPedidos"
        },
        "500":{
          "$ref": "#/components/responses/genericError"
        }
      }
    }
  },
  "/pedido/status/{id}": {
    "put": {
      "description": "Altera o Status do pedido informado pelo ID",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do pedido",
          'in': "path",
         'requiered':true,
          "schema": {
            'type': 'integer'
          }
        },
        {
          'name': "status",
          'description': "Status do projeto <br><br> 0 - Não atendido <br> 1 - Aguardando Entrega <br> 2 - Finalizado",
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