export enum NodeEnv {
    Production = "production",
    Development = "development",
}

export const envConfig = () => ({
    port: process.env.PORT ?? 9999,
    nodeEnv: (process.env.NODE_ENV ?? NodeEnv.Development) as NodeEnv,
}) 