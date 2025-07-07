import { endOfWeek, isSameDay, isSameWeek, startOfWeek } from 'date-fns';
import { useCallback, useMemo } from 'react';
import type { DateValue } from "react-aria-components";

interface UseInteligentDateFilterProps {
  tipoVisualizacao: 'mes' | 'semana' | 'dia' | 'lista';
  dataAtual: Date;
  dataSelecionada: DateValue | null;
}

export const useInteligentDateFilter = ({
  tipoVisualizacao,
  dataAtual,
  dataSelecionada
}: UseInteligentDateFilterProps) => {
  
  // Converter DateValue para Date
  const selectedDateAsDate = useMemo(() => {
    if (!dataSelecionada) return null;
    const convertedDate = new Date(dataSelecionada.year, dataSelecionada.month - 1, dataSelecionada.day);
    console.log('useInteligentDateFilter - conversão de data:', {
      dataSelecionada,
      convertedDate
    });
    return convertedDate;
  }, [dataSelecionada]);

  // Verificar se precisa filtrar baseado no tipo de visualização
  const shouldFilter = useMemo(() => {
    if (!selectedDateAsDate) return false;

    let result = false;
    switch (tipoVisualizacao) {
      case 'mes':
        result = !(dataAtual.getMonth() === selectedDateAsDate.getMonth() && dataAtual.getFullYear() === selectedDateAsDate.getFullYear());
        break;
      
      case 'semana':
        result = !isSameWeek(dataAtual, selectedDateAsDate, { weekStartsOn: 0 });
        break;
      
      case 'dia':
        result = !isSameDay(dataAtual, selectedDateAsDate);
        break;
      
      case 'lista':
        result = true; // Lista sempre filtra
        break;
      
      default:
        result = false;
        break;
    }
    
    console.log('useInteligentDateFilter - shouldFilter:', {
      tipoVisualizacao,
      dataAtual,
      selectedDateAsDate,
      result
    });
    
    return result;
  }, [tipoVisualizacao, dataAtual, selectedDateAsDate]);

  // Obter período atual baseado na visualização
  const getCurrentPeriod = useCallback(() => {
    let period;
    switch (tipoVisualizacao) {
      case 'mes':
        period = {
          type: 'mes' as const,
          year: dataAtual.getFullYear(),
          month: dataAtual.getMonth()
        };
        break;
      
      case 'semana':
        const weekStart = startOfWeek(dataAtual, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(dataAtual, { weekStartsOn: 0 });
        period = {
          type: 'semana' as const,
          start: weekStart,
          end: weekEnd
        };
        break;
      
      case 'dia':
        period = {
          type: 'dia' as const,
          date: dataAtual
        };
        break;
      
      default:
        period = {
          type: 'lista' as const,
          date: dataAtual
        };
        break;
    }
    
    console.log('useInteligentDateFilter - getCurrentPeriod:', {
      tipoVisualizacao,
      dataAtual,
      period
    });
    
    return period;
  }, [tipoVisualizacao, dataAtual]);

  return {
    shouldFilter,
    selectedDateAsDate,
    getCurrentPeriod
  };
};