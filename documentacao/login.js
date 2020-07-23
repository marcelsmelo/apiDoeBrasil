/**
@swagger
  {
    "/signup/usuario": {
      "post": {
        "description": "Cadastra um novo o usuário",
        "tags":['Login'],
        "parameters":[
          "$ref": "#/components/parameters/userParam"
        ],
        "responses": {
          "201": {
            "$ref": "#/components/responses/singleMsg"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          }
        }
      }
    },
     "/signup/parceiro": {
      "post": {
        "description": "Cadastra um novo o usuário como Parceiro",
        "tags":['Login'],
        "parameters":[
          "$ref": "#/components/parameters/userParam"
        ],
        "responses": {
          "201": {
            "$ref": "#/components/responses/singleMsg"
          },
          "500":{
            "$ref": "#/components/responses/genericError"
          }
        }
      }
    },
    "/login": {
      "post": {
        "description": "Realiza o login do usuário cadastrado. ",
        "tags":['Login'],
        "parameters":[
          {
            name: "cpfCnpj",
            description: "CPF/CNPJ do Usuário ",
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
    "/logout": {
      "post": {
        "description": "Realiza o logout do usuário",
        "tags":['Login'],
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
   "/meus-dados/": {
      "post": {
        "description": "Retorna todos os dados do Usuário Logado. ",
        "tags":['Login'],
        "security": [
          { "BearerAuth": [] }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/singleUsuario"
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