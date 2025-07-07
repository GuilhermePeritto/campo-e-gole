import { useMemo } from 'react';
import type { EventoAgenda } from './useCalendar';

interface UseEventFilteringProps {
  eventos: EventoAgenda[];
  locaisSelecionados: string[];
  busca?: string;
}

export const useEventFiltering = ({
  eventos,
  locaisSelecionados,
  busca = ''
}: UseEventFilteringProps) => {
  
  const filteredEvents = useMemo(() => {
    let filtrados = eventos;

    // Filtrar por locais selecionados
    if (!locaisSelecionados.includes('all')) {
      filtrados = filtrados.filter(evento => {
        return locaisSelecionados.includes(evento.localId);
      });
    }

    // Filtrar por busca
    if (busca.trim()) {
      const query = busca.toLowerCase();
      filtrados = filtrados.filter(evento => {
        return (
          evento.cliente.toLowerCase().includes(query) ||
          evento.local.toLowerCase().includes(query) ||
          evento.titulo?.toLowerCase().includes(query)
        );
      });
    }

    return filtrados;
  }, [eventos, locaisSelecionados, busca]);

  // Agrupar eventos por dia
  const eventsByDay = useMemo(() => {
    return filteredEvents.reduce((acc, evento) => {
      let dateKey = 'invalid';
      if (evento.dia instanceof Date && !isNaN(evento.dia.getTime())) {
        dateKey = evento.dia.toISOString().split('T')[0];
      }
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(evento);
      return acc;
    }, {} as Record<string, EventoAgenda[]>);
  }, [filteredEvents]);

  // Contar eventos por local
  const eventCountByVenue = useMemo(() => {
    return filteredEvents.reduce((acc, evento) => {
      acc[evento.localId] = (acc[evento.localId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredEvents]);

  return {
    filteredEvents,
    eventsByDay,
    eventCountByVenue
  };
};
