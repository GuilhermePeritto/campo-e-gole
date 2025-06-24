
import { Reservation } from '@/hooks/useCalendar';
import { Clock, MapPin, User, Calendar, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CalendarDayViewProps {
  currentDate: Date;
  mockReservations: Reservation[];
  selectedVenue: string;
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: Reservation) => void;
}

const CalendarDayView = ({
  currentDate,
  mockReservations,
  selectedVenue,
  handleDateClick,
  handleEventClick
}: CalendarDayViewProps) => {
  // Slots de 1 em 1 hora (7h às 21h)
  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Filtrar reservas por data e local selecionado
  const filteredReservations = mockReservations.filter(r => {
    const matchesDate = r.day.toDateString() === currentDate.toDateString();
    const matchesVenue = selectedVenue === 'all' || r.venue === selectedVenue;
    return matchesDate && matchesVenue;
  });

  // Converter horário para minutos
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Verificar disponibilidade para um slot de hora
  const getAvailabilityForSlot = (slotTime: string) => {
    const slotStart = timeToMinutes(slotTime);
    const slotEnd = slotStart + 60;
    
    const overlappingReservations = filteredReservations.filter(r => {
      const eventStart = timeToMinutes(r.startTime);
      const eventEnd = timeToMinutes(r.endTime);
      
      return !(eventEnd <= slotStart || eventStart >= slotEnd);
    });

    if (overlappingReservations.length === 0) {
      return { available: true, time: slotTime };
    }

    // Verificar se há espaços livres no slot
    const sortedEvents = overlappingReservations.sort((a, b) => 
      timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
    );

    const firstEventStart = timeToMinutes(sortedEvents[0].startTime);
    if (firstEventStart > slotStart) {
      return { available: true, time: slotTime };
    }

    const lastEventEnd = timeToMinutes(sortedEvents[sortedEvents.length - 1].endTime);
    if (lastEventEnd < slotEnd) {
      const availableHour = Math.floor(lastEventEnd / 60);
      const availableMinute = lastEventEnd % 60;
      const availableTime = `${availableHour.toString().padStart(2, '0')}:${availableMinute.toString().padStart(2, '0')}`;
      return { available: true, time: availableTime };
    }

    return { available: false, time: null };
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {currentDate.toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </h3>
            {selectedVenue !== 'all' && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Exibindo apenas: {selectedVenue}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filteredReservations.length} reserva(s)
            </p>
            <p className="text-xs text-gray-500">
              {filteredReservations.filter(r => r.status === 'confirmed').length} confirmada(s)
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="relative">
          {timeSlots.map((time, index) => {
            const availability = getAvailabilityForSlot(time);
            
            return (
              <div key={time} className="flex border-b border-gray-100 relative" style={{ minHeight: '80px' }}>
                {/* Coluna de horário */}
                <div className="w-20 p-4 text-sm font-medium text-gray-500 text-right border-r border-gray-200 bg-gray-50/50 flex items-start">
                  <div className="w-full">
                    <div className="font-semibold">{time}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {index + 7}h
                    </div>
                  </div>
                </div>

                {/* Coluna de conteúdo */}
                <div className="flex-1 relative">
                  {availability.available && (
                    <div 
                      className="absolute inset-0 flex items-center p-4 cursor-pointer hover:bg-green-50 transition-colors group z-20"
                      onClick={() => handleDateClick(currentDate)}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-300 hover:bg-green-100 group-hover:scale-105 transition-transform"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Criar reserva ({availability.time})
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Events overlay */}
        <div className="absolute top-0 left-20 right-0">
          {filteredReservations.map((reservation) => {
            const startMinutes = timeToMinutes(reservation.startTime);
            const endMinutes = timeToMinutes(reservation.endTime);
            const duration = endMinutes - startMinutes;
            
            // Posição baseada no horário (7h = 0)
            const baseMinutes = 7 * 60;
            const topOffset = ((startMinutes - baseMinutes) / 60) * 80; // 80px por hora
            const height = (duration / 60) * 80;

            return (
              <div
                key={reservation.id}
                className="absolute left-4 right-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-all z-10"
                style={{
                  top: `${topOffset}px`,
                  height: `${Math.max(height - 4, 32)}px`,
                  backgroundColor: reservation.color + '15',
                  borderLeftColor: reservation.color,
                  borderLeftWidth: '4px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(reservation);
                }}
              >
                <div className="p-3 h-full flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="font-semibold text-gray-900 truncate">
                      {reservation.client}
                    </span>
                    <Badge 
                      variant={getStatusBadgeVariant(reservation.status)}
                      className="text-xs ml-auto"
                    >
                      {getStatusLabel(reservation.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{reservation.venue}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{reservation.startTime} - {reservation.endTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer com resumo */}
      {filteredReservations.length > 0 && (
        <div className="p-4 border-t bg-muted/20">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Resumo do dia
            </span>
            <div className="flex gap-4">
              <span className="text-green-600">
                {filteredReservations.filter(r => r.status === 'confirmed').length} confirmadas
              </span>
              <span className="text-yellow-600">
                {filteredReservations.filter(r => r.status === 'pending').length} pendentes
              </span>
              <span className="text-red-600">
                {filteredReservations.filter(r => r.status === 'cancelled').length} canceladas
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDayView;
