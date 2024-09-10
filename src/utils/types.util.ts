export interface HttpResponse<TData = undefined> {
    message: string;
    data?: TData;
}
  