export interface SqlClient {

    findAll() : Promise<any[]>;
    findById(id: number) : Promise<any>;
    updateEntity(id: number, entity: any) : Promise<boolean>;
    storeEntity(entity: any) : Promise<any>;
    deleteEntity(entityId: number) : Promise<boolean>;
}