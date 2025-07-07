import { mockReservations } from '@/data/mockReservations';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocais } from './useLocais';

export interface Local {
  id: string;
  nome: string;
  cor: string;
}

export interface EventoAgenda {
  id: number;
  titulo: string;
  inicio: string;
  fim: string;
  localId: string;
  nomeCliente: string;
  status: 'confirmado' | 'pendente' | 'cancelado';
  cor: string;
  cliente: string;
  local: string;
  horaInicio: string;
  horaFim: string;
  dia: Date;
}

/**
 * Hook central de estado da agenda.
 * Responsável apenas pelo estado global (visualização, data, local, navegação, handlers principais).
 */
export const useAgenda = () => {
  const navigate = useNavigate();
  const { getVenuesForCalendar, getLocalById } = useLocais();

  const [tipoVisualizacao, setTipoVisualizacao] = useState<'mes' | 'semana' | 'dia' | 'lista'>('mes');
  const [localSelecionado, setLocalSelecionado] = useState<string>('all');
  const [dataAtual, setDataAtual] = useState(new Date());

  const locais = getVenuesForCalendar();
  // Adaptar eventos para o tipo EventoAgenda
  const eventos: EventoAgenda[] = mockReservations.map(ev => {
    // Buscar a cor do local
    const local = getLocalById(ev.venueId);
    const corLocal = local?.color || '#6b7280';
    
    return {
      id: ev.id,
      titulo: ev.sport ? `${ev.sport}${ev.notes ? ' - ' + ev.notes : ''}` : ev.notes || 'Reserva',
      inicio: `${ev.date}T${ev.startTime}`,
      fim: `${ev.date}T${ev.endTime}`,
      localId: ev.venueId,
      nomeCliente: ev.client,
      status: ev.status === 'confirmed' ? 'confirmado' : ev.status === 'pending' ? 'pendente' : 'cancelado',
      cor: corLocal, // Usar cor do local em vez da cor do status
      cliente: ev.client,
      local: ev.venue,
      horaInicio: ev.startTime,
      horaFim: ev.endTime,
      dia: new Date(`${ev.date}T00:00:00`)
    };
  });

  // Navegação entre datas
  const navegarData = useCallback((direcao: 'anterior' | 'proxima') => {
    console.log('NavegarData chamado:', { direcao, tipoVisualizacao, dataAtual });
    setDataAtual(prev => {
      const novaData = new Date(prev);
      const incremento = direcao === 'proxima' ? 1 : -1;
      
      switch (tipoVisualizacao) {
        case 'mes':
          // Navegar por mês - usar setDate(1) para evitar problemas com dias inexistentes
          novaData.setDate(1);
          novaData.setMonth(prev.getMonth() + incremento);
          break;
        case 'semana':
          // Navegar por semana - somar 7 dias
          novaData.setDate(prev.getDate() + (7 * incremento));
          break;
        case 'dia':
          // Navegar por dia - somar 1 dia
          novaData.setDate(prev.getDate() + incremento);
          break;
        case 'lista':
          // Para lista, navegar por mês (mesmo comportamento do mês)
          novaData.setDate(1);
          novaData.setMonth(prev.getMonth() + incremento);
          break;
        default:
          // Fallback para navegação por mês
          novaData.setDate(1);
          novaData.setMonth(prev.getMonth() + incremento);
          break;
      }
      console.log('Nova data calculada:', novaData);
      return novaData;
    });
  }, [tipoVisualizacao]);

  // Handlers de navegação
  const aoClicarData = useCallback((data: Date) => {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    navigate(`/eventos/reserva?date=${dataStr}`);
  }, [navigate]);

  const aoClicarEvento = useCallback((evento: EventoAgenda) => {
    navigate(`/eventos/reserva/${evento.id}/editar`);
  }, [navigate]);

  const aoClicarFiltroDia = useCallback((dia: Date) => {
    setDataAtual(dia);
    setTipoVisualizacao('dia');
  }, []);

  const aoMudarTipoVisualizacao = useCallback((tipo: 'mes' | 'semana' | 'dia' | 'lista') => {
    setTipoVisualizacao(tipo);
  }, []);

  return {
    tipoVisualizacao,
    setTipoVisualizacao: aoMudarTipoVisualizacao,
    localSelecionado,
    setLocalSelecionado,
    dataAtual,
    setDataAtual,
    locais,
    eventos,
    navegarData,
    aoClicarData,
    aoClicarEvento,
    aoClicarFiltroDia
  };
};
