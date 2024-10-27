import { Field, ObjectType } from "@nestjs/graphql"
import { Column, Entity } from "typeorm"
import { AbstractEntity } from "./abstract"

@ObjectType()
@Entity("game-versions")
export class GameVersionEntity extends AbstractEntity {
  @Field(() => String)
  @Column({ name: "version", type: "varchar", length: 200, unique: true })
      version: string

  @Field(() => String)
  @Column({ name: "name", type: "varchar", length: 200 })
      name: string

  @Field(() => String)
  @Column({ name: "description", type: "varchar", length: 1000 })
      description: string

  @Field(() => Boolean)
  @Column({ name: "is_active", type: "boolean", default: true })
      isActive: boolean
}
