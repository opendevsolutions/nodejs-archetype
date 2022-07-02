export class NotFoundEntityError extends Error {

    constructor (entityId: number, entityName: string) {
        super();
        this.message = `There's is no ${entityName} with the id ${entityId}`;
    }
    
}