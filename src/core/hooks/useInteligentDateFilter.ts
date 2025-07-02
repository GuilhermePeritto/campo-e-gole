import { useMemo, useCallback } from 'react';
import { isSameMonth, isSameWeek, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import type { DateValue } from "react-aria-components";

interface UseInteligentDateFilterProps {
  viewType: 'month' | 'week' | 'day' | 'agenda';
  currentDate: Date;
  selectedDate: DateValue | null;
}

export const useInteligentDateFilter = ({
  viewType,
  currentDate,
  selectedDate
}: UseInteligentDateFilterProps) => {
  
  // Converter DateValue para Date
  const selectedDateAsDate = useMemo(() => {
    if (!selectedDate) return null;
    return new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
  }, [selectedDate]);

  // Verificar se precisa filtrar baseado no tipo de visualização
  const shouldFilter = useMemo(() => {
    if (!selectedDateAsDate) return false;

    switch (viewType) {
      case 'month':
        return !isSameMonth(currentDate, selectedDateAsDate);
      
      case 'week':
        return !isSameWeek(currentDate, selectedDateAsDate, { weekStartsOn: 0 });
      
      case 'day':
        return !isSameDay(currentDate, selectedDateAsDate);
      
      case 'agenda':
        return true; // Agenda sempre filtra
      
      default:
        return false;
    }
  }, [viewType, currentDate, selectedDateAsDate]);

  // Obter período atual baseado na visualização
  const getCurrentPeriod = useCallback(() => {
    switch (viewType) {
      case 'month':
        return {
          type: 'month' as const,
          year: currentDate.getFullYear(),
          month: currentDate.getMonth()
        };
      
      case 'week':
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
        return {
          type: 'week' as const,
          start: weekStart,
          end: weekEnd
        };
      
      case 'day':
        return {
          type: 'day' as const,
          date: currentDate
        };
      
      default:
        return {
          type: 'agenda' as const,
          date: currentDate
        };
    }
  }, [viewType, currentDate]);

  return {
    shouldFilter,
    selectedDateAsDate,
    getCurrentPeriod
  };
};