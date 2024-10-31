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
import { EventEmitterModule } from "@nestjs/event-emitter"
import * as redisStore from "cache-manager-redis-store"
import { TypeOrmModule } from "@nestjs/typeorm"
 
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

        EventEmitterModule.forRoot(),
        
        TypeOrmModule.forRoot({
            type: "postgres",
            host: envConfig().database.postgres.postgres1.host,
            port: envConfig().database.postgres.postgres1.port,
            username: envConfig().database.postgres.postgres1.user,
            password: envConfig().database.postgres.postgres1.pass,
            database: envConfig().database.postgres.postgres1.dbName,
            autoLoadEntities: true,
            synchronize: true
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
 