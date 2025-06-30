
import React from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import EventoArrastavel from './EventoArrastavel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Reservation {
  id: number;
  title: string;
  start: string;
  end: string;
  venueId: string;
  clientName: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  color: string;
  client: string;
  venue: string;
  startTime: string;
  endTime: string;
  day: Date;
}

interface VisualizacaoListaProps {
  currentDate: Date;
  reservations: Reservation[];
  onEventClick: (eventId: number) => void;
}

const VisualizacaoLista: React.FC<VisualizacaoListaProps> = ({
  currentDate,
  reservations,
  onEventClick
}) => {
  // Agrupar eventos por data
  const groupedEvents = reservations.reduce((groups, reservation) => {
    const date = format(parseISO(reservation.start), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(reservation);
    return groups;
  }, {} as Record<string, Reservation[]>);

  // Ordenar datas
  const sortedDates = Object.keys(groupedEvents).sort();

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {sortedDates.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Nenhum evento encontrado</p>
            </CardContent>
          </Card>
        ) : (
          sortedDates.map(dateStr => {
            const date = parseISO(dateStr);
            const events = groupedEvents[dateStr].sort((a, b) => 
              a.startTime.localeCompare(b.startTime)
            );

            return (
              <Card key={dateStr}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {events.map(event => (
                    <EventoArrastavel
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      startTime={event.startTime}
                      endTime={event.endTime}
                      color={event.color}
                      clientName={event.clientName}
                      venue={event.venue}
                      status={event.status}
                      onClick={() => onEventClick(event.id)}
                    />
                  ))}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VisualizacaoLista;
