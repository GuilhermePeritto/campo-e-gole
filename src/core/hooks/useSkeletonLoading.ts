import { useState, useEffect, useCallback, useMemo } from 'react';
import { addDays, startOfMonth, endOfMonth, eachDayOfInterval, format, startOfWeek, endOfWeek } from 'date-fns';

interface LoadingState {
  [key: string]: boolean;
}

interface UseSkeletonLoadingProps {
  viewType: 'month' | 'week' | 'day' | 'agenda';
  currentDate: Date;
  shouldReload?: boolean;
}

export const useSkeletonLoading = ({
  viewType,
  currentDate,
  shouldReload = false
}: UseSkeletonLoadingProps) => {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  // Obter dias relevantes baseado no tipo de visualização
  const relevantDays = useMemo(() => {
    switch (viewType) {
      case 'month':
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
        const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
        return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
      
      case 'week':
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
        return eachDayOfInterval({ start: weekStart, end: weekEnd });
      
      case 'day':
        return [currentDate];
      
      default:
        return [currentDate];
    }
  }, [viewType, currentDate]);

  // Simular carregamento para cada dia
  const simulateLoading = useCallback(async (dayKey: string) => {
    // Delay aleatório entre 300ms e 1.5s para simular requests reais
    const delay = Math.random() * 1200 + 300;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    setLoadingStates(prev => ({
      ...prev,
      [dayKey]: false
    }));
  }, []);

  // Iniciar loading para todos os dias relevantes
  useEffect(() => {
    const newLoadingStates: LoadingState = {};
    
    relevantDays.forEach(day => {
      const dayKey = format(day, 'yyyy-MM-dd');
      newLoadingStates[dayKey] = true;
    });

    setLoadingStates(newLoadingStates);

    // Simular loading para cada dia
    relevantDays.forEach(day => {
      const dayKey = format(day, 'yyyy-MM-dd');
      simulateLoading(dayKey);
    });
  }, [relevantDays, simulateLoading, shouldReload]);

  // Verificar se um dia específico está carregando
  const isDayLoading = useCallback((date: Date) => {
    const dayKey = format(date, 'yyyy-MM-dd');
    return loadingStates[dayKey] ?? false;
  }, [loadingStates]);

  // Verificar se ainda há dias carregando
  const hasAnyLoading = useMemo(() => {
    return Object.values(loadingStates).some(loading => loading);
  }, [loadingStates]);

  // Obter porcentagem de carregamento concluído
  const loadingProgress = useMemo(() => {
    const total = Object.keys(loadingStates).length;
    if (total === 0) return 100;
    
    const completed = Object.values(loadingStates).filter(loading => !loading).length;
    return Math.round((completed / total) * 100);
  }, [loadingStates]);

  return {
    isDayLoading,
    hasAnyLoading,
    loadingProgress,
    relevantDays,
    loadingStates
  };
};