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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    },
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
        },
        "401":{
          "$ref": "#/components/responses/autenticacaoError"
        }
      }
    },
    "post": {
      "description": "Adiciona um novo Parceiro",
      "tags":['Parceiro'],
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
    },
    "put": {
      "description": "Altera o Parceiro logado. O Parceiro só pode ser editado pelo próprio Parceiro, não permitindo para Usuário vinculados",
      "tags":['Parceiro'],
      "security": [
          { "BearerAuth": [] }
        ],
      "parameters":[
         "$ref":"#/components/parameters/parceiroParam"
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
      "description": "Remove o Parceiro logado. O Parceiro só pode ser removido pelo próprio Parceiro.",
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
    }
  },
  "/parceiro/login": {
      "post": {
        "description": "Realiza o login de um Parceiro ou de Usuário vinculado como Parceiro",
        "tags":['Parceiro'],
        "parameters":[
          {
            name: "telefone",
            description: "Telefone do parceiro / Usuário-Parceiro",
            in: "body",
            requiered:true,
            "schema": {
              "type": "string"
            }
          },
          {
            name: "senha",
            description: "Senha do parceiro / Usuário-Parceiro ",
            in: "body",
            requiered:true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Parceiro logado com sucesso.",
            "content":{
              "application/json":{
                "schema": {
                  "type":"object",
                  "properties":{
                    "token": { "type":"string"}
                  }
                }
              }
            }
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          }
        }
     }
    },
    "/logout": {
      "post": {
        "description": "Realiza o logout do parceiro ou Usuário logado como Parceiro. (Disponível apenas para Parceiros)",
        "tags":['Parceiro'],
        "security": [
          { "BearerAuth": [] }
        ],
        "responses": {
          "200": {
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
    }
}
*/