
import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, CategoryType } from '@/types/expense';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
  '#82ca9d', '#ff7300', '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1'
];

const ExpenseSummary = () => {
  const { expenses } = useExpenses();

  // Group expenses by category - use the array concatenation instead of the object
  const expensesByCategory = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].map(category => {
    const total = expenses
      .filter(e => e.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: total
    };
  }).filter(cat => cat.value > 0); // Filter out categories with no expenses

  if (expensesByCategory.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Expense Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                }
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
          {expensesByCategory.map((category, index) => (
            <div key={category.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="text-sm">
                <span className="font-medium">{category.name}</span>
                <span className="text-muted-foreground ml-1">₹{category.value.toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
