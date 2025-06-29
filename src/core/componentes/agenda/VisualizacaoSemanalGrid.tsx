
import { useDroppable } from '@dnd-kit/core';
import EventoGridArrastavel from './EventoGridArrastavel';
import { EventoGrid } from '@/core/hooks/useAgendaOriginUI';

interface VisualizacaoSemanalGridProps {
  diasSemana: Date[];
  horarios: string[];
  eventos: EventoGrid[];
  onCliqueEvento: (evento: EventoGrid) => void;
  onCliqueHorario: (data: Date, horario: string) => void;
}

const VisualizacaoSemanalGrid = ({
  diasSemana,
  horarios,
  eventos,
  onCliqueEvento,
  onCliqueHorario
}: VisualizacaoSemanalGridProps) => {
  const obterEventosDoDia = (data: Date) => {
    const dataStr = data.toISOString().split('T')[0];
    return eventos.filter(evento => evento.date === dataStr);
  };

  const DroppableCell = ({ date, hour }: { date: Date; hour: string }) => {
    const { setNodeRef } = useDroppable({
      id: `${date.toISOString().split('T')[0]}-${hour}`
    });

    return (
      <div
        ref={setNodeRef}
        className="h-15 border-b border-r border-border/40 hover:bg-muted/20 cursor-pointer transition-colors relative"
        onClick={() => onCliqueHorario(date, hour)}
      />
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-w-[800px]">
        {/* Header com dias da semana */}
        <div className="grid grid-cols-8 border-b sticky top-0 bg-background z-10">
          <div className="p-3 border-r border-border/40"></div>
          {diasSemana.map((dia, index) => (
            <div key={index} className="p-3 text-center border-r border-border/40 last:border-r-0">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                {dia.toLocaleDateString('pt-BR', { weekday: 'short' })}
              </div>
              <div className="text-lg font-semibold mt-1">
                {dia.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Grid de horários */}
        <div className="relative">
          {horarios.map((horario, hourIndex) => (
            <div key={horario} className="grid grid-cols-8 border-b border-border/40 last:border-b-0">
              {/* Coluna do horário */}
              <div className="h-15 p-3 border-r border-border/40 flex items-start justify-end text-sm text-muted-foreground">
                {horario}
              </div>
              
              {/* Células dos dias */}
              {diasSemana.map((dia, dayIndex) => (
                <div key={`${dia.toISOString()}-${horario}`} className="relative">
                  <DroppableCell date={dia} hour={horario} />
                  
                  {/* Renderizar eventos */}
                  {obterEventosDoDia(dia).map((evento) => {
                    const eventStartHour = parseInt(evento.startTime.split(':')[0]);
                    const currentHour = parseInt(horario.split(':')[0]);
                    
                    // Renderizar evento apenas na primeira hora que ele ocupa
                    if (eventStartHour === currentHour) {
                      return (
                        <EventoGridArrastavel
                          key={evento.id}
                          evento={evento}
                          onClick={() => onCliqueEvento(evento)}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoSemanalGrid;
