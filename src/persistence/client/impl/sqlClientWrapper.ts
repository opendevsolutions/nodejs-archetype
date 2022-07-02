import { Repository } from "../../../connection/connection";
import { SqlClient } from "../sqlClient";
import { QueryBuilder } from "../utils/queryBuilder";

export class SqlClientWrapper implements SqlClient {
    private entity: string;

    constructor (entity: string) { this.entity = entity }

    public findAll = async () => {
        const entityRepository = await Repository.getRepository(this.entity);
        let query = entityRepository.createQueryBuilder(this.entity);
        query = QueryBuilder.buildQuery(this.entity, query);
        return await query.getMany();
    }

    public findById = async (id: number) => {
        const entityRepository = await Repository.getRepository(this.entity);
        let query = entityRepository.createQueryBuilder(this.entity);
        query = QueryBuilder.buildQuery(this.entity, query, {id});
        return await query.getOne();
    }

    public updateEntity = async (id: number, entity: any) => {
        const entityRepository = await Repository.getRepository(this.entity);
        const response : any = await entityRepository.update(id, entity);
        return response.affected;
    }

    public storeEntity = async (entity: any) => {
        const entityRepository = await Repository.getRepository(this.entity);
        return await entityRepository.save(entity);
    }

    public deleteEntity = async (entityId: number) => {
        const entityRepository = await Repository.getRepository(this.entity);
        const response : any = await entityRepository.delete(entityId);
        return response.affected;
    }


}