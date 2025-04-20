import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, CategoryType } from '../types/expense';
import { toast } from '@/components/ui/use-toast';

interface DateRange {
  from: Date;
  to: Date;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'date'> & { date?: Date }) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Omit<Expense, 'id'>>) => void;
  totalExpenses: number;
  smsCounter: number;
  incrementSmsCounter: () => void;
  addSmsExpense: () => void;
  dateRange: DateRange | null;
  setDateRange: (range: DateRange | null) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [smsCounter, setSmsCounter] = useState<number>(0);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  
  const totalExpenses = expenses
    .filter(expense => {
      if (!dateRange) return true;
      const expenseDate = new Date(expense.date);
      return expenseDate >= dateRange.from && expenseDate < dateRange.to;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedSmsCounter = localStorage.getItem('smsCounter');
    
    if (savedExpenses) {
      try {
        const parsedExpenses = JSON.parse(savedExpenses);
        setExpenses(parsedExpenses.map((exp: any) => ({
          ...exp,
          date: new Date(exp.date)
        })));
      } catch (error) {
        console.error('Failed to parse expenses from localStorage', error);
      }
    }
    
    if (savedSmsCounter) {
      setSmsCounter(parseInt(savedSmsCounter, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  
  useEffect(() => {
    localStorage.setItem('smsCounter', smsCounter.toString());
  }, [smsCounter]);

  const addExpense = (expense: Omit<Expense, 'id' | 'date'> & { date?: Date }) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      date: expense.date || new Date(),
      type: expense.type || 'debit',
      ...expense
    };
    
    setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
    toast({
      title: `${expense.type === 'credit' ? 'Credit' : 'Debit'} added`,
      description: `${newExpense.amount} ${expense.type === 'credit' ? 'credited for' : 'debited for'} ${newExpense.description}`,
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    toast({
      title: "Expense deleted",
      description: "The expense has been removed",
      variant: "destructive"
    });
  };

  const updateExpense = (id: string, updatedExpense: Partial<Omit<Expense, 'id'>>) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
    toast({
      title: "Expense updated",
      description: "The expense has been updated successfully",
    });
  };

  const incrementSmsCounter = () => {
    setSmsCounter(prev => prev + 1);
  };

  const addSmsExpense = () => {
    incrementSmsCounter();
    
    const isFirstClick = smsCounter === 0;
    
    const smsExpense: Omit<Expense, 'id' | 'date'> = {
      amount: 50,
      description: 'Credit through UPI',
      category: 'sms',
      isSms: true,
      type: 'credit',
      smsContent: '50 INR credited through UPI'
    };
    
    addExpense(smsExpense);
  };

  const value: ExpenseContextType = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    totalExpenses,
    smsCounter,
    incrementSmsCounter,
    addSmsExpense,
    dateRange,
    setDateRange
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
