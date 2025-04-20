import React from 'react';
import { CATEGORIES } from '@/types/expense';
import { Button } from '@/components/ui/button';
import { Check, Filter, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory,
  selectedType,
  onSelectType
}) => {
  const isMobileView = window.innerWidth < 768;

  const typeFilters = (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Filter by type</h3>
      <ToggleGroup type="single" value={selectedType || ''} onValueChange={(value) => onSelectType(value || null)}>
        <ToggleGroupItem value="all" aria-label="All transactions">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="credit" aria-label="Income">
          <ArrowUpCircle className="h-4 w-4 mr-1 text-green-500" />
          Income
        </ToggleGroupItem>
        <ToggleGroupItem value="debit" aria-label="Expenses">
          <ArrowDownCircle className="h-4 w-4 mr-1 text-destructive" />
          Expenses
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );

  const availableCategories = selectedType && selectedType !== 'all' ? CATEGORIES[selectedType as 'debit' | 'credit'] : [...CATEGORIES.debit, ...CATEGORIES.credit];

  const categoryButtons = (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "rounded-full",
          !selectedCategory && "bg-primary text-primary-foreground"
        )}
        onClick={() => onSelectCategory(null)}
      >
        All
        {!selectedCategory && <Check className="ml-1 h-3 w-3" />}
      </Button>
      
      {availableCategories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full",
            selectedCategory === category && "bg-primary text-primary-foreground"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
          {selectedCategory === category && <Check className="ml-1 h-3 w-3" />}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="w-full space-y-4">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="w-full flex justify-between">
              <span>
                {selectedCategory || selectedType 
                  ? `Filters: ${selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : ''} ${selectedType || ''}`
                  : 'Filter transactions'}
              </span>
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter transactions</SheetTitle>
              <SheetDescription>
                Filter by transaction type and category
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-full py-4">
              {typeFilters}
              {categoryButtons}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="hidden md:block space-y-4">
        {typeFilters}
        <h3 className="text-sm font-medium mb-2">Filter by category</h3>
        {categoryButtons}
      </div>
    </div>
  );
};
