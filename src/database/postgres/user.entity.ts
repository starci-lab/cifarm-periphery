import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@ObjectType()
@Entity("users")
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
      id: string

  @Field(() => String)
  @Column({ name: "telegram_id", type: "varchar", length: 10, unique: true })
      telegramId: string

  @Field(() => String)
  @Column({ name: "username", type: "varchar", length: 50 })
      username: string

  @CreateDateColumn({ name: "created_at" })
  @Field(() => Date)
      createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  @Field(() => Date)
      updatedAt: Date
}
