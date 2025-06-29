
import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocais } from '@/hooks/useLocais';
import { useReservas } from '@/hooks/useReservas';

export interface EventoAgenda {
  id: number;
  titulo: string;
  inicio: string;
  fim: string;
  localId: string;
  nomeCliente: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  cor: string;
  cliente: string;
  local: string;
  horaInicio: string;
  horaFim: string;
  dia: Date;
  esporte?: string;
  observacoes?: string;
}

export type TipoVisualizacao = 'mes' | 'semana' | 'dia' | 'agenda';

export const useAgenda = () => {
  const navigate = useNavigate();
  const { getVenuesForCalendar } = useLocais();
  const { getCalendarReservations } = useReservas();
  
  const [tipoVisualizacao, setTipoVisualizacao] = useState<TipoVisualizacao>('mes');
  const [locaisSelecionados, setLocaisSelecionados] = useState<string[]>(['all']);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [sidebarAberto, setSidebarAberto] = useState(true);
  const [loadingPorDia, setLoadingPorDia] = useState<Record<string, boolean>>({});

  const locaisDisponiveis = getVenuesForCalendar();
  const eventosCompletos = getCalendarReservations;

  const navegarData = useCallback((direcao: 'anterior' | 'proximo') => {
    setDataAtual(prev => {
      const novaData = new Date(prev);
      switch (tipoVisualizacao) {
        case 'mes':
          novaData.setMonth(prev.getMonth() + (direcao === 'proximo' ? 1 : -1));
          break;
        case 'semana':
          novaData.setDate(prev.getDate() + (direcao === 'proximo' ? 7 : -7));
          break;
        case 'dia':
          novaData.setDate(prev.getDate() + (direcao === 'proximo' ? 1 : -1));
          break;
        case 'agenda':
          novaData.setDate(prev.getDate() + (direcao === 'proximo' ? 7 : -7));
          break;
      }
      return novaData;
    });
  }, [tipoVisualizacao]);

  const manipularCliqueDia = useCallback((data: Date) => {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    navigate(`/eventos/reserva?date=${dataStr}`);
  }, [navigate]);

  const manipularCliqueEvento = useCallback((evento: EventoAgenda) => {
    navigate(`/eventos/reserva/${evento.id}/editar`);
  }, [navigate]);

  const alternarSidebar = useCallback(() => {
    setSidebarAberto(prev => !prev);
  }, []);

  const definirLoadingDia = useCallback((dia: string, loading: boolean) => {
    setLoadingPorDia(prev => ({ ...prev, [dia]: loading }));
  }, []);

  const eventosFiltrados = useMemo(() => {
    if (locaisSelecionados.includes('all')) {
      return eventosCompletos;
    }
    return eventosCompletos.filter(evento => 
      locaisSelecionados.includes(evento.venueId)
    );
  }, [eventosCompletos, locaisSelecionados]);

  const alternarLocal = useCallback((localId: string) => {
    setLocaisSelecionados(prev => {
      if (localId === 'all') {
        return ['all'];
      }
      
      const novaSelecao = prev.includes('all') ? [localId] : 
        prev.includes(localId) 
          ? prev.filter(id => id !== localId)
          : [...prev.filter(id => id !== 'all'), localId];
      
      return novaSelecao.length === 0 ? ['all'] : novaSelecao;
    });
  }, []);

  return {
    tipoVisualizacao,
    setTipoVisualizacao,
    locaisSelecionados,
    setLocaisSelecionados,
    dataAtual,
    setDataAtual,
    sidebarAberto,
    setSidebarAberto,
    loadingPorDia,
    locaisDisponiveis,
    eventosFiltrados,
    navegarData,
    manipularCliqueDia,
    manipularCliqueEvento,
    alternarSidebar,
    alternarLocal,
    definirLoadingDia
  };
};
