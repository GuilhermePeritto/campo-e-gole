
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Reservation } from '@/hooks/useCalendar';
import { useVenueSettings } from '@/hooks/useVenueSettings';
import { useLocais } from '@/hooks/useLocais';
import { MapPin, Plus, User } from 'lucide-react';

interface CalendarDayColumnsViewProps {
  currentDate: Date;
  mockReservations: Reservation[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: Reservation) => void;
}

const CalendarDayColumnsView = ({
  currentDate,
  mockReservations,
  handleDateClick,
  handleEventClick
}: CalendarDayColumnsViewProps) => {
  
  const { generateTimeSlots, getVenueInterval } = useVenueSettings();
  const { locais } = useLocais();
  
  // Usar o menor intervalo entre todos os locais para a timeline
  const smallestInterval = Math.min(...locais.map(local => local.interval));
  const timeSlots = generateTimeSlots('all', 7, 21);
  const slotHeight = 48;
  
  // Filtrar reservas por data
  const dayStr = currentDate.toISOString().split('T')[0];
  const filteredReservations = mockReservations.filter(reservation => {
    const reservationDate = new Date(reservation.start).toISOString().split('T')[0];
    return reservationDate === dayStr;
  });

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const handleNewReservation = (time: string) => {
    handleDateClick(currentDate);
  };

  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto">
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* Coluna de horários */}
        <div className="col-span-1">
          <Card className="h-full">
            <CardHeader className="py-3">
              <h3 className="text-sm font-semibold">Horários</h3>
            </CardHeader>
            <CardContent className="p-0">
              {timeSlots.map((time, index) => (
                <div 
                  key={time} 
                  className="border-b border-gray-100 flex items-center p-3"
                  style={{ height: `${slotHeight}px` }}
                >
                  <div className="text-sm font-medium text-gray-600">
                    {time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Colunas dos locais */}
        {locais.map((local) => {
          const venueReservations = filteredReservations.filter(r => r.venueId === local.id);
          
          return (
            <div key={local.id} className="col-span-1">
              <Card className="h-full">
                <CardHeader className="py-3">
                  <h3 className="text-sm font-semibold">{local.name}</h3>
                  <p className="text-xs text-gray-500">Intervalo: {local.interval}min</p>
                </CardHeader>
                <CardContent className="p-0 relative">
                  {/* Time slots grid */}
                  <div className="relative">
                    {timeSlots.map((time, index) => {
                      const slotStart = timeToMinutes(time);
                      const slotEnd = slotStart + local.interval;
                      
                      const hasConflict = venueReservations.some(event => {
                        const eventStart = timeToMinutes(event.startTime);
                        const eventEnd = timeToMinutes(event.endTime);
                        return !(eventEnd <= slotStart || eventStart >= slotEnd);
                      });
                      
                      const isAvailable = !hasConflict;
                      
                      return (
                        <div 
                          key={time} 
                          className={`border-b border-gray-100 flex items-center p-3 transition-colors ${
                            isAvailable ? 'cursor-pointer hover:bg-green-50' : ''
                          }`}
                          style={{ height: `${slotHeight}px` }}
                          onClick={() => isAvailable && handleNewReservation(time)}
                        >
                          {isAvailable && (
                            <div className="text-green-600 text-xs font-medium flex items-center gap-1">
                              <Plus className="h-3 w-3" />
                              Disponível
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Events overlay */}
                  <div className="absolute top-0 left-0 right-0 pointer-events-none">
                    {venueReservations.map((event) => {
                      const startMinutes = timeToMinutes(event.startTime);
                      const endMinutes = timeToMinutes(event.endTime);
                      const duration = endMinutes - startMinutes;
                      
                      const baseHour = 7 * 60;
                      const topOffset = ((startMinutes - baseHour) / smallestInterval) * slotHeight;
                      const height = (duration / smallestInterval) * slotHeight;

                      return (
                        <div
                          key={event.id}
                          className="absolute left-2 right-2 rounded-lg shadow-sm border-l-4 z-10 cursor-pointer pointer-events-auto hover:shadow-md transition-all"
                          style={{
                            top: `${topOffset}px`,
                            height: `${Math.max(height - 4, 32)}px`,
                            backgroundColor: event.color + '20',
                            borderLeftColor: event.color
                          }}
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="p-2 h-full overflow-hidden">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3 text-gray-600 flex-shrink-0" />
                                <span className="font-semibold text-xs truncate">{event.client}</span>
                              </div>
                              <div className="text-xs text-gray-500 font-medium">
                                {event.startTime} - {event.endTime}
                              </div>
                              {height > 60 && (
                                <div className="text-xs text-gray-500 truncate">
                                  {event.title.split(' - ')[1] || 'Reserva'}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <div className={`h-1.5 w-1.5 rounded-full ${
                                  event.status === 'confirmed' ? 'bg-green-500' :
                                  event.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                }`} />
                                {height > 60 && (
                                  <span className="text-xs text-gray-500">
                                    {event.status === 'confirmed' ? 'Confirmado' :
                                     event.status === 'pending' ? 'Pendente' : 'Cancelado'}
                                  </span>
                                )}
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
        })}
      </div>
    </div>
  );
};

export default CalendarDayColumnsView;
