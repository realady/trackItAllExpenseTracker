
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useExpenses } from '@/context/ExpenseContext';

export const DateRangePicker = () => {
  const { setDateRange, dateRange } = useExpenses();
  const [date, setDate] = React.useState<Date | undefined>(dateRange?.from);

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[240px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Filter by date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              if (newDate) {
                const nextDay = new Date(newDate);
                nextDay.setDate(nextDay.getDate() + 1);
                setDateRange({
                  from: newDate,
                  to: nextDay,
                });
              } else {
                setDateRange(null);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      {date && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => {
            setDate(undefined);
            setDateRange(null);
          }}
          className="rounded-full h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Reset date filter</span>
        </Button>
      )}
    </div>
  );
};
