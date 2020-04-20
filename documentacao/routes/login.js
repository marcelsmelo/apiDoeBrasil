
/**
  @swagger
  {
    "/usuario/novo/": {
      "post": {
        "description": "Adiciona um novo o usuário",
        "produces": "application/json",
        "parameters":[{
          name: "usuario",
          description: "Objeto Usuário a ser inserido",
          in: "body",
          requiered:true,
          "schema": {
              "$ref": "#/definitions/Usuario"
            }
        }],
        "responses": {
          "201": {
            "description": "Usuário criado com sucesso.",
            "schema": {
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "usuario": { 
                  "$ref": "#/definitions/Usuario"
                }
              }
              
            }
          },
          "401":{
            "description": "Erro ao executar a operação",
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error": { "type":"string"}
              }
            }
          }
        }
     }
    },
    "/login": {
      "post": {
        "description": "Realiza o login do usuário",
        "produces": "application/json",
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
            "schema": {
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error": { "type":"string"}
              }
            }
          },
          "500":{
            "description": "Erro ao executar a operação",
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error": { "type":"string"}
              }
            }
          }
        }
     }
    },
    "/logout": {
      "post": {
        "description": "Realiza o logout do usuário",
        "produces": "application/json",
        "security": [
          { "bearerAuth": [] }
        ],
        "responses": {
          "200": {
            "description": "Usuário logado com sucesso.",
            "schema": {
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error": { "type":"string"}
              }
            }
          },
          "500":{
            "description": "Erro ao executar a operação",
            "schema":{
              "type":"object",
              "properties":{
                "msg": { "type":"string"},
                "error": { "type":"string"}
              }
            }
          }
        }
     }
    }
  }
*/