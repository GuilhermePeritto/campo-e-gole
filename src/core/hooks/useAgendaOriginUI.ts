
import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocais } from '@/hooks/useLocais';
import { useReservas } from '@/hooks/useReservas';

export interface EventoGrid {
  id: number;
  titulo: string;
  cliente: string;
  local: string;
  cor: string;
  avatar?: string;
  startTime: string;
  endTime: string;
  date: string;
  duration: number; // em minutos
  top: number; // posição no grid
  height: number; // altura no grid
}

export const useAgendaOriginUI = () => {
  const navigate = useNavigate();
  const { getVenuesForCalendar } = useLocais();
  const { getCalendarReservations } = useReservas();
  
  const [dataAtual, setDataAtual] = useState(new Date());
  const [sidebarAberto, setSidebarAberto] = useState(true);
  const [filtrosAtivos, setFiltrosAtivos] = useState<string[]>(['all']);
  
  const locaisDisponiveis = getVenuesForCalendar();
  const reservasOriginais = getCalendarReservations;

  // Gerar horários (6 AM - 10 PM)
  const horarios = useMemo(() => {
    const hours = [];
    for (let i = 6; i <= 22; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return hours;
  }, []);

  // Gerar dias da semana atual
  const diasSemana = useMemo(() => {
    const startOfWeek = new Date(dataAtual);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Segunda-feira
    startOfWeek.setDate(diff);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }, [dataAtual]);

  // Converter reservas para eventos do grid
  const eventosGrid: EventoGrid[] = useMemo(() => {
    return reservasOriginais
      .filter(reserva => {
        if (filtrosAtivos.includes('all')) return true;
        return filtrosAtivos.includes(reserva.venueId);
      })
      .map(reserva => {
        const [startHour, startMin] = reserva.startTime.split(':').map(Number);
        const [endHour, endMin] = reserva.endTime.split(':').map(Number);
        
        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;
        const duration = endMinutes - startMinutes;
        const baseTime = 6 * 60; // 6 AM em minutos
        const top = ((startMinutes - baseTime) / 60) * 60; // 60px por hora
        const height = (duration / 60) * 60;

        return {
          id: reserva.id,
          titulo: reserva.title,
          cliente: reserva.client,
          local: reserva.venue,
          cor: reserva.color,
          startTime: reserva.startTime,
          endTime: reserva.endTime,
          date: reserva.start.split('T')[0],
          duration,
          top,
          height
        };
      });
  }, [reservasOriginais, filtrosAtivos]);

  const navegarSemana = useCallback((direcao: 'anterior' | 'proximo') => {
    setDataAtual(prev => {
      const novaData = new Date(prev);
      novaData.setDate(prev.getDate() + (direcao === 'proximo' ? 7 : -7));
      return novaData;
    });
  }, []);

  const alternarSidebar = useCallback(() => {
    setSidebarAberto(prev => !prev);
  }, []);

  const alternarFiltro = useCallback((localId: string) => {
    setFiltrosAtivos(prev => {
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

  const criarNovoEvento = useCallback((data: Date, horario: string) => {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    navigate(`/eventos/reserva?date=${dataStr}&time=${horario}`);
  }, [navigate]);

  return {
    dataAtual,
    setDataAtual,
    sidebarAberto,
    setSidebarAberto,
    filtrosAtivos,
    setFiltrosAtivos,
    locaisDisponiveis,
    eventosGrid,
    horarios,
    diasSemana,
    navegarSemana,
    alternarSidebar,
    alternarFiltro,
    criarNovoEvento
  };
};
