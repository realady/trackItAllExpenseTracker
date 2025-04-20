
export type ExpenseCategoryType = 
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'utilities'
  | 'housing'
  | 'health'
  | 'travel'
  | 'education'
  | 'sms'
  | 'other';

export type IncomeCategoryType =
  | 'salary'
  | 'freelance'
  | 'investments'
  | 'rental'
  | 'gifts'
  | 'refunds'
  | 'other';

export type CategoryType = ExpenseCategoryType | IncomeCategoryType;

export type TransactionType = 'debit' | 'credit';

export const EXPENSE_CATEGORIES: ExpenseCategoryType[] = [
  'food',
  'transport',
  'entertainment',
  'shopping',
  'utilities',
  'housing',
  'health',
  'travel',
  'education',
  'sms',
  'other'
];

export const INCOME_CATEGORIES: IncomeCategoryType[] = [
  'salary',
  'freelance',
  'investments',
  'rental',
  'gifts',
  'refunds',
  'other'
];

export const CATEGORIES = {
  debit: EXPENSE_CATEGORIES,
  credit: INCOME_CATEGORIES
};

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: CategoryType;
  date: Date;
  isSms?: boolean;
  smsContent?: string;
  type: TransactionType;
}
