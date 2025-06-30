
import { useState, useCallback } from 'react';
import { useLocais } from '@/hooks/useLocais';
import { getLocalTimeZone, today } from "@internationalized/date";
import type { DateValue } from "react-aria-components";

interface UseAgendaSidebarProps {
  currentDate: Date;
  onSetCurrentDate: (date: Date) => void;
}

export const useAgendaSidebar = ({ currentDate, onSetCurrentDate }: UseAgendaSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedLocais, setSelectedLocais] = useState<string[]>(['all']);
  const { locais } = useLocais();

  // Converter a data atual para DateValue do React Aria
  const dateToDateValue = useCallback((date: Date): DateValue => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return { calendar: getLocalTimeZone().calendar, era: 'CE', year, month, day };
  }, []);

  // Converter DateValue para Date
  const dateValueToDate = useCallback((dateValue: DateValue | null): Date => {
    if (!dateValue) return new Date();
    return new Date(dateValue.year, dateValue.month - 1, dateValue.day);
  }, []);

  const selectedDate = dateToDateValue(currentDate);

  const toggleSidebar = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleDateChange = useCallback((date: DateValue | null) => {
    if (date) {
      const newDate = dateValueToDate(date);
      onSetCurrentDate(newDate);
    }
  }, [dateValueToDate, onSetCurrentDate]);

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
