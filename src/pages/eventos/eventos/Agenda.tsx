
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SidebarProvider } from '@/components/ui/sidebar';
import ModuleHeader from '@/components/ModuleHeader';
import CalendarViews from '@/components/calendar/CalendarViews';
import SidebarCalendario from '@/core/componentes/agenda/SidebarCalendario';
import VisualizacaoAgenda from '@/core/componentes/agenda/VisualizacaoAgenda';
import VisualizacaoMes from '@/core/componentes/agenda/VisualizacaoMes';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useAgenda } from '@/core/hooks/useAgenda';
import { useDragAndDrop } from '@/core/hooks/useDragAndDrop';
import { useSkeletonPorDia } from '@/core/hooks/useSkeletonPorDia';
import { getDateTitle, getWeekDays } from '@/utils/calendarUtils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const Agenda = () => {
  const {
    tipoVisualizacao,
    setTipoVisualizacao,
    locaisSelecionados,
    dataAtual,
    setDataAtual,
    sidebarAberto,
    locaisDisponiveis,
    eventosFiltrados,
    navegarData,
    manipularCliqueDia,
    manipularCliqueEvento,
    alternarSidebar,
    alternarLocal
  } = useAgenda();

  const { moverEvento, validarMovimento } = useDragAndDrop();
  const { 
    estadosLoading, 
    simularCarregamento,
    carregarMultiplosDias 
  } = useSkeletonPorDia();

  const [eventoArrastando, setEventoArrastando] = useState<any>(null);

  const weekDays = getWeekDays(dataAtual);
  const dateTitle = getDateTitle(tipoVisualizacao, dataAtual, weekDays);

  // Simular carregamento inicial
  useEffect(() => {
    const diasParaCarregar = [];
    const hoje = new Date();
    
    // Carregar dados para os próximos 7 dias
    for (let i = 0; i < 7; i++) {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() + i);
      diasParaCarregar.push(dia.toISOString().split('T')[0]);
    }
    
    carregarMultiplosDias(diasParaCarregar);
  }, [carregarMultiplosDias]);

  const handleDragStart = (event: DragStartEvent) => {
    const evento = eventosFiltrados.find(e => e.id === event.active.id);
    setEventoArrastando(evento || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && eventoArrastando) {
      const novaData = new Date(over.id as string);
      const validacao = validarMovimento(eventoArrastando, novaData);
      
      if (validacao.valido) {
        moverEvento(eventoArrastando.id, novaData);
      } else {
        console.warn('Movimento inválido:', validacao.erro);
      }
    }
    
    setEventoArrastando(null);
  };

  const limparFiltros = () => {
    alternarLocal('all');
  };

  const renderizarConteudo = () => {
    switch (tipoVisualizacao) {
      case 'agenda':
        return (
          <VisualizacaoAgenda
            eventos={eventosFiltrados}
            onCliqueEvento={manipularCliqueEvento}
            loadingPorDia={estadosLoading}
          />
        );
      
      case 'mes':
        return (
          <VisualizacaoMes
            dataAtual={dataAtual}
            eventos={eventosFiltrados}
            onCliqueEvento={manipularCliqueEvento}
            onCliqueDia={manipularCliqueDia}
            onNavegarData={navegarData}
            loadingPorDia={estadosLoading}
          />
        );
      
      default:
        return (
          <CalendarViews
            viewType={tipoVisualizacao}
            currentDate={dataAtual}
            selectedVenue={locaisSelecionados.includes('all') ? 'all' : locaisSelecionados[0]}
            mockReservations={eventosFiltrados}
            handleDateClick={manipularCliqueDia}
            handleEventClick={manipularCliqueEvento}
            handleDayFilterClick={(day: Date) => {
              setDataAtual(day);
              setTipoVisualizacao('dia');
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ModuleHeader
        title="Agenda"
        icon={<CalendarIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <SidebarProvider defaultOpen={sidebarAberto}>
        <div className="flex min-h-[calc(100vh-64px)] w-full">
          <SidebarCalendario
            dataAtual={dataAtual}
            onMudarData={setDataAtual}
            tipoVisualizacao={tipoVisualizacao}
            onMudarTipoVisualizacao={setTipoVisualizacao}
            locais={locaisDisponiveis}
            locaisSelecionados={locaisSelecionados}
            onAlternarLocal={alternarLocal}
            onLimparFiltros={limparFiltros}
            onNavegarData={navegarData}
          />

          <main className="flex-1 overflow-hidden">
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <div className="h-full p-6">
                {renderizarConteudo()}
              </div>

              <DragOverlay>
                {eventoArrastando && (
                  <div className="p-2 bg-background border rounded shadow-lg">
                    <div className="font-medium text-sm">{eventoArrastando.cliente}</div>
                    <div className="text-xs text-muted-foreground">
                      {eventoArrastando.horaInicio} - {eventoArrastando.local}
                    </div>
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Agenda;
