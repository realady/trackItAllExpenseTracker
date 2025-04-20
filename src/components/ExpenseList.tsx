import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Trash2, Receipt, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExpenseListProps {
  categoryFilter: string | null;
  typeFilter: string | null;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    food: 'bg-orange-100 text-orange-800',
    transport: 'bg-blue-100 text-blue-800',
    entertainment: 'bg-purple-100 text-purple-800',
    shopping: 'bg-pink-100 text-pink-800',
    utilities: 'bg-yellow-100 text-yellow-800',
    housing: 'bg-teal-100 text-teal-800',
    health: 'bg-red-100 text-red-800',
    travel: 'bg-indigo-100 text-indigo-800',
    education: 'bg-green-100 text-green-800',
    sms: 'bg-secondary text-secondary-foreground',
    other: 'bg-gray-100 text-gray-800'
  };

  return colors[category] || colors.other;
};

const ExpenseList: React.FC<ExpenseListProps> = ({ categoryFilter, typeFilter }) => {
  const { expenses, deleteExpense, dateRange } = useExpenses();
  
  const filteredExpenses = expenses.filter(expense => {
    // Filter by category
    if (categoryFilter && expense.category !== categoryFilter) {
      return false;
    }
    
    // Filter by transaction type
    if (typeFilter && typeFilter !== 'all' && expense.type !== typeFilter) {
      return false;
    }
    
    // Filter by date range
    if (dateRange?.from && dateRange?.to) {
      const expenseDate = new Date(expense.date);
      if (expenseDate < dateRange.from || expenseDate >= dateRange.to) {
        return false;
      }
    }
    
    return true;
  });

  if (filteredExpenses.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Receipt className="mx-auto h-12 w-12 mb-2 opacity-20" />
        <p>No expenses match your filters. Try adjusting your criteria or add a new expense.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
      <div className="space-y-2">
        {filteredExpenses.map((expense) => (
          <div 
            key={expense.id} 
            className="group flex items-center justify-between p-3 rounded-md expense-item border"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                {expense.isSms ? (
                  <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-secondary" />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium">{expense.description}</div>
                <div className="text-sm text-muted-foreground">
                  {format(expense.date, 'MMM d, yyyy • h:mm a')}
                </div>
                {expense.smsContent && (
                  <div className="text-xs text-muted-foreground mt-1 italic">
                    {expense.smsContent}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={cn("category-badge", getCategoryColor(expense.category))}>
                {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
              </Badge>
              <div className="font-medium">₹{expense.amount.toFixed(2)}</div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="delete-button" 
                onClick={() => deleteExpense(expense.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
