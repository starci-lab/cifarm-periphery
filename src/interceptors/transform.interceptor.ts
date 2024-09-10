import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common"
import { Observable } from "rxjs"
import { HttpResponse } from "@/utils"

@Injectable()
export class TransformInterceptor<TData>
implements NestInterceptor<TData, HttpResponse<TData>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<HttpResponse<TData>> {
        const request = context.switchToHttp().getRequest()
        const message = request.body.message
        request.body.payload = JSON.parse(message)
        return next.handle()
    }
}
