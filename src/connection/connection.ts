import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { Banda } from "../domain/banda";
import { Lider } from "../domain/lider";


export class Repository {
    private static connection: Connection;

    public static getInstace = async () : Promise<Connection> => {
        if (!Repository.connection) {
            let options: any = {
                type: process.env.ARQ_DB_TYPE,
                host: process.env.ARQ_DB_HOST,
                port: process.env.ARQ_DB_PORT,
                username: process.env.ARQ_DB_USER,
                password: process.env.ARQ_DB_PASSWORD,
                database: process.env.ARQ_DB_NAME,
                entities: [Banda, Lider],
                synchronize: false,
                logging: true
            }
            Repository.connection = await createConnection(options);
        }
        return Repository.connection;
    }

    public static getRepository = async (model: any) => {
        const conexion = await Repository.getInstace();
        return conexion.getRepository(model);
    }
}