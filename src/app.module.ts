import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { envConfig } from "@/config"
import { APP_PIPE } from "@nestjs/core"
import { ServicesModule } from "./services"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { ApplicationModule } from "./application"
import { ScheduleModule } from "@nestjs/schedule"
import { MongooseModule } from "@nestjs/mongoose"
import { CacheModule } from "@nestjs/cache-manager"
import * as redisStore from "cache-manager-redis-store"
import { ConsumersModule } from "./consumers"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [envConfig],
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ["./**/*.gql"],
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
            introspection: true,
        }),
        CacheModule.register({
            store: redisStore,
            ttl: 1000 * 60,
            isGlobal: true,
            host: envConfig().redis.host,
            port: envConfig().redis.port,
        }),

        MongooseModule.forRoot(
            `mongodb://${envConfig().database.mongo.mongo1.host}:${envConfig().database.mongo.mongo1.port}`,
            {
                user: envConfig().database.mongo.mongo1.user,
                pass: envConfig().database.mongo.mongo1.pass,
                dbName: envConfig().database.mongo.mongo1.dbName,
            },
        ),
        ScheduleModule.forRoot(),

        ConsumersModule,
        ServicesModule, 
        ApplicationModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {} 
 