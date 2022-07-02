export class QueryBuilder {

    constructor() {}

    public static buildQuery = (entity: string, query: any, parameters?: any) => {

        switch (entity) {

            case 'Banda': 
                query = query.leftJoinAndSelect('Banda.leader', 'leader');
                if (parameters?.id) query = query.where('Banda.id = :id', {id: parameters.id});
            break;

        }

        return query;
    }
}