
import { useState, useCallback, useMemo } from 'react';
import { getLocalTimeZone, today } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import { useNavigate } from 'react-router-dom';
import { useLocais } from '@/hooks/useLocais';
import { useReservas } from '@/hooks/useReservas';

export type ViewType = 'month' | 'week' | 'day' | 'agenda';

export const useAgendaNova = () => {
  const navigate = useNavigate();
  const { locais } = useLocais();
  const { getCalendarReservations } = useReservas();
  
  const [viewType, setViewType] = useState<ViewType>('week');
  const [selectedDate, setSelectedDate] = useState<DateValue>(today(getLocalTimeZone()));
  const [selectedLocais, setSelectedLocais] = useState<string[]>(['all']);
  const [currentDate, setCurrentDate] = useState(new Date());

  const venues = useMemo(() => [
    { id: 'all', name: 'Todos os locais', color: '#6b7280' },
    ...locais.map(local => ({
      id: local.id,
      name: local.name,
      color: local.color
    }))
  ], [locais]);

  const filteredReservations = useMemo(() => {
    const reservations = getCalendarReservations;
    if (selectedLocais.includes('all')) {
      return reservations;
    }
    return reservations.filter(reservation => 
      selectedLocais.includes(reservation.venueId)
    );
  }, [getCalendarReservations, selectedLocais]);

  const navigateDate = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      switch (viewType) {
        case 'month':
          newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
          break;
        case 'week':
          newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
          break;
        case 'day':
          newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
          break;
        case 'agenda':
          newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
          break;
      }
      return newDate;
    });
  }, [viewType]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today(getLocalTimeZone()));
  }, []);

  const handleEventClick = useCallback((eventId: number) => {
    navigate(`/eventos/reserva/${eventId}/editar`);
  }, [navigate]);

  const handleDateClick = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    navigate(`/eventos/reserva?date=${dateStr}`);
  }, [navigate]);

  const handleDayFilterClick = useCallback((day: Date) => {
    setCurrentDate(day);
    setViewType('day');
  }, []);

  const toggleLocalSelection = useCallback((localId: string) => {
    if (localId === 'all') {
      setSelectedLocais(['all']);
    } else {
      setSelectedLocais(prev => {
        const newSelection = prev.filter(id => id !== 'all');
        if (newSelection.includes(localId)) {
          const filtered = newSelection.filter(id => id !== localId);
          return filtered.length === 0 ? ['all'] : filtered;
        } else {
          return [...newSelection, localId];
        }
      });
    }
  }, []);

  return {
    viewType,
    setViewType,
    selectedDate,
    setSelectedDate,
    selectedLocais,
    setSelectedLocais,
    currentDate,
    setCurrentDate,
    venues,
    filteredReservations,
    navigateDate,
    goToToday,
    handleEventClick,
    handleDateClick,
    handleDayFilterClick,
    toggleLocalSelection
  };
};
