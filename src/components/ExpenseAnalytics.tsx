
import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import { ChartBar, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ExpenseAnalytics = () => {
  const { expenses } = useExpenses();

  // Monthly spending data
  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const monthlyData = Array.from({ length: 31 }, (_, i) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
    const dayExpenses = expenses.filter(e => {
      const expenseDate = new Date(e.date);
      return expenseDate.getDate() === date.getDate() && 
             expenseDate.getMonth() === date.getMonth() &&
             e.type === 'debit';
    });
    
    return {
      date: format(date, 'd'),
      amount: dayExpenses.reduce((sum, e) => sum + e.amount, 0),
    };
  }).filter(day => day.amount > 0);

  // Transaction type distribution
  const transactionData = [
    {
      name: 'Credits',
      value: expenses.filter(e => e.type === 'credit')
        .reduce((sum, e) => sum + e.amount, 0)
    },
    {
      name: 'Debits',
      value: Math.abs(expenses.filter(e => e.type === 'debit')
        .reduce((sum, e) => sum + e.amount, 0))
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar className="h-5 w-5" />
            Monthly Spending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Transaction Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {transactionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseAnalytics;
