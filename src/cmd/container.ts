import { createContainer, asClass, asFunction } from 'awilix';
import express = require('express');
import { scopePerRequest } from 'awilix-express'
import { BandServiceImpl } from '../services/impl/bandServiceImpl';
import { BandRepositoryImpl } from '../persistence/impl/bandRepositoryImpl';
import { SqlClientWrapper } from '../persistence/client/impl/sqlClientWrapper';

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({

        // services
        bandService: asClass(BandServiceImpl).scoped(),

        // repositories
        bandRepository: asClass(BandRepositoryImpl).scoped(),

        // clients
        sqlClientBanda: asFunction(() => getSqlClientInstance('Banda')).scoped(),
        sqlClientLider: asFunction(() => getSqlClientInstance('Lider')).scoped()
    });

    app.use(scopePerRequest(container));
}

let getSqlClientInstance = (entity: string) => {
    return new SqlClientWrapper(entity);
}