/**
@swagger
{
  "/pedido/": {
    "get": {
      "description": "Busca todos os Pedidos vinculados ao Usuário/Parceiro logado. Opcionalmente é possível passar parâmetros para realizar filtros no resultado <br><br> Status: 0 - Aguardando Atendimento; 1 - Aguardando Entrega; 2 - Finalizado  ",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "(OPCIONAL) ID do pedido",
          'in': "query",
         'required':true,
          "schema": {
            'type': 'integer'
          }
        },{
          'name': "status",
          'description': "(OPCIONAL) Status da Doação - Busca todos pedidos vinculados ao usuário/parceiro logado com o status informado <br> Status:<br> 0 - Aguardando Atendimento;<br> 1 - Aguardando Entrega;<br> 2 - Finalizado",
          'in': "query",
         'required':false,
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
    },
    "post": {
      "description": "Adiciona um novo Pedido vinculado ao Usuário/Parceiro logado <br><br>Caso seja criada pelo usuário, é obrigatório informar o ID do Parceiro.<br> Caso seja criadda pelo Parceiro, é obrigatório informar o ID do usuário.",
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
    },
    "put": {
      "description": "Altera o Pedido com ID informado em parâmetro. Permitido apenas para o Usuário/Parceiro que criou a Doação. <br> O pedido só pode ser removido caso ainda não tenha sido atendido (status=0 - Aguardando Atendimento) ",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do Pedido",
          'in': "query",
         'required':true,
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
      "description": "Remove o Pedido com ID informado. <br> O pedido só pode ser removido caso ainda não tenha sido atendido (status=0 - Aguardando Atendimento)",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do Pedido",
          'in': "query",
         'required':true,
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
  "/pedido/finalizar/": {
    "put": {
      "description": "Finaliza o Pedido com o ID informado em parâmetro<br> O pedido pode ser finalizado pelo Usuário que o criou ou pelo Parceiro vinculado.",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID do pedido",
          'in': "query",
         'required':true,
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
  "/pedido/aberto/": {
    "get": {
      "description": "Verifica se o Usuário possui um pedido aberto (status=0) OU em atendimento (status=1)",
      "tags":['Pedido'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[{
          'name': "usuarioId",
          'description': "ID do usuário - Obrigatório quando a pesquisa for realizada pelo Parceiro Logado",
          'in': "query",
         'required':true,
          "schema": {
            'type': 'integer'
          }
        }],
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
}
*/