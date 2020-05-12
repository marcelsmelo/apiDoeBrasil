/**
@swagger
  {
    "/usuario": {
      "post": {
        "description": "Adiciona um novo o usuário",
        "tags":['Usuário'],
        "parameters":[
          "$ref": "#/components/parameters/userParam"
        ],
        "responses": {
          "201": {
            "description": "Usuário criado com sucesso.",
            "content":{
              "application/json":{
                "schema": {
                  "type":"object",
                  "properties":{
                    "msg": { "type":"string"},
                    "usuario": { 
                      "$ref": "#/components/schemas/Usuario"
                    }
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
    "/usuario/login": {
      "post": {
        "description": "Realiza o login do Usuário",
        "tags":['Usuário'],
        "parameters":[
          {
            name: "telefone",
            description: "Telefone do usuário ",
            in: "body",
            requiered:true,
            "schema": {
              "type": "string"
            }
          },
          {
            name: "senha",
            description: "Senha do usuário ",
            in: "body",
            requiered:true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Usuário logado com sucesso.",
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
    "/usuario/logout": {
      "post": {
        "description": "Realiza o logout do usuário",
        "tags":['Usuário'],
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
          }
        }
     }
    },
    "/usuario/parceiro/{id}": {
      "post": {
        "description": "Permite que o Parceiro cadastrado selecione o Usuário (ID) como Parceiro <br> Disponível apenas para Parceiros",
        "tags":['Usuário'],
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