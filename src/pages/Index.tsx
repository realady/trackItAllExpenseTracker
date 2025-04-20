import React, { useState } from 'react';
import { ExpenseProvider } from '@/context/ExpenseContext';
import Header from '@/components/Header';
import AddExpenseForm from '@/components/AddExpenseForm';
import SMSButton from '@/components/SMSButton';
import ExpenseList from '@/components/ExpenseList';
import ExpenseSummary from '@/components/ExpenseSummary';
import ExpenseAnalytics from '@/components/ExpenseAnalytics';
import AiInsights from '@/components/AiInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryFilter } from '@/components/CategoryFilter';
import { DateRangePicker } from '@/components/DateRangePicker';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <Header />
          
          <div className="grid grid-cols-1 gap-6">
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="add">Add Expense</TabsTrigger>
                <TabsTrigger value="import">Import SMS</TabsTrigger>
              </TabsList>
              <TabsContent value="add">
                <Card>
                  <CardContent className="pt-6">
                    <AddExpenseForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="import">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Import from SMS</h3>
                      <p className="text-sm text-muted-foreground">
                        Import your expenses from SMS messages.
                      </p>
                      <SMSButton />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <AiInsights />
            <ExpenseAnalytics />
            
            <Collapsible
              open={isSummaryOpen}
              onOpenChange={setIsSummaryOpen}
              className="w-full"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Expense Summary</h2>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isSummaryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2">
                <ExpenseSummary />
              </CollapsibleContent>
            </Collapsible>
            
            <div className="flex flex-col gap-4">
              <CategoryFilter 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory}
                selectedType={selectedType}
                onSelectType={setSelectedType}
              />
              <DateRangePicker />
            </div>
            
            <ExpenseList 
              categoryFilter={selectedCategory}
              typeFilter={selectedType}
            />
          </div>
        </div>
      </div>
    </ExpenseProvider>
  );
};

export default Index;
