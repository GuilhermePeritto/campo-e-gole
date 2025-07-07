import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, startOfMonth, startOfWeek } from 'date-fns';
import { memo, useMemo } from 'react';
import type { EventoAgenda } from '../hooks/useCalendar';
import { useSkeletonLoading } from '../hooks/useSkeletonLoading';
import DiaMensalSkeleton from '../skeletons/DiaMensalSkeleton';

interface VisaoMensalProps {
  dataAtual: Date;
  eventos: EventoAgenda[];
  locaisSelecionados: string[];
  aoClicarEvento: (evento: EventoAgenda) => void;
  aoClicarData: (data: Date) => void;
}

// COMPONENTES ATÔMICOS

function AgendaGrid({ children, numRows }: { children: React.ReactNode, numRows: number }) {
  // IMPORTANTE: O container pai deste componente deve ter h-full ou min-h-screen para o grid ocupar toda a tela
  return (
    <div className="h-full flex flex-col bg-background min-h-0">
      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/30">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
          <div key={dia} className="p-2 text-center text-sm font-medium text-muted-foreground border-r border-border/30 last:border-r-0">
            {dia}
          </div>
        ))}
      </div>
      {/* Grid do calendário */}
      <div className={cn(
        "flex-1 min-h-0 h-full grid grid-cols-7 gap-2 p-1 border-border/50 bg-muted/10",
        `grid-rows-${numRows}`
      )} style={{ height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

function AgendaCell({
  dia,
  isHoje,
  isForaDoMes,
  onClick,
  children,
  eventCount
}: {
  dia: Date;
  isHoje: boolean;
  isForaDoMes: boolean;
  onClick: () => void;
  children: React.ReactNode;
  eventCount: number;
}) {
  return (
    <div
      tabIndex={0}
      className={cn(
        "relative flex flex-col w-full h-full min-h-0 rounded-xl bg-white/80 shadow-sm border border-border p-1 transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/40 hover:shadow-md overflow-hidden",
        isForaDoMes ? "bg-muted/30 text-muted-foreground/50 border-dashed opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-accent/10",
        isHoje && "ring-2 ring-primary/60 border-primary"
      )}
      onClick={e => {
        if (!isForaDoMes) onClick();
      }}
      style={{ minHeight: 0, height: '100%' }}
    >
      {/* Header do dia */}
      <div className="flex items-center justify-between mb-1 flex-shrink-0 h-7">
        <span className={cn(
          "text-sm font-bold transition-colors",
          isHoje && "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-base shadow",
          isForaDoMes && "text-muted-foreground/50"
        )}>
          {format(dia, 'd')}
        </span>
        {eventCount > 0 && (
          <Badge variant="secondary" className="text-xs h-5 px-2">
            {eventCount}
          </Badge>
        )}
      </div>
      {/* Wrapper dos eventos, ocupa todo o espaço restante */}
      <div className="absolute left-1 right-1 bottom-1 top-8 space-y-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function AgendaEvent({ evento, onClick }: { evento: EventoAgenda; onClick: (e: React.MouseEvent) => void }) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-0.5 rounded-md bg-white/90 border border-border text-xs font-medium text-foreground truncate cursor-pointer hover:bg-accent/40 transition"
      style={{ background: evento.cor, opacity: 0.85, minHeight: 0, height: 24, maxHeight: 24 }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Evento de ${evento.cliente} às ${evento.horaInicio}`}
    >
      <span className="truncate font-semibold" style={{ color: evento.cor && evento.cor !== '#fff' ? '#047857' : undefined }}>
        {evento.cliente}
      </span>
      <span className="text-muted-foreground">{evento.horaInicio} - {evento.horaFim}</span>
    </div>
  );
}

// VISUALIZAÇÃO MENSAL REFACTORED

const VisaoMensal = memo(({
  dataAtual,
  eventos,
  locaisSelecionados,
  aoClicarEvento,
  aoClicarData
}: VisaoMensalProps) => {
  const { isDayLoading } = useSkeletonLoading({
    viewType: 'month',
    currentDate: dataAtual,
    shouldReload: false
  });

  // Gerar grid do calendário (X células)
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(dataAtual);
    const monthEnd = endOfMonth(dataAtual);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [dataAtual]);

  // Calcular número de linhas (semanas) dinamicamente
  const numRows = Math.ceil(calendarDays.length / 7);

  // Filtrar e agrupar eventos por dia
  const eventosPorDia = useMemo(() => {
    const filteredEvents = eventos.filter(evento => {
      if (locaisSelecionados.includes('all')) return true;
      return locaisSelecionados.includes(evento.localId);
    });
    return filteredEvents.reduce((acc, evento) => {
      let eventDate = 'invalid';
      if (evento.dia instanceof Date && !isNaN(evento.dia.getTime())) {
        eventDate = format(evento.dia, 'yyyy-MM-dd');
      }
      if (!acc[eventDate]) acc[eventDate] = [];
      acc[eventDate].push(evento);
      return acc;
    }, {} as Record<string, EventoAgenda[]>);
  }, [eventos, locaisSelecionados]);

  return (
    <AgendaGrid numRows={numRows}>
      {calendarDays.map(dia => {
        const dayKey = format(dia, 'yyyy-MM-dd');
        const dayEvents = eventosPorDia[dayKey] || [];
        const isCurrentMonth = dia.getMonth() === dataAtual.getMonth();
        const isToday = isSameDay(dia, new Date());
        const isLoading = isDayLoading(dia);
        const maxEvents = 2;
        return (
          <AgendaCell
            key={dayKey}
            dia={dia}
            isHoje={isToday}
            isForaDoMes={!isCurrentMonth}
            onClick={() => aoClicarData(dia)}
            eventCount={dayEvents.length}
          >
            {isLoading ? (
              <DiaMensalSkeleton hasEvents={dayEvents.length > 0} eventCount={Math.min(dayEvents.length, maxEvents)} />
            ) : (
              <>
                {dayEvents.slice(0, maxEvents).map(evento => (
                  <AgendaEvent
                    key={evento.id}
                    evento={evento}
                    onClick={e => {
                      e.stopPropagation();
                      aoClicarEvento(evento);
                    }}
                  />
                ))}
                {dayEvents.length > maxEvents && !isLoading && (
                  <div className="text-xs text-muted-foreground text-center py-0.5">
                    +{dayEvents.length - maxEvents} mais
                  </div>
                )}
              </>
            )}
          </AgendaCell>
        );
      })}
    </AgendaGrid>
  );
});

VisaoMensal.displayName = 'VisaoMensal';

export default VisaoMensal;