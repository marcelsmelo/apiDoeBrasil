/**
@swagger
  {
    "/signup": {
      "post": {
        "description": "Adiciona um novo o usuário",
        "tags":['Login'],
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
          "401":{
            "$ref": "#/components/responses/genericError"
          }
        }
     }
    },
    "/login": {
      "post": {
        "description": "Realiza o login do usuário",
        "tags":['Login'],
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
          }
        }
     }
    }
  }
*/