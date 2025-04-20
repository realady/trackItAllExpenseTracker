
import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { CreditCard, PiggyBank, Calendar, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

const Header = () => {
  const { expenses, dateRange } = useExpenses();
  
  // Calculate separate totals for income and expenses
  const totalIncome = expenses
    .filter(e => e.type === 'credit')
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const totalExpenses = expenses
    .filter(e => e.type === 'debit')
    .reduce((sum, expense) => sum + expense.amount, 0);
    
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <PiggyBank className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Track It All</h1>
        </div>
        <div className="text-sm opacity-80">
          {dateRange ? (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(dateRange.from, 'MMM d, yyyy')}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>All time</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-primary-foreground/10 border-none shadow-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium opacity-80">Net Balance</span>
              <span className="text-2xl font-bold">₹{netBalance.toFixed(2)}</span>
            </div>
            <PiggyBank className="h-8 w-8 opacity-70" />
          </CardContent>
        </Card>
        
        <Card className="bg-green-500/10 border-none shadow-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium opacity-80">Income</span>
              <span className="text-2xl font-bold text-green-500">₹{totalIncome.toFixed(2)}</span>
            </div>
            <ArrowUpCircle className="h-8 w-8 text-green-500 opacity-70" />
          </CardContent>
        </Card>
        
        <Card className="bg-destructive/10 border-none shadow-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium opacity-80">Expenses</span>
              <span className="text-2xl font-bold text-destructive">₹{totalExpenses.toFixed(2)}</span>
            </div>
            <ArrowDownCircle className="h-8 w-8 text-destructive opacity-70" />
          </CardContent>
        </Card>
        
        <Card className="bg-primary-foreground/10 border-none shadow-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium opacity-80">Transactions</span>
              <span className="text-2xl font-bold">{expenses.length}</span>
            </div>
            <CreditCard className="h-8 w-8 opacity-70" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Header;
