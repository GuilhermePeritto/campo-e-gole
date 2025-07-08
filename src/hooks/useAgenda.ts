import type { Evento } from '@/types/eventos';
import { eachDayOfInterval, endOfMonth, endOfWeek, isSameDay, isSameMonth, isSameWeek, parseISO, startOfMonth, startOfWeek } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventos } from './useEventos';
import { useLocais } from './useLocais';

export type TipoVisualizacao = 'mes' | 'semana' | 'dia' | 'lista';

export function useAgenda() {
  const navigate = useNavigate();
  const { locais, loading: locaisLoading } = useLocais();
  
  // Estado da agenda
  const [tipoVisualizacao, setTipoVisualizacao] = useState<TipoVisualizacao>('mes');
  const [dataAtual, setDataAtual] = useState(new Date());
  const [locaisSelecionados, setLocaisSelecionados] = useState<string[]>(['all']);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Estado para controlar quando fazer nova consulta
  const [ultimaConsulta, setUltimaConsulta] = useState<{
    tipoVisualizacao: TipoVisualizacao;
    dataInicio: Date;
    dataFim: Date;
    localIds: string[] | undefined;
  } | null>(null);

  // Função para verificar se precisa fazer nova consulta
  const precisaNovaConsulta = useCallback((
    novoFiltros: {
      tipoVisualizacao: TipoVisualizacao;
      dataInicio: Date;
      dataFim: Date;
      localIds: string[] | undefined;
    }
  ): boolean => {
    if (!ultimaConsulta) return true;

    const { tipoVisualizacao, dataInicio, dataFim, localIds } = novoFiltros;
    const { tipoVisualizacao: ultTipo, dataInicio: ultDataInicio, dataFim: ultDataFim, localIds: ultLocalIds } = ultimaConsulta;

    // Se mudou o tipo de visualização, sempre fazer nova consulta
    if (tipoVisualizacao !== ultTipo) {
      console.log('🔄 Nova consulta: tipo de visualização mudou');
      return true;
    }

    // Se mudaram os locais selecionados, fazer nova consulta
    const locaisAtuais = localIds?.sort().join(',') || 'all';
    const locaisAnteriores = ultLocalIds?.sort().join(',') || 'all';
    if (locaisAtuais !== locaisAnteriores) {
      console.log('🔄 Nova consulta: locais selecionados mudaram');
      return true;
    }

    // Verificar se a nova data está dentro do período já consultado
    switch (tipoVisualizacao) {
      case 'mes':
        // Se está no mesmo mês, não precisa nova consulta
        if (isSameMonth(dataInicio, ultDataInicio)) {
          console.log('📦 Cache: mesmo mês, usando dados existentes');
          return false;
        }
        break;
      
      case 'semana':
        // Se está na mesma semana, não precisa nova consulta
        if (isSameWeek(dataInicio, ultDataInicio, { weekStartsOn: 0 })) {
          console.log('📦 Cache: mesma semana, usando dados existentes');
          return false;
        }
        break;
      
      case 'dia':
        // Se é o mesmo dia, não precisa nova consulta
        if (isSameDay(dataInicio, ultDataInicio)) {
          console.log('📦 Cache: mesmo dia, usando dados existentes');
          return false;
        }
        break;
      
      case 'lista':
        // Se está no mesmo mês, não precisa nova consulta
        if (isSameMonth(dataInicio, ultDataInicio)) {
          console.log('📦 Cache: mesmo mês (lista), usando dados existentes');
          return false;
        }
        break;
    }

    console.log('🔄 Nova consulta: período mudou');
    return true;
  }, [ultimaConsulta]);

  // Calcular filtros baseados na visualização atual
  const filtrosEventos = useMemo(() => {
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

    const localIds = locaisSelecionados.includes('all') ? undefined : locaisSelecionados;

    return {
      dataInicio,
      dataFim,
      localIds
    };
  }, [tipoVisualizacao, dataAtual, locaisSelecionados]);

  // Verificar se precisa fazer nova consulta
  const deveFazerConsulta = useMemo(() => {
    // Sempre fazer consulta se não há última consulta
    if (!ultimaConsulta) {
      return true;
    }

    const { tipoVisualizacao: ultTipo, dataInicio: ultDataInicio, dataFim: ultDataFim, localIds: ultLocalIds } = ultimaConsulta;

    // Se mudou o tipo de visualização, sempre fazer nova consulta
    if (tipoVisualizacao !== ultTipo) {
      console.log('🔄 Nova consulta: tipo de visualização mudou');
      return true;
    }

    // Se mudaram os locais selecionados, fazer nova consulta
    const locaisAtuais = filtrosEventos.localIds?.sort().join(',') || 'all';
    const locaisAnteriores = ultLocalIds?.sort().join(',') || 'all';
    if (locaisAtuais !== locaisAnteriores) {
      console.log('🔄 Nova consulta: locais selecionados mudaram');
      return true;
    }

    // Verificar se a nova data está dentro do período já consultado
    switch (tipoVisualizacao) {
      case 'mes':
        // Se está no mesmo mês, não precisa nova consulta
        if (isSameMonth(filtrosEventos.dataInicio!, ultDataInicio)) {
          console.log('📦 Cache: mesmo mês, usando dados existentes');
          return false;
        }
        break;
      
      case 'semana':
        // Se está na mesma semana, não precisa nova consulta
        if (isSameWeek(filtrosEventos.dataInicio!, ultDataInicio, { weekStartsOn: 0 })) {
          console.log('📦 Cache: mesma semana, usando dados existentes');
          return false;
        }
        break;
      
      case 'dia':
        // Se é o mesmo dia, não precisa nova consulta
        if (isSameDay(filtrosEventos.dataInicio!, ultDataInicio)) {
          console.log('📦 Cache: mesmo dia, usando dados existentes');
          return false;
        }
        break;
      
      case 'lista':
        // Se está no mesmo mês, não precisa nova consulta
        if (isSameMonth(filtrosEventos.dataInicio!, ultDataInicio)) {
          console.log('📦 Cache: mesmo mês (lista), usando dados existentes');
          return false;
        }
        break;
    }

    console.log('🔄 Nova consulta: período mudou');
    return true;
  }, [ultimaConsulta, tipoVisualizacao, filtrosEventos, locaisSelecionados]);

  // Usar o hook de eventos com filtros
  const { eventos, loading: eventosLoading, buscarPorVisualizacao, limparCache } = useEventos(
    filtrosEventos
  );

  // Atualizar última consulta quando necessário
  useEffect(() => {
    if (deveFazerConsulta) {
      setUltimaConsulta({
        tipoVisualizacao,
        dataInicio: filtrosEventos.dataInicio!,
        dataFim: filtrosEventos.dataFim!,
        localIds: filtrosEventos.localIds
      });
    }
  }, [deveFazerConsulta, tipoVisualizacao, filtrosEventos]);

  // Estado de loading combinado
  const loading = eventosLoading || locaisLoading;

  // Função para sincronizar (limpar cache e forçar nova consulta)
  const sincronizar = useCallback(async () => {
    console.log('🔄 Sincronizando dados...');
    limparCache();
    setUltimaConsulta(null); // Força nova consulta
  }, [limparCache]);

  // Navegação entre datas
  const navegarData = useCallback((direcao: 'anterior' | 'proxima') => {
    setDataAtual(prev => {
      const novaData = new Date(prev);
      const incremento = direcao === 'proxima' ? 1 : -1;
      switch (tipoVisualizacao) {
        case 'mes':
          novaData.setMonth(prev.getMonth() + incremento);
          novaData.setDate(1);
          break;
        case 'semana':
          novaData.setDate(prev.getDate() + (7 * incremento));
          break;
        case 'dia':
          novaData.setDate(prev.getDate() + incremento);
          break;
        case 'lista':
          novaData.setMonth(prev.getMonth() + incremento);
          novaData.setDate(1);
          break;
        default:
          novaData.setMonth(prev.getMonth() + incremento);
          novaData.setDate(1);
          break;
      }
      return novaData;
    });
  }, [tipoVisualizacao]);

  const irParaHoje = useCallback(() => {
    setDataAtual(new Date());
  }, []);

  // Métodos para locais selecionados
  const alternarLocal = useCallback((localId: string) => {
    setLocaisSelecionados(prev => {
      if (localId === 'all') {
        return ['all'];
      }
      let novos;
      if (prev.includes(localId)) {
        novos = prev.filter(id => id !== localId && id !== 'all');
      } else {
        novos = [...prev.filter(id => id !== 'all'), localId];
      }
      return novos.length === 0 ? ['all'] : novos;
    });
  }, []);

  const setarLocaisSelecionados = useCallback((locais: string[]) => {
    setLocaisSelecionados(locais.length === 0 ? ['all'] : locais);
  }, []);

  const isLocalSelecionado = useCallback((localId: string) => {
    return locaisSelecionados.includes(localId);
  }, [locaisSelecionados]);

  // Organizar eventos por dia para visualizações (já filtrados por período e local)
  const eventosPorDiaELocal = useMemo(() => {
    const organizados: Record<string, Evento[]> = {};
    
    // Obter dias baseado na visualização
    let dias: Date[] = [];
    if (tipoVisualizacao === 'semana') {
      const weekStart = startOfWeek(dataAtual, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(dataAtual, { weekStartsOn: 0 });
      dias = eachDayOfInterval({ start: weekStart, end: weekEnd });
    } else if (tipoVisualizacao === 'mes') {
      const monthStart = startOfMonth(dataAtual);
      const monthEnd = endOfMonth(dataAtual);
      const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
      const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
      dias = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    } else if (tipoVisualizacao === 'dia') {
      dias = [dataAtual];
    }

    dias.forEach(dia => {
      const eventosDoDia = eventos.filter(evento => isSameDay(parseISO(evento.data), dia));
      organizados[dia.toISOString()] = eventosDoDia;
    });
    
    return organizados;
  }, [eventos, tipoVisualizacao, dataAtual]);

  // Handlers de eventos
  const handleEventClick = useCallback((evento: Evento) => {
    console.log('Evento clicado:', evento);
    // Implementar navegação para edição do evento
    navigate(`/eventos/evento/${evento.id}/editar`);
  }, [navigate]);

  const handleDataClick = useCallback((data: Date) => {
    console.log('Data clicada:', data);
    // Implementar navegação para criação de evento
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    navigate(`/eventos/evento?date=${dataStr}`);
  }, [navigate]);

  const handleNovoEvento = useCallback(() => {
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    navigate(`/eventos/evento?date=${dataStr}`);
  }, [dataAtual, navigate]);

  const handleToggleSidebar = useCallback(() => {
    setSidebarExpanded(exp => !exp);
  }, []);

  return {
    // Estado
    tipoVisualizacao,
    setTipoVisualizacao,
    dataAtual,
    setDataAtual,
    locaisSelecionados,
    setLocaisSelecionados,
    sidebarExpanded,
    locais,
    eventos,
    eventosPorDiaELocal,
    loading,
    
    // Métodos de navegação
    navegarData,
    irParaHoje,
    
    // Métodos de locais
    alternarLocal,
    setarLocaisSelecionados,
    isLocalSelecionado,
    
    // Handlers de eventos
    handleEventClick,
    handleDataClick,
    handleNovoEvento,
    handleToggleSidebar,
    sincronizar
  };
} 