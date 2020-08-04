/**
@swagger
{
  "/doacao/": {
    "get": {
      "description": "Busca a Todas Doações vinculadas ao Usuário/Parceiro Logado. Opcionalmente é possível passar parâmetros para realizar filtros no resultado <br><br> Status: 0 - Aguardando Entrega; 1 - Aguardando Retirada; 2 - Aguardando confirmação; 3 - Finalizada",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "(OPCIONAL) ID da Doação - Busca doação com o ID informado.",
          'in': "query",
         'required':false,
          "schema": {
            'type': 'integer'
          }
        },{
          'name': "status",
          'description': "(OPCIONAL) Status da Doação - Busca todas doações vinculadas ao usuário/parceiro logado com o status informado <br> Status:<br> 0 - Aguardando Entrega;<br> 1 - Aguardando Retirada;<br> 2 - Aguardando confirmação;<br> 3 - Finalizada",
          'in': "query",
         'required':false,
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
    },
    "post": {
      "description": "Adiciona uma nova Doação.<br><br>Caso seja criada pelo usuário, é obrigatório informar o ID do Parceiro.<br> Caso seja criadda pelo Parceiro, é obrigatório informar o ID do usuário. <br><br> O status da doação dependerá dos dados informados podendo ser:<br>0 - Aguardando Entrega <br>1 - Aguardando retirada",
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
    },
    "put": {
      "description": "Altera a Doação com ID informado em parâmetro. Permitido apenas para o Usuário/Parceiro que criou a Doação. <br> A Doação não pode ser atualizada no status=2 (Aguardando confirmação) ou status=3 (Finalizada)",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da Doação",
          'in': "query",
         'required':true,
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
      "description": "Remove a Doação com ID informado. Permitido apenas para o Usuário/Parceiro que criou a Doação.  <br> A Doação não pode ser removida no status=2 (Aguardando Confirmação) ou status=3 (Finalizada)",
      "tags":['Doação'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
        {
          'name': "id",
          'description': "ID da Doação",
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
  "/doacao/finalizar/": {
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
}
*/