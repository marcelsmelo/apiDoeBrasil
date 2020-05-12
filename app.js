const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//Documentação Swagger
//Importar Swagger-ui-Express e SwaggerJSDoc
const swaggerUi = require('swagger-ui-express');
let swaggerJSDoc = require('swagger-jsdoc');


global.logger = require('winston');
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, { colorize: true });
logger.level = 'error';

let app = express();
const load = require('express-load');

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


//==========================================================
//================= Banco de Dados =========================
//==========================================================
// mongoose.Promise = global.Promise;
// const connection = require('./config/dbMongo.js')(mongoose);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(morgan('dev'));

//app.use(morgan(':date[clf] - :method :url :status :response-time ms - :res[content-length]'))
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//==========================================================
//================= Docs Swagger =========================
//==========================================================

// swagger definition
let swaggerDefinition = {
    openapi: '3.0.1',
    info: {
      title: 'API aplicativo doações', //Nome da API
      version: '1.0.0', //Versão da API
      description: 'API para desenvolvimento de um aplicativo para intermediar doações durante a pandemia de Covid-19',
    },
    host: 'localhost:3000', //URL base da API
    basePath: '/',
    components: {
        securitySchemes:{
            "BearerAuth": { "type": "http", "scheme": "bearer" }
        }
    }
    
  };
  
  // options for the swagger docs
  let options = {
    // import swaggerDefinitions, definido anteriormente
    swaggerDefinition: swaggerDefinition,
    // arquivos que contem especificações para geração da documentação
    apis: ['./documentacao/modelsDoc.js', './documentacao/lib.js', './documentacao/*.js'],
    
  };
  
  // initialize swagger-jsdoc
  let swaggerSpec = swaggerJSDoc(options);

  //Rota para acessar a documentação
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(cors());

/**********************
 ******** ROTAS *******
 **********************/
load('controllers')
    .then('routes')
    .into(app);


// catch 404 and forward to error handler
app.use('/*', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') == 'development'){
    app.use((err, req, res, next)=>{
        res.status(err.status || 500)
        .json({msg: err.message, error: err})
    })
}else{
    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next)=>{
        res.status(err.status || 500)
        .json({msg: err.message})
    })
}

module.exports = app;