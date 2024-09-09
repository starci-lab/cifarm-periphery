import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class Metadata {
    @Field(() => Int, {
        name: "count",
    })
        count: number
}
export interface ManyResult<TRecord> {
    records: Array<TRecord>
    metadata: Metadata
}