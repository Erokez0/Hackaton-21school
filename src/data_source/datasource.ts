import { DataSource } from "typeorm"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "hackaton",
    entities: ['src/entity/*.ts'],
    logging: true,
    synchronize: true,
    connectTimeoutMS: 0
})
