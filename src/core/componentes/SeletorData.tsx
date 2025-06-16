
import React, { useState, useRef, useEffect } from 'react';
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
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const formatarData = (date: Date) => {
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const obterDiasDoMes = () => {
    const ano = currentMonth.getFullYear();
    const mes = currentMonth.getMonth();
    
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const primeiroDiaSemana = primeiroDia.getDay();
    
    const dias = [];
    
    // Dias do mês anterior para completar a primeira semana
    for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
      const diaAnterior = new Date(ano, mes, -i);
      dias.push({
        data: diaAnterior,
        mesAtual: false
      });
    }
    
    // Dias do mês atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
      dias.push({
        data: new Date(ano, mes, dia),
        mesAtual: true
      });
    }
    
    // Dias do próximo mês para completar a última semana
    const diasRestantes = 42 - dias.length; // 6 semanas * 7 dias
    for (let dia = 1; dia <= diasRestantes; dia++) {
      dias.push({
        data: new Date(ano, mes + 1, dia),
        mesAtual: false
      });
    }
    
    return dias;
  };

  const navegarMes = (direcao: 'anterior' | 'proximo') => {
    setCurrentMonth(prev => {
      const novoMes = new Date(prev);
      if (direcao === 'anterior') {
        novoMes.setMonth(prev.getMonth() - 1);
      } else {
        novoMes.setMonth(prev.getMonth() + 1);
      }
      return novoMes;
    });
  };

  const selecionarData = (data: Date) => {
    if (onChange) {
      onChange(data);
    }
    setIsOpen(false);
  };

  const dataEstaDesabilitada = (data: Date) => {
    if (minDate && data < minDate) return true;
    if (maxDate && data > maxDate) return true;
    return false;
  };

  const datasSaoIguais = (data1: Date, data2: Date) => {
    return data1.getDate() === data2.getDate() &&
           data1.getMonth() === data2.getMonth() &&
           data1.getFullYear() === data2.getFullYear();
  };

  const ehHoje = (data: Date) => {
    const hoje = new Date();
    return datasSaoIguais(data, hoje);
  };

  const dias = obterDiasDoMes();

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
            {value ? formatarData(value) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-4">
            {/* Cabeçalho com navegação */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navegarMes('anterior')}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <h4 className="text-sm font-semibold">
                {meses[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h4>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navegarMes('proximo')}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {diasSemana.map((dia, index) => (
                <div key={index} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {dia}
                </div>
              ))}
            </div>

            {/* Grade do calendário */}
            <div className="grid grid-cols-7 gap-1">
              {dias.map((item, index) => {
                const { data, mesAtual } = item;
                const estaSelecionado = value && datasSaoIguais(data, value);
                const estaDesabilitado = dataEstaDesabilitada(data);
                const eHoje = ehHoje(data);

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 w-8 p-0 font-normal transition-colors",
                      !mesAtual && "text-muted-foreground opacity-50",
                      estaSelecionado && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                      eHoje && !estaSelecionado && "bg-accent text-accent-foreground font-semibold",
                      estaDesabilitado && "opacity-25 cursor-not-allowed"
                    )}
                    disabled={estaDesabilitado}
                    onClick={() => selecionarData(data)}
                  >
                    {data.getDate()}
                  </Button>
                );
              })}
            </div>

            {/* Rodapé */}
            <div className="flex justify-between items-center pt-4 border-t mt-4">
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
                    selecionarData(value);
                  } else {
                    selecionarData(new Date());
                  }
                }}
              >
                Hoje
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SeletorData;
