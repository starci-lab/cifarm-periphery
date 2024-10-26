import { Field, ObjectType } from "@nestjs/graphql"
import { Column, Entity, OneToMany } from "typeorm"
import { Role, RoleEntity } from "./role.entity"
import { AbstractEntity } from "./abstract"
import { Exclude } from "class-transformer"

@ObjectType()
@Entity("accounts")
export class AccountEntity extends AbstractEntity {
  @Field(() => String)
  @Column({ name: "username", type: "varchar", length: 200, unique: true })
      username: string

  @Field(() => String)
  @Exclude()
  @Column({ name: "hashed_password", type: "varchar", length: 100 })
      hashedPassword: string

  @Field(() => [RoleEntity], { nullable: true })
  @OneToMany(() => RoleEntity, (role) => role.account, {
      cascade: true,
  })
      roles: Array<RoleEntity>
}

export type Account = Omit<AccountEntity, "roles"> & {
  roles: Array<Role>;
};
