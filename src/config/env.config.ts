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
        postgres: {
            postgres1: {
                dbName: process.env.POSTGRES_1_DB_NAME,
                host: process.env.POSTGRES_1_HOST,
                port: process.env.POSTGRES_1_PORT ? Number(process.env.POSTGRES_1_PORT) : 5433,
                user: process.env.POSTGRES_1_USER,
                pass: process.env.POSTGRES_1_PASS
            }
        }
    },
    messageBrokers: {
        rabbitMq: {
            rabbitMq1: {
                user: process.env.RABBITMQ_1_USER,
                password: process.env.RABBITMQ_1_PASSWORD,
                port: process.env.RABBITMQ_1_PORT,
                host: process.env.RABBITMQ_1_HOST,
            }
        },
        kafka: {
            kafka1: {
                host: process.env.KAFKA_1_HOST,
                port: process.env.KAFKA_1_PORT,
            }
        }
    },
    nakama: {
        host: process.env.NAKAMA_HOST,
        port: process.env.NAKAMA_PORT,
        ssl: process.env.NAKAMA_SSL === "true",
        key: process.env.NAKAMA_KEY,
        authenticationId: process.env.NAKAMA_AUTHENTICATION_ID,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT ?? 6379)
    },
    secrets: {
        salt: process.env.SALT, 
        telegram: {
            botTokens: {
                ciwallet: process.env.TELEGRAM_CIWALLET_BOT_TOKEN,
                cifarm: process.env.TELEGRAM_CIFARM_BOT_TOKEN
            },
            mockAuthorization: process.env.TELEGRAM_MOCK_AUTHORIZATION
        },
        jwt: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN
        },
        admin: {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
        },
    }
}) 

export interface NearPair {
    privateKey: string;
    accountId: string;
}