
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useLocais } from '@/hooks/useLocais';
import { useEventFiltering } from './useEventFiltering';
import { getLocalTimeZone, today, fromDate } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import type { Reservation } from '@/hooks/useCalendar';
import { useInteligentDateFilter } from './useInteligentDateFilter';

interface UseBarraLateralAgendaProps {
  viewType: 'month' | 'week' | 'day' | 'agenda';
  currentDate: Date;
  allEvents?: Reservation[];
}

export const useBarraLateralAgenda = ({ 
  viewType, 
  currentDate, 
  allEvents = [] 
}: UseBarraLateralAgendaProps) => {
  const [expandida, setExpandida] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState<DateValue | null>(today(getLocalTimeZone()));
  const [locaisSelecionados, setLocaisSelecionados] = useState<string[]>(['all']);
  const [consulta, setConsulta] = useState('');
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
  const { locais } = useLocais();

  // Hook para filtragem inteligente
  const { shouldFilter, selectedDateAsDate, getCurrentPeriod } = useInteligentDateFilter({
    viewType,
    currentDate,
    selectedDate: dataSelecionada
  });

  // Hook para filtrar eventos
  const { filteredEvents, eventsByDay, eventCountByVenue } = useEventFiltering({
    eventos: allEvents,
    selectedLocais: locaisSelecionados,
    searchQuery: consulta
  });

  const alternarBarra = useCallback(() => {
    setExpandida(prev => !prev);
  }, []);

  const manipularMudancaData = useCallback((data: DateValue | null) => {
    setDataSelecionada(data);
    
    // Só atualizar se realmente precisar filtrar
    if (shouldFilter) {
      setUltimaAtualizacao(Date.now());
    }
  }, [shouldFilter]);

  const manipularAlternarLocal = useCallback((localId: string) => {
    setLocaisSelecionados(prev => {
      if (localId === 'all') {
        setUltimaAtualizacao(Date.now());
        return ['all'];
      }
      
      const novaSelecao = prev.includes(localId)
        ? prev.filter(id => id !== localId)
        : [...prev.filter(id => id !== 'all'), localId];
      
      const resultado = novaSelecao.length === 0 ? ['all'] : novaSelecao;
      setUltimaAtualizacao(Date.now());
      return resultado;
    });
  }, []);

  const isLocalSelecionado = useCallback((localId: string) => {
    return locaisSelecionados.includes('all') || locaisSelecionados.includes(localId);
  }, [locaisSelecionados]);

  const manipularMudancaConsulta = useCallback((novaConsulta: string) => {
    setConsulta(novaConsulta);
  }, []);

  const locaisFiltrados = useMemo(() => {
    return locais.filter(local =>
      local.name.toLowerCase().includes(consulta.toLowerCase()) ||
      local.type.toLowerCase().includes(consulta.toLowerCase())
    );
  }, [locais, consulta]);

  // Sincronizar data selecionada com a agenda principal
  const sincronizarDataComAgenda = useCallback((dataAgenda: Date) => {
    const valorData = fromDate(dataAgenda, getLocalTimeZone());
    setDataSelecionada(valorData);
  }, []);

  // Converter DateValue para Date para a agenda
  const obterDataSelecionadaComoDate = useCallback(() => {
    if (!dataSelecionada) return new Date();
    return new Date(dataSelecionada.year, dataSelecionada.month - 1, dataSelecionada.day);
  }, [dataSelecionada]);

  return {
    expandida,
    dataSelecionada,
    locaisSelecionados,
    consulta,
    locais: locaisFiltrados,
    todosLocais: locais,
    eventCountByVenue,
    filteredEvents,
    eventsByDay,
    shouldFilter,
    selectedDateAsDate,
    getCurrentPeriod,
    ultimaAtualizacao,
    alternarBarra,
    manipularMudancaData,
    manipularAlternarLocal,
    isLocalSelecionado,
    manipularMudancaConsulta,
    sincronizarDataComAgenda,
    obterDataSelecionadaComoDate
  };
};
