
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';
import HeaderAgenda from './HeaderAgenda';
import SidebarOriginUI from './SidebarOriginUI';
import VisualizacaoSemanalGrid from './VisualizacaoSemanalGrid';
import EventoGridArrastavel from './EventoGridArrastavel';
import { useAgendaOriginUI, EventoGrid } from '@/core/hooks/useAgendaOriginUI';

const AgendaOriginUI = () => {
  const {
    dataAtual,
    setDataAtual,
    sidebarAberto,
    filtrosAtivos,
    locaisDisponiveis,
    eventosGrid,
    horarios,
    diasSemana,
    navegarSemana,
    alternarSidebar,
    alternarFiltro,
    criarNovoEvento
  } = useAgendaOriginUI();

  const [eventoArrastando, setEventoArrastando] = useState<EventoGrid | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const evento = eventosGrid.find(e => e.id === event.active.id);
    setEventoArrastando(evento || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && eventoArrastando) {
      console.log('Movendo evento:', active.id, 'para:', over.id);
      // Implementar lógica de movimentação do evento
    }
    
    setEventoArrastando(null);
  };

  const handleCliqueEvento = (evento: EventoGrid) => {
    console.log('Clique no evento:', evento);
    // Implementar navegação para edição do evento
  };

  const handleCliqueHorario = (data: Date, horario: string) => {
    criarNovoEvento(data, horario);
  };

  const handleNovoEvento = () => {
    criarNovoEvento(new Date(), '09:00');
  };

  return (
    <SidebarProvider defaultOpen={sidebarAberto}>
      <div className="min-h-screen bg-background text-foreground">
        <HeaderAgenda
          dataAtual={dataAtual}
          onNavegarSemana={navegarSemana}
          onAlternarSidebar={alternarSidebar}
          onNovoEvento={handleNovoEvento}
        />

        <div className="flex min-h-[calc(100vh-80px)] w-full">
          {sidebarAberto && (
            <SidebarOriginUI
              dataAtual={dataAtual}
              onMudarData={setDataAtual}
              locais={locaisDisponiveis}
              filtrosAtivos={filtrosAtivos}
              onAlternarFiltro={alternarFiltro}
              sidebarAberto={sidebarAberto}
              onFecharSidebar={alternarSidebar}
            />
          )}

          <main className="flex-1 overflow-hidden">
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <VisualizacaoSemanalGrid
                diasSemana={diasSemana}
                horarios={horarios}
                eventos={eventosGrid}
                onCliqueEvento={handleCliqueEvento}
                onCliqueHorario={handleCliqueHorario}
              />

              <DragOverlay>
                {eventoArrastando && (
                  <div className="p-2 bg-background border rounded shadow-lg">
                    <div className="font-medium text-sm">{eventoArrastando.cliente}</div>
                    <div className="text-xs text-muted-foreground">
                      {eventoArrastando.startTime} - {eventoArrastando.local}
                    </div>
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AgendaOriginUI;
