/**
  @swagger
  {
    "/cidades/{uf}": {
      "post": {
        "description": "Retorna as cidades do estado passado como parâmetro",
        "tags":['Cidades'],
        "parameters":[{
          name: "uf",
          description: "Sigla do estado",
          in: "path",
          requiered:true,
          type: string,
          'example': 'GO'
        }],
        "responses": {
          "200": {
            "description": "Cidades do estado desejado.",
            "content":{
              "application/json":{
                "schema": {
                  "type":"object",
                  "properties":{
                    "sigla": { "type":"string"},
                    "nome": { "type":"string"},
                    "cidades": { 
                      type: "array",
                      items: "string"
                    }
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