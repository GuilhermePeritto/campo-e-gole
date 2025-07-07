import { cn } from '@/lib/utils';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { memo, useMemo } from 'react';
import type { EventoAgenda } from '../hooks/useCalendar';
import { useSkeletonLoading } from '../hooks/useSkeletonLoading';

interface VisaoSemanalProps {
  dataAtual: Date;
  eventos: EventoAgenda[];
  locaisSelecionados: string[];
  aoClicarEvento: (evento: EventoAgenda) => void;
  aoClicarData: (data: Date) => void;
}

function AgendaGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col bg-background min-h-0">
      <div className="grid grid-cols-7 border-b border-border bg-muted/30 sticky top-0 z-10">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
          <div key={dia} className="border-r border-border last:border-r-0 p-4 text-center text-xs text-muted-foreground font-medium">
            {dia}
          </div>
        ))}
      </div>
      <div className="flex-1 min-h-0">
        <div className="grid grid-cols-7 relative h-full min-h-0 gap-2 p-2 bg-muted/10">
          {children}
        </div>
      </div>
    </div>
  );
}

function AgendaCell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-r border-border last:border-r-0 relative min-h-0 rounded-xl bg-white/80 shadow-sm border p-2 transition-all duration-200 overflow-auto", className)}>
      {children}
    </div>
  );
}

function AgendaEvent({ evento, style, onClick }: { evento: EventoAgenda; style?: React.CSSProperties; onClick: (e: React.MouseEvent) => void }) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div
      className="absolute left-1 right-1 z-10 w-auto h-auto rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer group min-h-[40px] flex items-center gap-3"
      style={{ background: evento.cor, opacity: 0.85, ...style }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Evento de ${evento.cliente} às ${evento.horaInicio}`}
    >
      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate text-base group-hover:underline" style={{ color: evento.cor && evento.cor !== '#fff' ? '#047857' : undefined }}>
          {evento.cliente}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span>{evento.horaInicio} - {evento.horaFim}</span>
          <span>•</span>
          <span className="truncate">{evento.local}</span>
        </div>
      </div>
    </div>
  );
}

const VisaoSemanal = memo(({
  dataAtual,
  eventos,
  locaisSelecionados,
  aoClicarEvento,
  aoClicarData
}: VisaoSemanalProps) => {
  const { isDayLoading } = useSkeletonLoading({
    viewType: 'week',
    currentDate: dataAtual,
    shouldReload: false
  });

  // Dias da semana
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(dataAtual, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(dataAtual, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [dataAtual]);

  // Horários (6h às 23h)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      slots.push(hour);
    }
    return slots;
  }, []);

  // Eventos agrupados por dia
  const eventosPorDia = useMemo(() => {
    const filteredEvents = eventos.filter(evento => {
      if (locaisSelecionados.includes('all')) return true;
      return locaisSelecionados.includes(evento.localId);
    });
    return filteredEvents.reduce((acc, evento) => {
      const eventDate = format(evento.dia, 'yyyy-MM-dd');
      if (!acc[eventDate]) acc[eventDate] = [];
      acc[eventDate].push(evento);
      return acc;
    }, {} as Record<string, EventoAgenda[]>);
  }, [eventos, locaisSelecionados]);

  // Posição do evento na célula
  const getEventPosition = (evento: EventoAgenda) => {
    const startHour = parseInt(evento.horaInicio.split(':')[0]);
    const startMinute = parseInt(evento.horaInicio.split(':')[1]);
    const endHour = parseInt(evento.horaFim.split(':')[0]);
    const endMinute = parseInt(evento.horaFim.split(':')[1]);
    const startPosition = ((startHour - 6) * 60 + startMinute) / 60; // em horas desde 6h
    const duration = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / 60;
    return {
      top: `${startPosition * 60}px`,
      height: `${Math.max(duration * 60, 30)}px`
    };
  };

  return (
    <AgendaGrid>
      {/* Colunas dos dias */}
      {weekDays.map(day => {
        const dayKey = format(day, 'yyyy-MM-dd');
        const dayEvents = eventosPorDia[dayKey] || [];
        const isLoading = isDayLoading(day);
        return (
          <AgendaCell key={dayKey}>
            {/* Eventos posicionados */}
            {!isLoading && dayEvents.map(evento => (
              <AgendaEvent
                key={evento.id}
                evento={evento}
                style={getEventPosition(evento)}
                onClick={e => {
                  e.stopPropagation();
                  aoClicarEvento(evento);
                }}
              />
            ))}
          </AgendaCell>
        );
      })}
    </AgendaGrid>
  );
});

VisaoSemanal.displayName = 'VisaoSemanal';

export default VisaoSemanal;