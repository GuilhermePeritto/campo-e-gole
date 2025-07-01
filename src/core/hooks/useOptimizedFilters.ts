
import { useState, useCallback, useMemo, useRef } from 'react';
import { format, isSameMonth, isSameWeek, isSameDay } from 'date-fns';

interface UseOptimizedFiltersProps {
  currentDate: Date;
  viewType: 'month' | 'week' | 'day' | 'agenda';
}

export const useOptimizedFilters = ({ currentDate, viewType }: UseOptimizedFiltersProps) => {
  const [lastFilterState, setLastFilterState] = useState<{
    date: Date;
    viewType: string;
    dateKey: string;
  } | null>(null);

  const shouldRefetch = useCallback((newDate: Date, newViewType: string) => {
    if (!lastFilterState) return true;

    const isSameViewType = lastFilterState.viewType === newViewType;
    if (!isSameViewType) return true;

    switch (newViewType) {
      case 'month':
        return !isSameMonth(lastFilterState.date, newDate);
      case 'week':
        return !isSameWeek(lastFilterState.date, newDate, { weekStartsOn: 0 });
      case 'day':
      case 'agenda':
        return !isSameDay(lastFilterState.date, newDate);
      default:
        return true;
    }
  }, [lastFilterState]);

  const updateFilterState = useCallback((newDate: Date, newViewType: string) => {
    const dateKey = format(newDate, 'yyyy-MM-dd');
    setLastFilterState({
      date: newDate,
      viewType: newViewType,
      dateKey
    });
  }, []);

  const getCurrentDateKey = useCallback(() => {
    switch (viewType) {
      case 'month':
        return format(currentDate, 'yyyy-MM');
      case 'week':
        return format(currentDate, 'yyyy-ww');
      case 'day':
      case 'agenda':
        return format(currentDate, 'yyyy-MM-dd');
      default:
        return format(currentDate, 'yyyy-MM-dd');
    }
  }, [currentDate, viewType]);

  return {
    shouldRefetch,
    updateFilterState,
    getCurrentDateKey,
    lastFilterState
  };
};
</lov-hook>