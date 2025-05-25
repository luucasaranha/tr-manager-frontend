export interface Transaction {
    id: number;
    bank: string;
    category: string;
    description: string;
    value: number;
    date: string;
  }
  
  export type NewTransaction = Omit<Transaction, 'id'>;
  
  export type MenuItem = 'home' | 'transactions' | 'settings';