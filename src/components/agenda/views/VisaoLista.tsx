import { cn } from '@/lib/utils';
import { addDays, format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import { memo, useMemo } from 'react';
import type { EventoAgenda } from '../hooks/useCalendar';
import { useSkeletonLoading } from '../hooks/useSkeletonLoading';

interface VisaoListaProps {
  dataAtual: Date;
  eventos: EventoAgenda[];
  locaisSelecionados: string[];
  aoClicarEvento: (evento: EventoAgenda) => void;
  aoClicarData: (data: Date) => void;
}

function AgendaGrid({ children }: { children: React.ReactNode }) {
  return <div className="h-full bg-background flex flex-col min-h-0">{children}</div>;
}

function AgendaCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-3 ml-8", className)}>{children}</div>;
}

function AgendaEvent({ evento, onClick }: { evento: EventoAgenda; onClick: (e: React.MouseEvent) => void }) {
  return (
    <div
      className="hover:shadow-md transition-all duration-200 cursor-pointer group p-4 rounded-xl flex items-center gap-3 min-h-[40px] shadow-sm"
      style={{ background: evento.cor, opacity: 0.85 }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Evento de ${evento.cliente} às ${evento.horaInicio}`}
    >
      <div className="flex-1 min-w-0">
        <div className="font-semibold group-hover:underline transition-colors truncate text-base" style={{ color: evento.cor && evento.cor !== '#fff' ? '#047857' : undefined }}>
          {evento.cliente}
        </div>
        <div className="flex items-center space-x-6 text-xs text-muted-foreground mt-1">
          <span>🕒 {evento.horaInicio} - {evento.horaFim}</span>
          <span>📍 {evento.local}</span>
        </div>
      </div>
    </div>
  );
}

const VisaoLista = memo(({
  dataAtual,
  eventos,
  locaisSelecionados,
  aoClicarEvento,
  aoClicarData
}: VisaoListaProps) => {
  const { isDayLoading } = useSkeletonLoading({
    viewType: 'agenda',
    currentDate: dataAtual,
    shouldReload: false
  });

  // Filter and group events by date
  const eventosPorData = useMemo(() => {
    const filteredEvents = eventos.filter(evento => {
      if (locaisSelecionados.includes('all')) return true;
      return locaisSelecionados.includes(evento.localId);
    });

    // Group events by date and sort by time
    const grouped = filteredEvents.reduce((acc, evento) => {
      const dateKey = format(evento.dia, 'yyyy-MM-dd');
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(evento);
      return acc;
    }, {} as Record<string, EventoAgenda[]>);

    // Sort events within each day by start time
    Object.keys(grouped).forEach(dateKey => {
      grouped[dateKey].sort((a, b) => {
        return a.horaInicio.localeCompare(b.horaInicio);
      });
    });

    return grouped;
  }, [eventos, locaisSelecionados]);

  // Get next 30 days from current date
  const dateRange = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      dates.push(addDays(dataAtual, i));
    }
    return dates;
  }, [dataAtual]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <AgendaGrid>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {dateRange.map(date => {
          const dateKey = format(date, 'yyyy-MM-dd');
          const dayEvents = eventosPorData[dateKey] || [];
          const isToday = isSameDay(date, new Date());
          const isLoading = isDayLoading(date);

          if (dayEvents.length === 0 && !isLoading) return null;

          return (
            <div key={dateKey} className="space-y-4">
              {/* Date header */}
              <div className={cn(
                "flex items-center space-x-3 py-2 px-4 rounded-lg border",
                isToday ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 border-border"
              )}>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {format(date, 'dd')}
                  </div>
                  <div className="text-xs uppercase tracking-wider">
                    {format(date, 'EEE', { locale: ptBR })}
                  </div>
                </div>
                <div>
                  <div className="font-medium">
                    {format(date, 'MMMM yyyy', { locale: ptBR })}
                  </div>
                  <div className="text-sm opacity-80">
                    {dayEvents.length} evento{dayEvents.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {/* Events list */}
              <AgendaCell>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse bg-muted rounded h-10 w-3/4 mb-2" />
                    ))}
                  </div>
                ) : (
                  dayEvents.map(evento => (
                    <AgendaEvent
                      key={evento.id}
                      evento={evento}
                      onClick={e => {
                        e.stopPropagation();
                        aoClicarEvento(evento);
                      }}
                    />
                  ))
                )}
              </AgendaCell>
            </div>
          );
        })}

        {/* Empty state */}
        {Object.keys(eventosPorData).length === 0 && !isDayLoading && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Nenhum evento encontrado</h3>
              <p className="text-sm">
                Não há eventos agendados para o período selecionado.
              </p>
            </div>
          </div>
        )}
      </div>
    </AgendaGrid>
  );
});

VisaoLista.displayName = 'VisaoLista';

export default VisaoLista;