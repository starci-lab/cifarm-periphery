export interface ManyResult<TRecord> {
    records: Array<TRecord>
    count?: number
}

export interface BaseArgs<TInput=undefined, TFilter=undefined> {
    input?: TInput,
    filter?: TFilter
}