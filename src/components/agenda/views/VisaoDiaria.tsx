import { cn } from '@/lib/utils';
import { format, isSameDay, isSameHour } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { memo, useEffect, useMemo, useState } from 'react';
import type { EventoAgenda } from '../hooks/useCalendar';
import { useLocais } from '../hooks/useLocais';

interface VisaoDiariaProps {
  dataAtual: Date;
  eventos: EventoAgenda[];
  locaisSelecionados: string[];
  aoClicarEvento: (evento: EventoAgenda) => void;
  aoClicarData: (data: Date) => void;
}

function AgendaGrid({ children }: { children: React.ReactNode }) {
  return <div className="h-full flex flex-col bg-background min-h-0">{children}</div>;
}

function TimelineHeader({ locais }: { locais: string[] }) {
  return (
    <div className="grid grid-cols-[80px_repeat(auto-fit,minmax(200px,1fr))] border-b border-border bg-muted/30 sticky top-0 z-20">
      <div className="p-3 border-r border-border bg-background">
        <span className="text-sm font-medium text-muted-foreground">Horário</span>
      </div>
      {locais.map(local => (
        <div key={local} className="p-3 border-r border-border last:border-r-0 text-center">
          <span className="text-sm font-medium text-foreground">{local}</span>
        </div>
      ))}
    </div>
  );
}

function TimelineCell({ children, className, isCurrentTime = false }: { 
  children: React.ReactNode; 
  className?: string;
  isCurrentTime?: boolean;
}) {
  return (
    <div className={cn(
      "border-b border-border/50 relative min-h-[60px] p-2 transition-all duration-200",
      isCurrentTime && "bg-blue-50/50 border-blue-200",
      className
    )}>
      {children}
    </div>
  );
}

function CurrentTimeIndicator({ currentTime, timeSlots }: { currentTime: Date; timeSlots: string[] }) {
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getCurrentTimePosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentMinutes = currentHour * 60 + currentMinute;
    
    // Encontrar o slot mais próximo
    let closestSlot = timeSlots[0];
    let minDiff = Math.abs(timeToMinutes(timeSlots[0]) - currentMinutes);
    
    timeSlots.forEach(slot => {
      const diff = Math.abs(timeToMinutes(slot) - currentMinutes);
      if (diff < minDiff) {
        minDiff = diff;
        closestSlot = slot;
      }
    });
    
    const slotIndex = timeSlots.indexOf(closestSlot);
    return slotIndex * 60; // 60px por slot
  };

  const position = getCurrentTimePosition();

  return (
    <div 
      className="absolute left-0 right-0 z-30 pointer-events-none"
      style={{ top: `${position}px` }}
    >
      <div className="flex items-center">
        <div className="w-20 h-0.5 bg-red-500 flex-shrink-0"></div>
        <div className="flex-1 h-0.5 bg-red-500"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0 -mt-1.5"></div>
      </div>
      <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
        {format(currentTime, 'HH:mm')}
      </div>
    </div>
  );
}

function AgendaEvent({ evento, style, onClick }: { evento: EventoAgenda; style?: React.CSSProperties; onClick: (e: React.MouseEvent) => void }) {
  return (
    <div
      className="absolute left-1 right-1 top-1 bottom-1 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group flex items-center gap-2 p-2 min-h-[40px]"
      style={{ background: evento.cor, opacity: 0.85, ...style }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Evento de ${evento.cliente} às ${evento.horaInicio}`}
    >
      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate text-sm group-hover:underline" style={{ color: evento.cor && evento.cor !== '#fff' ? '#047857' : undefined }}>
          {evento.cliente}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {evento.horaInicio} - {evento.horaFim}
        </div>
      </div>
    </div>
  );
}

const VisaoDiaria = memo(({
  dataAtual,
  eventos,
  locaisSelecionados,
  aoClicarEvento,
  aoClicarData
}: VisaoDiariaProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { getLocalById } = useLocais();

  // Atualizar hora atual a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filtrar eventos do dia
  const dayEvents = useMemo(() => {
    return eventos.filter(evento => isSameDay(evento.dia, dataAtual));
  }, [eventos, dataAtual]);

  // Gerar timeSlots baseado nos eventos (com margem de 1h antes e depois)
  const timeSlots = useMemo(() => {
    if (dayEvents.length === 0) {
      // Slots padrão se não há eventos
      const slots = [];
      for (let hour = 6; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
        }
      }
      return slots;
    }

    // Encontrar horário mais cedo e mais tarde dos eventos
    let earliestTime = '23:59';
    let latestTime = '00:00';

    dayEvents.forEach(evento => {
      if (evento.horaInicio < earliestTime) earliestTime = evento.horaInicio;
      if (evento.horaFim > latestTime) latestTime = evento.horaFim;
    });

    // Converter para minutos
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const startMinutes = Math.max(0, timeToMinutes(earliestTime) - 60); // 1h antes
    const endMinutes = Math.min(1440, timeToMinutes(latestTime) + 60); // 1h depois

    const slots = [];
    for (let minutes = startMinutes; minutes <= endMinutes; minutes += 30) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }

    return slots;
  }, [dayEvents]);

  // Utilitário para converter hora em minutos
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Posição do evento
  const getEventPosition = (event: EventoAgenda) => {
    const startMinutes = timeToMinutes(event.horaInicio);
    const endMinutes = timeToMinutes(event.horaFim);
    const duration = endMinutes - startMinutes;
    
    const firstSlotMinutes = timeToMinutes(timeSlots[0]);
    const topOffset = ((startMinutes - firstSlotMinutes) / 30) * 60;
    const height = (duration / 30) * 60;
    
    return {
      top: `${topOffset}px`,
      height: `${Math.max(height - 2, 40)}px`
    };
  };

  // Verificar se é hora atual
  const isCurrentTimeSlot = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return isSameHour(currentTime, new Date().setHours(hours, minutes)) && 
           Math.abs(currentTime.getMinutes() - minutes) <= 15;
  };

  // Organizar eventos por local com nomes dos locais
  const eventosPorLocal = useMemo(() => {
    const eventosFiltrados = dayEvents.filter(evento => {
      if (locaisSelecionados.includes('all')) return true;
      return locaisSelecionados.includes(evento.localId);
    });

    const organizados: Record<string, EventoAgenda[]> = {};
    
    if (locaisSelecionados.includes('all')) {
      // Para 'all', agrupar por local usando o nome do local
      eventosFiltrados.forEach(evento => {
        if (!organizados[evento.local]) {
          organizados[evento.local] = [];
        }
        organizados[evento.local].push(evento);
      });
    } else {
      // Para locais específicos, usar o nome do local
      locaisSelecionados.forEach(localId => {
        const local = getLocalById(localId);
        const nomeLocal = local?.name || localId;
        organizados[nomeLocal] = eventosFiltrados.filter(evento => evento.localId === localId);
      });
    }

    return organizados;
  }, [dayEvents, locaisSelecionados, getLocalById]);

  const dayKey = format(dataAtual, 'yyyy-MM-dd');
  const isToday = isSameDay(dataAtual, new Date());

  return (
    <AgendaGrid>
      {/* Cabeçalho do dia */}
      <div className="px-6 py-4 border-b border-border bg-background sticky top-0 z-30">
        <div className="text-center">
          <div className="text-sm text-muted-foreground font-medium mb-1">
            {format(dataAtual, 'EEEE', { locale: ptBR }).toUpperCase()}
          </div>
          <div className={cn(
            "text-2xl font-semibold",
            isToday ? "bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto" : "text-foreground"
          )}>
            {format(dataAtual, 'dd')}
          </div>
        </div>
      </div>

      {/* Cabeçalho da timeline */}
      <TimelineHeader locais={Object.keys(eventosPorLocal)} />

      {/* Timeline com scroll horizontal */}
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="relative" style={{ minWidth: `${80 + Object.keys(eventosPorLocal).length * 200}px` }}>
          {/* Indicador de hora atual */}
          {isToday && <CurrentTimeIndicator currentTime={currentTime} timeSlots={timeSlots} />}
          
          {/* Grid da timeline */}
          <div className="grid grid-cols-[80px_repeat(auto-fit,minmax(200px,1fr))]">
            {/* Coluna de horários */}
            <div className="border-r border-border">
              {timeSlots.map((time, idx) => (
                <TimelineCell 
                  key={time} 
                  isCurrentTime={isCurrentTimeSlot(time)}
                  className="flex items-center justify-end pr-3"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {time}
                  </span>
                </TimelineCell>
              ))}
            </div>

            {/* Colunas dos locais */}
            {Object.keys(eventosPorLocal).map(local => (
              <div key={local} className="border-r border-border last:border-r-0 relative">
                {timeSlots.map((time, idx) => (
                  <TimelineCell key={time} className="relative">
                    <></>
                  </TimelineCell>
                ))}
                
                {/* Eventos deste local */}
                {eventosPorLocal[local].map(evento => (
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </AgendaGrid>
  );
});

VisaoDiaria.displayName = 'VisaoDiaria';

export default VisaoDiaria;