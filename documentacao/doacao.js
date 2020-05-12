/**
@swagger
{
  "/doacao/{id}": {
    "get": {
      "description": "Busca a Doação pelo ID informado em parâmetro",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da Doação",
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    },
    "put": {
      "description": "Altera a Doação com ID informado em parâmetro criada pelo Usuário logado. <br> A Doação não pode ser atualizada no status=2 (Aguardando confirmação) ou status=3 (Finalizada)",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da Doação",
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
      "description": "Remove a Doação com ID informado criada pelo usuário logado. <br> A Doação não pode ser removida no status=2 (Aguardando Confirmação) ou status=3 (Finalizada)",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da Doação",
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
  "/doacao/": {
     "get": {
      "description": "Busca todas as Doações criadas pelo Usuário logado OU vinculadas ao Parceiro logado",
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    },
    "post": {
      "description": "Adiciona uma nova Doação vinculada ao usuário logado <br> O status da doação dependerá dos dados informados podendo ser:<br>0 - Aguardando Entrega <br>1 - Aguardando retirada <br> Permitido apenas para Usuários",
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
  "/doacao/status/{status}": {
    "get": {
      "description": "Busca todas as Doações com o Status informado criadas pelo Usuário logado OU vinculadas ao Parceiro logado.",
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    }
  },
  "/doacao/finalizar/{id}": {
    "put": {
      "description": "Confirma a entrega da Doação criada pelo Usuário Logado OU vinculada ao Parceiro logado. <br> Se finalizada pelo Usuário, é definido status=2 (Aguardando confirmação) e se finalizada pelo Parceiro é definido status=3 (Finalizada)",
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
    "/parceiro/doacao/disponivel": {
    "get": {
      "description": "Busca todas Doações disponíveis para retirada na cidade dos Parceiro logado. (Permitido apenas para parceiros)",
      "tags":['Parceiro'],
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        },
        "403":{
          "$ref": "#/components/responses/acessoError"
        }
      }
    },
  },
  "/parceiro/doacao/selecionar/{id}": {
    "get": {
      "description": "Permite que um parceiro selecione uma doação para retirada. (Permitido apenas para parceiros)",
      "tags":['Parceiro'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[],
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
  },
}
*/