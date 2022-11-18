export interface ITransaction{
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: Date;
}