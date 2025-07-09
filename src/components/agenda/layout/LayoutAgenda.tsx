import { useContextoAgenda } from '@/contexts/AgendaContext';
import { useLocais } from '@/hooks/useLocais';
import { parseDate } from '@internationalized/date';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import VisualizacoesAgenda from '../views/VisualizacoesAgenda';
import BarraLateralAgenda from './BarraLateralAgenda';
import CabecalhoAgenda from './CabecalhoAgenda';

const LayoutAgenda = memo(() => {
  const {
    tipoVisualizacao,
    setTipoVisualizacao,
    dataAtual,
    setDataAtual,
    locaisSelecionados,
    alternarLocal,
    isLocalSelecionado,
    sidebarExpanded,
    locais,
    eventos,
    handleEventClick,
    handleDataClick,
    handleNovoEvento,
    handleToggleSidebar,
    navegarData,
    irParaHoje,
    sincronizar,
    loading
  } = useContextoAgenda();

  // Estado de busca e debounce para locais
  const [buscaLocal, setBuscaLocal] = useState('');
  const { locais: allLocais, loading: locaisLoading, fetchLocais } = useLocais();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchLocais({ search: buscaLocal });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [buscaLocal, fetchLocais]);

  // Extrair datas únicas dos eventos para destacar no calendário
  const eventDates = useMemo(() => {
    const uniqueDates = new Set<string>();
    eventos.forEach(evento => {
      if (evento.data) {
        uniqueDates.add(evento.data);
      }
    });
    return Array.from(uniqueDates);
  }, [eventos]);

  return (
    <div className="h-full min-h-0 flex flex-1 bg-sidebar overflow-hidden">
      {/* Barra Lateral */}
      <BarraLateralAgenda
        isExpanded={sidebarExpanded}
        selectedDate={parseDate(`${dataAtual.getFullYear()}-${String(dataAtual.getMonth() + 1).padStart(2, '0')}-${String(dataAtual.getDate()).padStart(2, '0')}`)}
        selectedLocais={locaisSelecionados}
        locais={allLocais}
        allLocais={allLocais}
        locaisLoading={locaisLoading}
        eventCountByVenue={{}}
        onToggle={handleToggleSidebar}
        onDateChange={dateValue => {
          // Atualiza data centralizada
          if (dateValue) {
            setDataAtual(new Date(dateValue.year, dateValue.month - 1, dateValue.day));
          }
        }}
        onLocalToggle={alternarLocal}
        isLocalSelected={isLocalSelecionado}
        tipoVisualizacao={tipoVisualizacao}
        eventDates={eventDates}
      />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0 h-full min-h-0 bg-background">
        {/* Cabeçalho */}
        <CabecalhoAgenda
          dataAtual={dataAtual}
          tipoVisualizacao={tipoVisualizacao}
          aoNavegarData={navegarData}
          aoClicarHoje={irParaHoje}
          aoClicarNovoEvento={handleNovoEvento}
          aoMudarTipoVisualizacao={setTipoVisualizacao}
          aoSincronizar={sincronizar}
          sincronizando={loading}
        />

        {/* Visualizações */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="h-full min-h-0 flex-1 flex flex-col">
            <VisualizacoesAgenda />
          </div>
        </div>
      </div>
    </div>
  );
});

LayoutAgenda.displayName = 'LayoutAgenda';

export default LayoutAgenda;