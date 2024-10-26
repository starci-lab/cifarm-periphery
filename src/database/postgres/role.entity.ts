import { ObjectType, Field, ID } from "@nestjs/graphql"
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm"
import { AccountEntity } from "./account.entity"

export enum Role {
  //admin is the highest role
  Admin = "admin",
  //minter is the role that can mint nfts
  NftMinter = "nft-minter",
  //updater is the role that can update nfts
  NftUpdater = "nft-updater",
  //burner is the role that can burn nfts
  NftBurner = "nft-burner",
  //token-minter is the role that can mint tokens
  TokenMinter = "token-minter",
  //token-burner is the role that can burn tokens
  TokenBurner = "token-burner",
  //game-manger is the role that can manage games
  GameManager = "game-updater",
}

@ObjectType()
@Entity("roles")
export class RoleEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
      id: string

  @Field(() => String)
  @Column({ name: "username", type: "enum", enum: Role })
      role: Role

  @CreateDateColumn({ name: "created_at" })
  @Field(() => Date)
      createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  @Field(() => Date)
      updatedAt: Date

  @Field(() => ID)
  @Column({ type: "uuid", name: "account_id" })
      accountId: string

  @Field(() => AccountEntity)
  @ManyToOne(() => AccountEntity, (account) => account.roles, {
      onDelete: "CASCADE",
  })
  @JoinColumn({ name: "account_id" })
      account: AccountEntity
}
