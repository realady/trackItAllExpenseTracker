
import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SMSButton = () => {
  const { addSmsExpense, smsCounter } = useExpenses();

  const handleFetchSMS = () => {
    // In a real app, this would request SMS permissions and actually read SMS messages
    toast({
      title: "Importing SMS transactions",
      description: "Processing your messages..."
    });
    
    // Simulate a small delay for the "processing"
    setTimeout(() => {
      addSmsExpense();
    }, 800);
  };

  return (
    <Button 
      onClick={handleFetchSMS}
      className="w-full mb-6"
      variant="secondary"
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      Fetch SMS Transactions {smsCounter > 0 ? `(${smsCounter})` : ''}
    </Button>
  );
};

export default SMSButton;
