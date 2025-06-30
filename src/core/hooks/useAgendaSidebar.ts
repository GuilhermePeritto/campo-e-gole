
import { useState, useCallback } from 'react';
import { useLocais } from '@/hooks/useLocais';
import { getLocalTimeZone, today } from "@internationalized/date";
import type { DateValue } from "react-aria-components";

export const useAgendaSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(today(getLocalTimeZone()));
  const [selectedLocais, setSelectedLocais] = useState<string[]>(['all']);
  const { locais } = useLocais();

  const toggleSidebar = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleDateChange = useCallback((date: DateValue | null) => {
    setSelectedDate(date);
  }, []);

  const handleLocalToggle = useCallback((localId: string) => {
    setSelectedLocais(prev => {
      if (localId === 'all') {
        return ['all'];
      }
      
      const newSelection = prev.includes(localId)
        ? prev.filter(id => id !== localId)
        : [...prev.filter(id => id !== 'all'), localId];
      
      return newSelection.length === 0 ? ['all'] : newSelection;
    });
  }, []);

  const isLocalSelected = useCallback((localId: string) => {
    return selectedLocais.includes('all') || selectedLocais.includes(localId);
  }, [selectedLocais]);

  return {
    isExpanded,
    selectedDate,
    selectedLocais,
    locais,
    toggleSidebar,
    handleDateChange,
    handleLocalToggle,
    isLocalSelected
  };
};
