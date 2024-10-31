import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { envConfig } from "config/env.config"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import {
    GraphQLSchemaBuilderModule,
    GraphQLSchemaFactory,
} from "@nestjs/graphql"
import { NftResolver } from "./application"
import { printSchema } from "graphql"
import { writeFileSync } from "fs"
import { join } from "path"
import { getEnvValue } from "./utils"
import { RedisIoAdapter } from "@/adapters"

const generateSchema = async () => {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    const schema = await gqlSchemaFactory.create([NftResolver])

    writeFileSync(
        join(
            process.cwd(),
            `${getEnvValue({ development: "src", production: "dist" })}/schema.gql`,
        ),
        printSchema(schema),
    )
} 

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    const redisIoAdapter = new RedisIoAdapter(app)
    await redisIoAdapter.connectToRedis()
    app.useWebSocketAdapter(redisIoAdapter)
    
    const config = new DocumentBuilder()
        .setVersion("1.0")
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api", app, document)

    await app.listen(envConfig().port)
}

generateSchema().then(() => bootstrap())
