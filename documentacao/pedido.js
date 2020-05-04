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
  "/pedido/nao-atendidos": {
    "get": {
      "description": "Busca todos os pedidos Não Atendidos (status = 0 ) da cidade do usuário logado",
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
  "/pedido/status/{status}": {
    "get": {
      "description": "Busca todos os pedidos pelo Status informado na cidade do usuário logado e atendidos pelo Parceiro Logado (Somente para Parceiros)",
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
          'description': "Status da doação <br><br> 0 - Não Atendida <br> 1 - Aguardando entrega <br> 2 - Finalizado",
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
  "/pedido/confirmar/{id}": {
    "put": {
      "description": "O usuário confirma o recebimento da doação para o pedido informado pelo ID <br> Status = 2 (finalizado) <br> Neste momento é finalizada a doação vinculada, caso exista. ",
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
  "/pedido/atender/{id}": {
    "put": {
      "description": "O Parceiro seleciona o pedido, pelo ID, para ser atendido (Somente para parceiros) <br> Status = 1 (Aguardando Entrega)",
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
  "/pedido/finalizar/{id}": {
    "put": {
      "description": "O Parceiro seleciona o pedido, pelo ID, para ser finalizado, após realizar a entrega (Somente para parceiros) <br> Status = 2 (finalizado)",
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
  "/pedido/minhas-entregas": {
    "get": {
      "description": "Busca todos os Pedidos a serem entregues pelo Parceiro Logado (Permitido somente para Parceiros)",
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
}
*/