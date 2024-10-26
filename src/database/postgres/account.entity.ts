import { Field, ID, ObjectType } from "@nestjs/graphql"
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { RoleEntity } from "./role.entity"

@ObjectType()
@Entity("accounts")
export class AccountEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
      id: string

  @Field(() => String)
  @Column({ name: "username", type: "varchar", length: 200, unique: true })
      username: string

  @Field(() => String)
  @Column({ name: "hashed_password", type: "varchar", length: 100 })
      hashedPassword: string

  @Field(() => [RoleEntity], { nullable: true })
  @OneToMany(() => RoleEntity, (role) => role.account)
      roles: Array<RoleEntity>

  @CreateDateColumn({ name: "created_at" })
  @Field(() => Date)
      createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  @Field(() => Date)
      updatedAt: Date
}
