import express = require('express');
import bodyParser = require('body-parser');
var cors = require('cors');

export default (app: express.Application) => {
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(cors());
}