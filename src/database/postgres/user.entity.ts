import { Field, ObjectType } from "@nestjs/graphql"
import {
    Column,
    Entity,
} from "typeorm"
import { AbstractEntity } from "./abstract"

@ObjectType()
@Entity("users")
export class UserEntity extends AbstractEntity {
  @Field(() => String)
  @Column({ name: "telegram_id", type: "varchar", length: 10, unique: true })
      telegramId: string

  @Field(() => String)
  @Column({ name: "username", type: "varchar", length: 50 })
      username: string
}