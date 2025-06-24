
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface SeletorHoraProps {
  label?: string;
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
  disabled?: boolean;
  minTime?: string;
  maxTime?: string;
  interval?: number; // intervalo em minutos
  occupiedTimes?: string[]; // horários ocupados
}

const SeletorHora: React.FC<SeletorHoraProps> = ({
  label,
  value,
  onChange,
  placeholder = "Selecione um horário",
  className,
  required = false,
  id,
  disabled = false,
  minTime = "06:00",
  maxTime = "23:00",
  interval = 30,
  occupiedTimes = []
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const gerarHorarios = () => {
    const horarios = [];
    const [minHour, minMinute] = minTime.split(':').map(Number);
    const [maxHour, maxMinute] = maxTime.split(':').map(Number);
    
    const startMinutes = minHour * 60 + minMinute;
    const endMinutes = maxHour * 60 + maxMinute;
    
    for (let minutes = startMinutes; minutes <= endMinutes; minutes += interval) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Adicionar apenas se não estiver ocupado
      if (!occupiedTimes.includes(timeString)) {
        horarios.push(timeString);
      }
    }
    
    return horarios;
  };

  const selecionarHorario = (horario: string) => {
    if (onChange) {
      onChange(horario);
    }
    setIsOpen(false);
  };

  const horarios = gerarHorarios();

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
            <Clock className="mr-2 h-4 w-4" />
            {value || <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0" align="start">
          <div className="max-h-80 overflow-y-auto p-2">
            <div className="space-y-1">
              {horarios.length > 0 ? (
                horarios.map((horario) => (
                  <Button
                    key={horario}
                    variant={value === horario ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-center text-sm"
                    onClick={() => selecionarHorario(horario)}
                  >
                    {horario}
                  </Button>
                ))
              ) : (
                <div className="text-center text-sm text-gray-500 p-2">
                  Nenhum horário disponível
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SeletorHora;
