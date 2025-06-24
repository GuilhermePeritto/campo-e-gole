
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Plus, User, MapPin } from 'lucide-react';
import { Reservation, Venue } from '@/hooks/useCalendar';

interface CalendarDayViewProps {
  currentDate: Date;
  selectedVenue: string;
  mockReservations: Reservation[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: Reservation) => void;
}

const CalendarDayView = ({
  currentDate,
  selectedVenue,
  mockReservations,
  handleDateClick,
  handleEventClick
}: CalendarDayViewProps) => {
  
  // Filtrar reservas por local e data selecionados
  const dayStr = currentDate.toISOString().split('T')[0];
  const filteredReservations = mockReservations.filter(reservation => {
    const reservationDate = new Date(reservation.start).toISOString().split('T')[0];
    const matchesDate = reservationDate === dayStr;
    const matchesVenue = selectedVenue === 'all' || reservation.venue === selectedVenue;
    return matchesDate && matchesVenue;
  });

  // Gerar slots de 1 em 1 hora (7h às 21h)
  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Converter horário para minutos para cálculos
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Verificar disponibilidade em um slot específico
  const getSlotAvailability = (slotTime: string) => {
    const slotStart = timeToMinutes(slotTime);
    const slotEnd = slotStart + 60; // 1 hora depois
    
    // Verificar eventos que se sobrepõem
    const overlappingEvents = filteredReservations.filter(event => {
      const eventStart = timeToMinutes(event.startTime);
      const eventEnd = timeToMinutes(event.endTime);
      
      return !(eventEnd <= slotStart || eventStart >= slotEnd);
    });

    if (overlappingEvents.length === 0) {
      return { available: true, availableTime: slotTime };
    }

    // Verificar espaços parciais disponíveis
    const sortedEvents = overlappingEvents.sort((a, b) => 
      timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
    );

    // Espaço antes do primeiro evento
    const firstEventStart = timeToMinutes(sortedEvents[0].startTime);
    if (firstEventStart > slotStart) {
      const availableMinutes = firstEventStart - slotStart;
      if (availableMinutes >= 30) { // Mínimo 30 minutos
        return { available: true, availableTime: slotTime, endTime: sortedEvents[0].startTime };
      }
    }

    // Espaço após o último evento
    const lastEventEnd = timeToMinutes(sortedEvents[sortedEvents.length - 1].endTime);
    if (lastEventEnd < slotEnd) {
      const availableMinutes = slotEnd - lastEventEnd;
      if (availableMinutes >= 30) { // Mínimo 30 minutos
        const startHour = Math.floor(lastEventEnd / 60);
        const startMinute = lastEventEnd % 60;
        const startTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
        return { available: true, availableTime: startTime };
      }
    }

    return { available: false };
  };

  const handleNewReservation = (time: string) => {
    handleDateClick(currentDate);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {currentDate.toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: '2-digit', 
            month: 'long',
            year: 'numeric'
          })}
          {selectedVenue !== 'all' && (
            <span className="text-sm text-gray-600 ml-2">({selectedVenue})</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {timeSlots.map((time, index) => {
            const availability = getSlotAvailability(time);
            
            return (
              <div 
                key={time} 
                className="border-b border-gray-100 h-16 flex items-center p-3 relative"
              >
                <div className="w-16 text-sm font-medium text-gray-600 flex-shrink-0">
                  {time}
                </div>
                
                <div className="flex-1 ml-4 relative">
                  {availability.available && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleNewReservation(availability.availableTime)}
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Disponível - {availability.availableTime}
                      {availability.endTime && ` até ${availability.endTime}`}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Events overlay */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          {filteredReservations.map((event) => {
            const startMinutes = timeToMinutes(event.startTime);
            const endMinutes = timeToMinutes(event.endTime);
            const duration = endMinutes - startMinutes;
            
            // Calcular posição baseada em slots de 1 hora
            const baseHour = 7 * 60; // 7h em minutos
            const topOffset = ((startMinutes - baseHour) / 60) * 64; // 64px por hora
            const height = (duration / 60) * 64; // altura proporcional

            return (
              <div
                key={event.id}
                className="absolute left-20 right-4 rounded-lg p-2 shadow-sm border-l-4 z-10 cursor-pointer pointer-events-auto hover:shadow-md transition-all"
                style={{
                  top: `${topOffset + 64}px`, // +64 para compensar header
                  height: `${Math.max(height - 4, 32)}px`,
                  backgroundColor: event.color + '20',
                  borderLeftColor: event.color
                }}
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-start justify-between h-full">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <User className="h-3 w-3 text-gray-600 flex-shrink-0" />
                      <span className="font-medium text-xs truncate">{event.client}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600 truncate">{event.venue}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {event.startTime} - {event.endTime}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarDayView;
