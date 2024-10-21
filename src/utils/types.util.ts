export interface HttpResponse<TData = undefined> {
    message: string;
    data?: TData;
}
  
export type Atomic = string | number | boolean | object