export enum NodeEnv {
    Production = "production",
    Development = "development",
}

export const envConfig = () => ({
    port: process.env.PORT ?? 9999,
    nodeEnv: (process.env.NODE_ENV ?? NodeEnv.Development) as NodeEnv,
    database: {
        mongo: {
            mongo1: {
                dbName: process.env.MONGO_1_DB_NAME,
                host: process.env.MONGO_1_HOST,
                port: process.env.MONGO_1_PORT,
                user: process.env.MONGO_1_USER,
                pass: process.env.MONGO_1_PASS
            }
        },
    },
}) 