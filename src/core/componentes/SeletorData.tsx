
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface SeletorDataProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const SeletorData: React.FC<SeletorDataProps> = ({
  label,
  value,
  onChange,
  placeholder = "Selecione uma data",
  className,
  required = false,
  id,
  disabled = false,
  minDate,
  maxDate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const selectedDate = value || today;

  const handleDateSelect = (date: Date | undefined) => {
    if (onChange) {
      onChange(date);
    }
    setIsOpen(false);
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-11",
              !value && "text-muted-foreground",
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              <span className="flex items-center gap-2">
                <span className="font-medium">
                  {format(value, "dd/MM/yyyy", { locale: ptBR })}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({format(value, "EEEE", { locale: ptBR })})
                </span>
              </span>
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {format(selectedDate, "MMMM yyyy", { locale: ptBR })}
              </div>
              <div className="text-sm text-muted-foreground">
                Selecione uma data
              </div>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            initialFocus
            locale={ptBR}
            className="p-3 pointer-events-auto"
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground font-semibold",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-muted rounded-md",
            }}
          />
          <div className="p-3 border-t bg-muted/30">
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Hoje: {format(today, "dd/MM/yyyy", { locale: ptBR })}</span>
              {value && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDateSelect(today)}
                  className="h-6 px-2 text-xs"
                >
                  Hoje
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SeletorData;
