import express = require('express');
import { loadControllers } from 'awilix-express';
import middleware from './middleware';
import loadContainer from './container';

export const app: express.Application = express();

loadContainer(app);
middleware(app);
app.use(loadControllers(
    '../controllers/*.ts',
    { cwd: __dirname }
));
