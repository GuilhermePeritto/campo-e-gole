
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Plus, User, MapPin } from 'lucide-react';
import { Reservation, Venue } from '@/hooks/useCalendar';
import { useVenueSettings } from '@/hooks/useVenueSettings';

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
  
  const { generateTimeSlots, getVenueInterval } = useVenueSettings();
  
  // Gerar slots baseados no local selecionado
  const timeSlots = generateTimeSlots(selectedVenue || 'all');
  const interval = getVenueInterval(selectedVenue || 'all');
  const slotHeight = 48; // altura em pixels por slot
  
  // Filtrar reservas por local e data selecionados
  const dayStr = currentDate.toISOString().split('T')[0];
  const filteredReservations = mockReservations.filter(reservation => {
    const reservationDate = new Date(reservation.start).toISOString().split('T')[0];
    const matchesDate = reservationDate === dayStr;
    const matchesVenue = selectedVenue === 'all' || reservation.venueId === selectedVenue;
    return matchesDate && matchesVenue;
  });

  // Converter horário para minutos para cálculos
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Verificar disponibilidade em um slot específico
  const getSlotAvailability = (slotTime: string) => {
    const slotStart = timeToMinutes(slotTime);
    const slotEnd = slotStart + interval;
    
    // Verificar eventos que se sobrepõem
    const overlappingEvents = filteredReservations.filter(event => {
      const eventStart = timeToMinutes(event.startTime);
      const eventEnd = timeToMinutes(event.endTime);
      
      return !(eventEnd <= slotStart || eventStart >= slotEnd);
    });

    return overlappingEvents.length === 0;
  };

  const handleNewReservation = (time: string) => {
    handleDateClick(currentDate);
  };

  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto">
      <Card className="h-full">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {currentDate.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: '2-digit', 
              month: 'long',
              year: 'numeric'
            })}
            {selectedVenue !== 'all' && (
              <span className="text-sm text-gray-600 ml-2">({selectedVenue}) - Intervalo: {interval}min</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <div className="relative">
            {timeSlots.map((time, index) => {
              const isAvailable = getSlotAvailability(time);
              
              return (
                <div 
                  key={time} 
                  className="border-b border-gray-100 flex items-center p-3 relative hover:bg-gray-50"
                  style={{ height: `${slotHeight}px` }}
                >
                  <div className="w-16 text-sm font-medium text-gray-600 flex-shrink-0">
                    {time}
                  </div>
                  
                  <div className="flex-1 ml-4 relative">
                    {isAvailable && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleNewReservation(time)}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Disponível - clique para reservar
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
              
              // Calcular posição baseada nos slots dinâmicos
              const baseHour = 7 * 60; // 7h em minutos
              const topOffset = ((startMinutes - baseHour) / interval) * slotHeight;
              const height = (duration / interval) * slotHeight;

              return (
                <div
                  key={event.id}
                  className="absolute left-20 right-4 rounded-lg shadow-sm border-l-4 z-10 cursor-pointer pointer-events-auto hover:shadow-md transition-all"
                  style={{
                    top: `${topOffset}px`,
                    height: `${Math.max(height - 4, 32)}px`,
                    backgroundColor: event.color + '20',
                    borderLeftColor: event.color
                  }}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="p-3 h-full overflow-hidden">
                    <div className="flex items-start justify-between h-full">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4 text-gray-600 flex-shrink-0" />
                          <span className="font-semibold text-sm truncate">{event.client}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600 truncate">{event.venue}</span>
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <div className={`h-2 w-2 rounded-full bg-green-500`} />
                          <span className="text-xs text-gray-500">
                            Confirmado
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarDayView;
