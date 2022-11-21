export interface ITransactionForm{
  userCredited: string,
  value: string
}
export interface ITransaction extends ITransactionForm{
  userDebited: string
}