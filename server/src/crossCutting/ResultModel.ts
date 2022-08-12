export class ResultModel<TEntity> {
  constructor (public status: boolean, public errors?: string[], public data?: TEntity) { }
}
