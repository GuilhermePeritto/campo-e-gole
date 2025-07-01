
import { useState, useCallback, useEffect } from 'react';
import { useLocais } from '@/hooks/useLocais';
import { getLocalTimeZone, today, fromDate } from "@internationalized/date";
import type { DateValue } from "react-aria-components";

export const useAgendaSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(today(getLocalTimeZone()));
  const [selectedLocais, setSelectedLocais] = useState<string[]>(['all']);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredLocais = locais.filter(local =>
    local.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    local.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sincronizar data selecionada com a agenda principal
  const syncDateWithAgenda = useCallback((agendaDate: Date) => {
    const dateValue = fromDate(agendaDate, getLocalTimeZone());
    setSelectedDate(dateValue);
  }, []);

  // Converter DateValue para Date para a agenda
  const getSelectedDateAsDate = useCallback(() => {
    if (!selectedDate) return new Date();
    return new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
  }, [selectedDate]);

  return {
    isExpanded,
    selectedDate,
    selectedLocais,
    searchQuery,
    locais: filteredLocais,
    allLocais: locais,
    toggleSidebar,
    handleDateChange,
    handleLocalToggle,
    isLocalSelected,
    handleSearchChange,
    syncDateWithAgenda,
    getSelectedDateAsDate
  };
};
