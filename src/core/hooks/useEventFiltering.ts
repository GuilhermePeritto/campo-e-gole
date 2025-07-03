
import { useMemo } from 'react';
import type { Reservation } from '@/hooks/useCalendar';

interface UseEventFilteringProps {
  eventos: Reservation[];
  selectedLocais: string[];
  searchQuery?: string;
}

export const useEventFiltering = ({
  eventos,
  selectedLocais,
  searchQuery = ''
}: UseEventFilteringProps) => {
  
  const filteredEvents = useMemo(() => {
    let filtered = eventos;

    // Filtrar por locais selecionados
    if (!selectedLocais.includes('all')) {
      filtered = filtered.filter(evento => {
        return selectedLocais.includes(evento.venueId);
      });
    }

    // Filtrar por busca (se implementado)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(evento => {
        return (
          evento.client.toLowerCase().includes(query) ||
          evento.venue.toLowerCase().includes(query) ||
          evento.title?.toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [eventos, selectedLocais, searchQuery]);

  // Agrupar eventos por dia para otimização
  const eventsByDay = useMemo(() => {
    return filteredEvents.reduce((acc, evento) => {
      const dateKey = evento.day.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(evento);
      return acc;
    }, {} as Record<string, Reservation[]>);
  }, [filteredEvents]);

  // Contar eventos por local
  const eventCountByVenue = useMemo(() => {
    return filteredEvents.reduce((acc, evento) => {
      acc[evento.venueId] = (acc[evento.venueId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredEvents]);

  return {
    filteredEvents,
    eventsByDay,
    eventCountByVenue
  };
};
