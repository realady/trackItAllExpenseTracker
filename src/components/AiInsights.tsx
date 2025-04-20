
import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, TrendingDown, AlertCircle, PiggyBank, Target, LineChart, ArrowUpDown } from 'lucide-react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/types/expense';

const AiInsights = () => {
  const { expenses } = useExpenses();

  // Calculate insights for different time periods
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  // Current month transactions
  const currentMonthExpenses = expenses.filter(e => {
    const date = new Date(e.date);
    return date >= monthStart && e.type === 'debit';
  });

  // Last month transactions
  const lastMonthExpenses = expenses.filter(e => {
    const date = new Date(e.date);
    return date >= lastMonthStart && date < monthStart && e.type === 'debit';
  });

  // Last week transactions
  const lastWeekExpenses = expenses.filter(e => {
    const date = new Date(e.date);
    return date >= weekAgo && e.type === 'debit';
  });

  // Calculate totals
  const totalDebits = expenses.filter(e => e.type === 'debit')
    .reduce((sum, e) => sum + e.amount, 0);
  const totalCredits = expenses.filter(e => e.type === 'credit')
    .reduce((sum, e) => sum + e.amount, 0);
  
  const currentMonthTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const lastMonthTotal = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const lastWeekTotal = lastWeekExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Calculate spending patterns
  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].map(category => ({
    category,
    debitAmount: expenses.filter(e => e.category === category && e.type === 'debit')
      .reduce((sum, e) => sum + e.amount, 0),
    creditAmount: expenses.filter(e => e.category === category && e.type === 'credit')
      .reduce((sum, e) => sum + e.amount, 0)
  }));

  const highestExpenseCategory = [...allCategories]
    .sort((a, b) => b.debitAmount - a.debitAmount)
    .find(cat => cat.debitAmount > 0);

  const highestIncomeCategory = [...allCategories]
    .sort((a, b) => b.creditAmount - a.creditAmount)
    .find(cat => cat.creditAmount > 0);

  // Calculate monthly spending trend
  const monthlyChange = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(1);
  const savingsRate = totalCredits > 0 ? ((totalCredits - totalDebits) / totalCredits * 100).toFixed(1) : 0;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-start space-x-4">
            <LineChart className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <p className="font-medium">Monthly Overview</p>
              <p className="text-sm text-muted-foreground">
                This month's spending: ₹{currentMonthTotal.toFixed(2)}
                {lastMonthTotal > 0 && (
                  <span className={`ml-2 ${Number(monthlyChange) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    ({monthlyChange}% {Number(monthlyChange) > 0 ? '↑' : '↓'} vs last month)
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Target className="h-5 w-5 text-purple-500 mt-1" />
            <div>
              <p className="font-medium">Spending Patterns</p>
              <p className="text-sm text-muted-foreground">
                Highest expense in {highestExpenseCategory?.category} (₹{highestExpenseCategory?.debitAmount.toFixed(2)})
                <br />
                Weekly average: ₹{(lastWeekTotal / 7).toFixed(2)} per day
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <PiggyBank className="h-5 w-5 text-green-500 mt-1" />
            <div>
              <p className="font-medium">Savings Analysis</p>
              <p className="text-sm text-muted-foreground">
                Current savings rate: {savingsRate}%
                <br />
                Main income source: {highestIncomeCategory?.category} (₹{highestIncomeCategory?.creditAmount.toFixed(2)})
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <ArrowUpDown className="h-5 w-5 text-orange-500 mt-1" />
            <div>
              <p className="font-medium">Cash Flow</p>
              <p className="text-sm text-muted-foreground">
                Total Income: ₹{totalCredits.toFixed(2)}
                <br />
                Total Expenses: ₹{totalDebits.toFixed(2)}
                <br />
                Net Balance: ₹{(totalCredits - totalDebits).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiInsights;
