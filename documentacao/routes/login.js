
/**
  @swagger
  {
    "/signup": {
      "post": {
        "description": "Adiciona um novo o usuário",
        "tags":['Login'],
        "parameters":[{
          name: "usuario",
          description: "Objeto Usuário a ser inserido",
          in: "body",
          requiered:true,
          "schema": {
              "$ref": "#/components/schemas/Usuario"
            }
        }],
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
            "description": "Erro ao executar a operação",
            "content":{
              "application/json":{
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
                    "msg": { "type":"string"},
                    "error": { "type":"string"}
                  }
                }
              }
            }
          },
          "500":{
            "description": "Erro ao executar a operação",
            "content":{
              "application/json":{
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
    },
    "/logout": {
      "post": {
        "description": "Realiza o logout do usuário",
        "tags":['Login'],
        "produces": "application/json",
        "security": [
          { "BearerAuth": [] }
        ],
        "responses": {
          "200": {
            "description": "Usuário logado com sucesso.",
            "content":{
              "application/json":{
                "schema": {
                  "type":"object",
                  "properties":{
                    "msg": { "type":"string"},
                    "error": { "type":"string"}
                  }
                }
              }
            }
          },
          "500":{
            "description": "Erro ao executar a operação",
            "content":{
              "application/json":{
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
    }
  }
*/