
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useLocais } from '@/hooks/useLocais';
import { getLocalTimeZone, today, fromDate } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import { useOptimizedFilters } from './useOptimizedFilters';

interface UseBarraLateralAgendaProps {
  currentDate: Date;
  viewType: 'month' | 'week' | 'day' | 'agenda';
}

export const useBarraLateralAgenda = (props?: UseBarraLateralAgendaProps) => {
  const [expandida, setExpandida] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState<DateValue | null>(today(getLocalTimeZone()));
  const [locaisSelecionados, setLocaisSelecionados] = useState<string[]>(['all']);
  const [consulta, setConsulta] = useState('');
  const { locais } = useLocais();

  const {
    shouldRefetch,
    updateFilterState,
    getCurrentDateKey
  } = useOptimizedFilters({
    currentDate: props?.currentDate || new Date(),
    viewType: props?.viewType || 'month'
  });

  const alternarBarra = useCallback(() => {
    setExpandida(prev => !prev);
  }, []);

  const manipularMudancaData = useCallback((data: DateValue | null) => {
    const novaData = data ? new Date(data.year, data.month - 1, data.day) : new Date();
    
    // Verificar se precisa refazer a busca
    const precisaRefazer = shouldRefetch(novaData, props?.viewType || 'month');
    
    console.log('Mudança de data:', {
      dataAnterior: dataSelecionada,
      novaData: data,
      precisaRefazer,
      viewType: props?.viewType
    });

    setDataSelecionada(data);
    
    if (precisaRefazer && props) {
      updateFilterState(novaData, props.viewType);
    }
  }, [dataSelecionada, shouldRefetch, updateFilterState, props]);

  const manipularAlternarLocal = useCallback((localId: string) => {
    setLocaisSelecionados(prev => {
      if (localId === 'all') {
        return ['all'];
      }
      
      const novaSelecao = prev.includes(localId)
        ? prev.filter(id => id !== localId)
        : [...prev.filter(id => id !== 'all'), localId];
      
      return novaSelecao.length === 0 ? ['all'] : novaSelecao;
    });
  }, []);

  const isLocalSelecionado = useCallback((localId: string) => {
    return locaisSelecionados.includes('all') || locaisSelecionados.includes(localId);
  }, [locaisSelecionados]);

  const manipularMudancaConsulta = useCallback((novaConsulta: string) => {
    setConsulta(novaConsulta);
  }, []);

  const locaisFiltrados = useMemo(() => {
    if (!consulta.trim()) return locais;
    
    return locais.filter(local =>
      local.name.toLowerCase().includes(consulta.toLowerCase()) ||
      local.type.toLowerCase().includes(consulta.toLowerCase())
    );
  }, [locais, consulta]);

  // Sincronizar data selecionada com a agenda principal
  const sincronizarDataComAgenda = useCallback((dataAgenda: Date) => {
    const valorData = fromDate(dataAgenda, getLocalTimeZone());
    
    // Só atualizar se for diferente da data atual
    if (!dataSelecionada || 
        dataSelecionada.year !== valorData.year ||
        dataSelecionada.month !== valorData.month ||
        dataSelecionada.day !== valorData.day) {
      setDataSelecionada(valorData);
    }
  }, [dataSelecionada]);

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
    alternarBarra,
    manipularMudancaData,
    manipularAlternarLocal,
    isLocalSelecionado,
    manipularMudancaConsulta,
    sincronizarDataComAgenda,
    obterDataSelecionadaComoDate,
    getCurrentDateKey,
    shouldRefetch
  };
};
