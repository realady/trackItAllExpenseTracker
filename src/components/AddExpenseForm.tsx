
import React, { useState, useEffect } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { CATEGORIES, CategoryType, TransactionType } from '@/types/expense';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, Plus, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const AddExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('other');
  const [date, setDate] = useState<Date>(new Date());
  const [transactionType, setTransactionType] = useState<TransactionType>('debit');

  // Reset category when transaction type changes
  useEffect(() => {
    setCategory('other');
  }, [transactionType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description) return;
    
    addExpense({
      amount: parseFloat(amount),
      description,
      category,
      date,
      type: transactionType
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('other');
    setDate(new Date());
    setShowForm(false);
  };

  const availableCategories = CATEGORIES[transactionType];

  return (
    <div className="mb-6">
      {!showForm ? (
        <Button 
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      ) : (
        <div className="bg-card p-4 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Add New Transaction</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <RadioGroup
                defaultValue="debit"
                value={transactionType}
                onValueChange={(value) => setTransactionType(value as TransactionType)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label htmlFor="debit" className="flex items-center">
                    <ArrowDownCircle className="w-4 h-4 mr-1 text-destructive" />
                    Expense
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="flex items-center">
                    <ArrowUpCircle className="w-4 h-4 mr-1 text-green-500" />
                    Income
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder={transactionType === 'credit' ? "Source of income" : "What did you spend on?"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={category} 
                  onValueChange={(value) => setCategory(value as CategoryType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Transaction</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddExpenseForm;
