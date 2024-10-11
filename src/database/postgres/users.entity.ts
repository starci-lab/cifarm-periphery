import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@ObjectType()
@Entity("users")
export class UsersEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
      id: string

  @Field(() => String)
  @Column({ name: "telegram_id", type: "varchar", length: 10, unique: true })
      telegramId: string

  @Field(() => String)
  @Column({ name: "username", type: "varchar", length: 50 })
      username: string
}
