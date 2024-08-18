export interface ITransaction {
  _id?: string;
  title: string;
  type: string;
  amount: number;
  isPending: boolean;
}


export interface ITransactionMeta {
  [key: string]: any; // Define specific fields if known
}
