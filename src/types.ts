export interface Transaction {
  id: number;
  text: string;
  amount: number;
}

export interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: number) => void;
}