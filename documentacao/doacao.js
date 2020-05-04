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
    "post": {
      "description": "Adiciona uma nova Doação vinculadas ao usuário logado <br> O status da doação dependerá dos dados informados podendo ser:<br>0 - Aguardando Entrega <br>1 - Aguardando retirada",
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
  "/doacao/em-aberto": {
    "get": {
      "description": "Busca todas as doações Em Aberto (aguardando um parceiro para buscá-las) na cidade do parceiro logado. (Permitido apenas para parceiros)",
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
  },
  "/doacao/status/{status}": {
    "get": {
      "description": "Busca todas as Doações no Status informado na cidade do usuário logado (Permitido apenas para parceiros)",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "status",
          'description': "Status da doação <br><br> 0 - Aguardando Entrega <br> 1 - Aguardando Retirada (parceiro) <br> 2 - Aguardando confirmação de entrega <br> 3 - Finalizado",
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
          'description': "Status da doação <br><br> 0 - Aguardando Entrega <br> 1 - Aguardando Retirada (parceiro) <br> 2 - Aguardando confirmação de entrega <br> 3 - Finalizado",
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
  "/doacao/confirmar/{id}": {
    "put": {
      "description": "Confirma a entrega da Doação informada pelo ID <br> (status = 2 (Aguardando Confirmação) <br> É aguardado o usuário que realizou o pedido ou o parceiro confirmar recebimento. ",
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
  "/doacao/finalizar/{id}": {
    "put": {
      "description": "Finaliza a entrega da Doação informada pelo ID (Somente para parceiros)<br> status = 3 (Finalizada) ",
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
   "/doacao/selecionar/{id}": {
    "put": {
      "description": "Seleciona a Doação para retirada pelo Parceiro Logado (Somente para Parceiros)",
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
    "/doacao/minhas-retiradas": {
    "get": {
      "description": "Busca Doações aguardando retirada pelo Parceiro Logado (Somente para Parceiros)",
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
}
*/