import { mockLocais } from '@/data/mockLocais';
import { mockReservations } from '@/data/mockReservations';
import type { Evento } from '@/types/eventos';
import { endOfMonth, endOfWeek, parseISO, startOfMonth, startOfWeek } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type TipoVisualizacao = 'mes' | 'semana' | 'dia' | 'lista';

interface FiltrosEventos {
  dataInicio?: Date;
  dataFim?: Date;
  localIds?: string[]; // Mudança: agora aceita múltiplos locais
  clienteId?: string;
  status?: string;
}

interface CacheEntry {
  eventos: Evento[];
  filtros: FiltrosEventos;
  timestamp: number;
}

export function useEventos(filtros?: FiltrosEventos) {
  const [loading, setLoading] = useState(true);
  const [eventosFiltrados, setEventosFiltrados] = useState<Evento[]>([]);
  const [cache, setCache] = useState<Map<string, CacheEntry>>(new Map());

  // Map de locais para buscar cor pelo id
  const locaisMap = useMemo(() => {
    const map = new Map<string, string>();
    mockLocais.forEach(local => {
      map.set(String(local.id), local.color);
    });
    return map;
  }, []);

  // Adaptar dados mocados para o tipo Evento
  const todosEventos: Evento[] = useMemo(() => mockReservations.map(ev => ({
    id: String(ev.id),
    clienteId: String(ev.clientId),
    cliente: ev.client,
    localId: String(ev.venueId),
    local: ev.venue,
    data: ev.date,
    horaInicio: ev.startTime,
    horaFim: ev.endTime,
    status: ev.status === 'confirmed' ? 'confirmado' : ev.status === 'pending' ? 'pendente' : 'cancelado',
    cor: locaisMap.get(String(ev.venueId)) || '#6b7280',
    modalidade: ev.sport,
    observacoes: ev.notes,
    valor: ev.amount,
    criadoEm: ev.createdAt
  })), [locaisMap]);

  // Função para gerar chave do cache
  const gerarChaveCache = useCallback((filtros: FiltrosEventos): string => {
    const { dataInicio, dataFim, localIds, clienteId, status } = filtros;
    return JSON.stringify({
      dataInicio: dataInicio?.toISOString(),
      dataFim: dataFim?.toISOString(),
      localIds: localIds?.sort(), // Ordenar para garantir consistência
      clienteId,
      status
    });
  }, []);

  // Função para verificar se os dados já estão em cache
  const verificarCache = useCallback((filtros: FiltrosEventos): Evento[] | null => {
    if (!filtros.dataInicio || !filtros.dataFim) return null;

    const chaveCache = gerarChaveCache(filtros);
    const entradaCache = cache.get(chaveCache);
    
    if (entradaCache) {
      const agora = Date.now();
      const tempoExpiracao = 30 * 1000; // 30 segundos (reduzido de 5 minutos)
      
      // Verificar se o cache ainda é válido
      if (agora - entradaCache.timestamp < tempoExpiracao) {
        console.log('📦 Cache hit:', chaveCache);
        return entradaCache.eventos;
      } else {
        // Cache expirado, remover
        cache.delete(chaveCache);
      }
    }
    
    return null;
  }, [cache, gerarChaveCache]);

  // Função para salvar no cache
  const salvarCache = useCallback((filtros: FiltrosEventos, eventos: Evento[]) => {
    const chaveCache = gerarChaveCache(filtros);
    const entradaCache: CacheEntry = {
      eventos,
      filtros,
      timestamp: Date.now()
    };
    
    setCache(prev => {
      const novoCache = new Map(prev);
      novoCache.set(chaveCache, entradaCache);
      
      // Limpar cache antigo (manter apenas últimas 10 entradas)
      if (novoCache.size > 10) {
        const entradas = Array.from(novoCache.entries());
        const ordenadas = entradas.sort((a, b) => b[1].timestamp - a[1].timestamp);
        const novasEntradas = ordenadas.slice(0, 10);
        return new Map(novasEntradas);
      }
      
      return novoCache;
    });
    
    console.log('💾 Cache salvo:', chaveCache);
  }, [gerarChaveCache]);

  // Função para buscar eventos por período (simula chamada para API)
  const buscarEventosPorPeriodo = useCallback(async (filtros: FiltrosEventos): Promise<Evento[]> => {
    // Verificar cache primeiro
    const eventosCache = verificarCache(filtros);
    if (eventosCache) {
      setEventosFiltrados(eventosCache);
      setLoading(false);
      return eventosCache;
    }

    setLoading(true);
    console.log('🔍 Nova consulta:', filtros);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let eventos = todosEventos;
    
    // Filtrar por período
    if (filtros.dataInicio && filtros.dataFim) {
      eventos = eventos.filter(ev => {
        const dataEvento = parseISO(ev.data);
        return dataEvento >= filtros.dataInicio! && dataEvento <= filtros.dataFim!;
      });
    }
    
    // Filtrar por locais (múltiplos)
    if (filtros.localIds && filtros.localIds.length > 0) {
      eventos = eventos.filter(ev => filtros.localIds!.includes(ev.localId));
    }
    
    // Filtrar por cliente
    if (filtros.clienteId) {
      eventos = eventos.filter(ev => ev.clienteId === filtros.clienteId);
    }
    
    // Filtrar por status
    if (filtros.status) {
      eventos = eventos.filter(ev => ev.status === filtros.status);
    }
    
    // Salvar no cache
    salvarCache(filtros, eventos);
    
    setEventosFiltrados(eventos);
    setLoading(false);
    return eventos;
  }, [todosEventos, verificarCache, salvarCache]);

  // Efeito para buscar eventos quando os filtros mudarem
  useEffect(() => {
    if (filtros) {
      buscarEventosPorPeriodo(filtros);
    } else {
      // Se não há filtros, carregar todos os eventos
      setLoading(true);
      setTimeout(() => {
        setEventosFiltrados(todosEventos);
        setLoading(false);
      }, 800);
    }
  }, [filtros, buscarEventosPorPeriodo, todosEventos]);

  // Função para buscar eventos por visualização e data
  const buscarPorVisualizacao = useCallback(async (
    tipoVisualizacao: TipoVisualizacao, 
    dataAtual: Date,
    localIds?: string[]
  ): Promise<Evento[]> => {
    let dataInicio: Date;
    let dataFim: Date;
    
    switch (tipoVisualizacao) {
      case 'mes':
        dataInicio = startOfMonth(dataAtual);
        dataFim = endOfMonth(dataAtual);
        break;
      case 'semana':
        dataInicio = startOfWeek(dataAtual, { weekStartsOn: 0 });
        dataFim = endOfWeek(dataAtual, { weekStartsOn: 0 });
        break;
      case 'dia':
        dataInicio = dataAtual;
        dataFim = dataAtual;
        break;
      case 'lista':
        dataInicio = startOfMonth(dataAtual);
        dataFim = endOfMonth(dataAtual);
        break;
      default:
        dataInicio = startOfMonth(dataAtual);
        dataFim = endOfMonth(dataAtual);
    }
    
    const filtrosConsulta: FiltrosEventos = {
      dataInicio,
      dataFim,
      localIds
    };
    
    return await buscarEventosPorPeriodo(filtrosConsulta);
  }, [buscarEventosPorPeriodo]);

  // Função para limpar cache
  const limparCache = useCallback(() => {
    setCache(new Map());
    console.log('🧹 Cache limpo');
  }, []);

  // Buscar todos
  const listar = () => eventosFiltrados;

  // Buscar por id
  const buscarPorId = (id: string) => eventosFiltrados.find(e => e.id === id);

  // Filtrar por local, cliente, status, data, etc
  const filtrar = (filtros: Partial<Pick<Evento, 'localId' | 'clienteId' | 'status' | 'data'>>) => {
    return eventosFiltrados.filter(ev => {
      if (filtros.localId && ev.localId !== filtros.localId) return false;
      if (filtros.clienteId && ev.clienteId !== filtros.clienteId) return false;
      if (filtros.status && ev.status !== filtros.status) return false;
      if (filtros.data && ev.data !== filtros.data) return false;
      return true;
    });
  };

  // Métodos de criação/edição/deleção podem ser mocks (não alteram o array)
  const criar = (evento: Omit<Evento, 'id'>) => ({ ...evento, id: crypto.randomUUID() });
  const editar = (id: string, dados: Partial<Evento>) => ({ ...buscarPorId(id), ...dados });
  const deletar = (id: string) => true;

  return { 
    eventos: eventosFiltrados, 
    loading, 
    listar, 
    buscarPorId, 
    filtrar, 
    criar, 
    editar, 
    deletar,
    buscarPorVisualizacao,
    buscarEventosPorPeriodo,
    limparCache,
    cache // Para debug
  };
} 