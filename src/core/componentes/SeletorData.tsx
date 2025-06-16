
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, ChevronLeft, ChevronRight, Edit } from 'lucide-react';
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
  const [viewDate, setViewDate] = useState(value || new Date());

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

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setViewDate(newDate);
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
              format(value, "dd/MM/yyyy", { locale: ptBR })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="bg-muted/30 p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Selecionar data</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold text-foreground">
                {value ? format(value, "MMM d, yyyy", { locale: ptBR }) : "Nenhuma data"}
              </div>
              {value && <Edit className="h-4 w-4 text-muted-foreground" />}
            </div>
          </div>

          <div className="p-4">
            {/* Cabeçalho do calendário */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium">
                {format(viewDate, "MMMM yyyy", { locale: ptBR })}
              </h4>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                <div key={index} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendário personalizado */}
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              month={viewDate}
              onMonthChange={setViewDate}
              locale={ptBR}
              className="p-0 pointer-events-auto"
              classNames={{
                months: "flex flex-col",
                month: "space-y-2",
                caption: "hidden", // Escondemos o caption padrão pois criamos o nosso
                table: "w-full border-collapse",
                head_row: "hidden", // Escondemos a linha de cabeçalho padrão
                row: "flex w-full",
                cell: "h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent/50 rounded-md",
                day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent rounded-md transition-colors",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground font-semibold",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-25",
              }}
            />
          </div>

          {/* Rodapé com botões */}
          <div className="flex justify-between items-center p-4 border-t bg-muted/10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground"
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                if (value) {
                  handleDateSelect(value);
                } else {
                  handleDateSelect(new Date());
                }
              }}
            >
              OK
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SeletorData;
