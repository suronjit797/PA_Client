export interface ITransaction {
  _id: string;
  title: string;
  type: string;
  amount: number;
  isPending: boolean;
  isImportant: boolean;
}
