import { eventosAPI } from '@/lib/api';
import type { Evento } from '@/types/eventos';
import { useCallback, useEffect, useState } from 'react';

export type TipoVisualizacao = 'mes' | 'semana' | 'dia' | 'lista';

interface FiltrosEventos {
  dataInicio?: Date;
  dataFim?: Date;
  localIds?: string[]; // Mudança: agora aceita múltiplos locais
  clienteId?: string;
  status?: string;
}

// Hook para usar com API real
export function useEventosReal(filtros?: FiltrosEventos) {
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar eventos por período usando API real
  const buscarEventosPorPeriodo = useCallback(async (filtros: FiltrosEventos): Promise<Evento[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        dataInicio: filtros.dataInicio?.toISOString().split('T')[0] || '',
        dataFim: filtros.dataFim?.toISOString().split('T')[0] || '',
        localIds: filtros.localIds, // Passar array de locais
        clienteId: filtros.clienteId,
        status: filtros.status,
      };

      const response = await eventosAPI.buscarPorPeriodo(params);
      setEventos(response.data || []);
      return response.data || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      setEventos([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para buscar eventos por visualização usando API real
  const buscarPorVisualizacao = useCallback(async (
    tipoVisualizacao: TipoVisualizacao, 
    dataAtual: Date,
    localIds?: string[]
  ): Promise<Evento[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        tipoVisualizacao,
        dataAtual: dataAtual.toISOString().split('T')[0],
        localIds, // Passar array de locais
      };

      const response = await eventosAPI.buscarPorVisualizacao(params);
      setEventos(response.data || []);
      return response.data || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      setEventos([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito para buscar eventos quando os filtros mudarem
  useEffect(() => {
    if (filtros) {
      buscarEventosPorPeriodo(filtros);
    }
  }, [filtros, buscarEventosPorPeriodo]);

  // Buscar todos
  const listar = () => eventos;

  // Buscar por id
  const buscarPorId = (id: string) => eventos.find(e => e.id === id);

  // Filtrar por local, cliente, status, data, etc
  const filtrar = (filtros: Partial<Pick<Evento, 'localId' | 'clienteId' | 'status' | 'data'>>) => {
    return eventos.filter(ev => {
      if (filtros.localId && ev.localId !== filtros.localId) return false;
      if (filtros.clienteId && ev.clienteId !== filtros.clienteId) return false;
      if (filtros.status && ev.status !== filtros.status) return false;
      if (filtros.data && ev.data !== filtros.data) return false;
      return true;
    });
  };

  // Métodos de criação/edição/deleção usando API real
  const criar = useCallback(async (evento: Omit<Evento, 'id'>) => {
    try {
      const response = await eventosAPI.criar(evento);
      // Recarregar eventos após criar
      if (filtros) {
        await buscarEventosPorPeriodo(filtros);
      }
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar evento';
      setError(errorMessage);
      throw err;
    }
  }, [filtros, buscarEventosPorPeriodo]);

  const editar = useCallback(async (id: string, dados: Partial<Evento>) => {
    try {
      const response = await eventosAPI.atualizar(id, dados);
      // Recarregar eventos após editar
      if (filtros) {
        await buscarEventosPorPeriodo(filtros);
      }
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao editar evento';
      setError(errorMessage);
      throw err;
    }
  }, [filtros, buscarEventosPorPeriodo]);

  const deletar = useCallback(async (id: string) => {
    try {
      await eventosAPI.deletar(id);
      // Recarregar eventos após deletar
      if (filtros) {
        await buscarEventosPorPeriodo(filtros);
      }
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar evento';
      setError(errorMessage);
      throw err;
    }
  }, [filtros, buscarEventosPorPeriodo]);

  return { 
    eventos, 
    loading, 
    error,
    listar, 
    buscarPorId, 
    filtrar, 
    criar, 
    editar, 
    deletar,
    buscarPorVisualizacao,
    buscarEventosPorPeriodo
  };
} 