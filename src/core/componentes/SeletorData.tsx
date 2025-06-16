
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const obterDiasDoMes = (date: Date) => {
    const ano = date.getFullYear();
    const mes = date.getMonth();
    
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();
    
    const dias = [];
    
    // Dias do mês anterior
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
      const diaAnterior = new Date(ano, mes, -i);
      dias.push({ date: diaAnterior, isCurrentMonth: false });
    }
    
    // Dias do mês atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataAtual = new Date(ano, mes, dia);
      dias.push({ date: dataAtual, isCurrentMonth: true });
    }
    
    // Dias do próximo mês para completar a grade
    const diasRestantes = 42 - dias.length;
    for (let dia = 1; dia <= diasRestantes; dia++) {
      const proximoDia = new Date(ano, mes + 1, dia);
      dias.push({ date: proximoDia, isCurrentMonth: false });
    }
    
    return dias;
  };

  const navegarMes = (direction: 'prev' | 'next') => {
    const novaData = new Date(viewDate);
    if (direction === 'prev') {
      novaData.setMonth(novaData.getMonth() - 1);
    } else {
      novaData.setMonth(novaData.getMonth() + 1);
    }
    setViewDate(novaData);
  };

  const selecionarData = (date: Date) => {
    if (isDataDesabilitada(date)) return;
    
    if (onChange) {
      onChange(date);
    }
    setIsOpen(false);
  };

  const isDataDesabilitada = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const ehHoje = (date: Date) => {
    const hoje = new Date();
    return date.toDateString() === hoje.toDateString();
  };

  const ehSelecionada = (date: Date) => {
    if (!value) return false;
    return date.toDateString() === value.toDateString();
  };

  const selecionarHoje = () => {
    const hoje = new Date();
    selecionarData(hoje);
  };

  const diasDoMes = obterDiasDoMes(viewDate);

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
          {/* Cabeçalho */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navegarMes('prev')}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <div className="font-semibold text-lg">
                {meses[viewDate.getMonth()]}
              </div>
              <div className="text-sm text-muted-foreground">
                {viewDate.getFullYear()}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navegarMes('next')}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendário */}
          <div className="p-4">
            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {diasSemana.map((dia) => (
                <div key={dia} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {dia}
                </div>
              ))}
            </div>

            {/* Grade de dias */}
            <div className="grid grid-cols-7 gap-1">
              {diasDoMes.map((item, index) => {
                const { date, isCurrentMonth } = item;
                const isHojeData = ehHoje(date);
                const isSelecionada = ehSelecionada(date);
                const isDesabilitada = isDataDesabilitada(date);

                return (
                  <button
                    key={index}
                    onClick={() => selecionarData(date)}
                    disabled={isDesabilitada}
                    className={cn(
                      "h-8 w-8 text-sm rounded-md transition-colors relative",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      !isCurrentMonth && "text-muted-foreground opacity-50",
                      isHojeData && "bg-accent text-accent-foreground font-semibold",
                      isSelecionada && "bg-primary text-primary-foreground hover:bg-primary/90",
                      isDesabilitada && "opacity-25 cursor-not-allowed hover:bg-transparent"
                    )}
                  >
                    {date.getDate()}
                    {isHojeData && !isSelecionada && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rodapé */}
          <div className="flex justify-between items-center p-4 border-t bg-muted/10">
            <Button
              variant="ghost"
              size="sm"
              onClick={selecionarHoje}
              className="text-sm"
            >
              Hoje
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground"
            >
              Cancelar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SeletorData;
