import { Response } from "express"

export class StreamContext {
    range: string 
    response: Response
}