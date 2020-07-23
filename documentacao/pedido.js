/**
@swagger
{
  "/pedido/{id}": {
    "get": {
      "description": "Busca um Pedido pelo ID informado pelo parâmetro",
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    },
    "put": {
      "description": "Altera o Pedido com ID informado criado pelo Usuário Logado",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do Pedido",
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
      "description": "Remove o Pedido com ID informado criado pelo Usuário Logado. <br> O pedido só pode ser removido caso ainda não tenha sido atendido por alguma Doação ou Parceiro (status=0)",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do Pedido",
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
  
  "/pedido/": {
    "get": {
      "description": "Busca todos os Pedidos criados pelo Usuário logado ou atendidos pelo Parceiro logado",
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    },
    "post": {
      "description": "Adiciona um novo Pedido vinculado ao Usuário logado",
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    }
  },
  "/pedido/status/{status}": {
    "get": {
      "description": "Busca todos os Pedidos pelo Status informado criados pelo Usuário ou Atendidos pelo Parceiro Logados",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "status",
          'description': "Status da doação <br><br> 0 - Não Atendido <br> 1 - Aguardando entrega <br> 2 - Finalizado",
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    }
  },
  "/pedidos-nao-atendidos": {
    "get": {
      "description": "Busca todos os Pedidos Não Atendidos (status = 0) da cidade do Usuário ou Parceiro logados",
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    }
  },
  "/pedido/finalizar/{id}": {
    "put": {
      "description": "Confirma o recebimento (ou entrega) da Doação para o Pedido informado pelo ID <br> O pedido pode ser finalizado pelo Usuário que o criou ou pelo Parceiro que o esteja atendendo. <br> Em caso de uma Doação vinculada ao Pedido, a Doação é finalizada (status=3) neste momento. ",
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    }
  },
  "/parceiro/pedido/atender/{id}": {
    "put": {
      "description": "Permite que o Parceiro logado seleciona o pedido, pelo ID, para ser Atendido (Disponível apenas para parceiros) <br> Modifica o Status do Pedido para Status = 1 (Aguardando Entrega)",
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