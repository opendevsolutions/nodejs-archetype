import express = require('express');
import bodyParser = require('body-parser');

export default (app: express.Application) => {
    app.use(bodyParser.json({limit: "50mb"}));
    // sumar todo middleware que se quiera utilizar
}