
import { getTimeSlots } from '@/utils/calendarUtils';
import { Reservation } from '@/hooks/useCalendar';
import { Clock, MapPin, User, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  const timeSlots = Array.from({ length: 28 }, (_, i) => {
    const hour = Math.floor(i / 2) + 7;
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  // Filtrar reservas por data e local selecionado
  const filteredReservations = mockReservations.filter(r => {
    const matchesDate = r.day.toDateString() === currentDate.toDateString();
    const matchesVenue = selectedVenue === 'all' || r.venue === selectedVenue;
    return matchesDate && matchesVenue;
  });

  // Agrupar reservas por horário para exibir múltiplas reservas no mesmo slot
  const getReservationsForTimeSlot = (time: string) => {
    return filteredReservations.filter(r => {
      const [slotHour, slotMinute] = time.split(':').map(Number);
      const [startHour, startMinute] = r.startTime.split(':').map(Number);
      const [endHour, endMinute] = r.endTime.split(':').map(Number);
      
      const slotTotalMinutes = slotHour * 60 + slotMinute;
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
      
      return slotTotalMinutes >= startTotalMinutes && slotTotalMinutes < endTotalMinutes;
    });
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
      {/* Header melhorado */}
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

      {/* Timeline melhorada */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          {timeSlots.map((time, index) => {
            const reservations = getReservationsForTimeSlot(time);
            const isOccupied = reservations.length > 0;

            return (
              <div key={time} className="flex border-b border-gray-100 min-h-[80px]">
                {/* Coluna de horário */}
                <div className="w-20 p-4 text-sm font-medium text-gray-500 text-right border-r border-gray-200 bg-gray-50/50 flex items-start">
                  <div className="w-full">
                    <div className="font-semibold">{time}</div>
                    {index % 2 === 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {Math.floor(index / 2) + 7}h
                      </div>
                    )}
                  </div>
                </div>

                {/* Coluna de conteúdo */}
                <div className="flex-1 relative">
                  {isOccupied ? (
                    <div className="p-3 space-y-2">
                      {reservations.map((reservation, idx) => (
                        <div
                          key={reservation.id}
                          className="p-3 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-all"
                          style={{ 
                            backgroundColor: reservation.color + '15',
                            borderLeftColor: reservation.color,
                            borderLeftWidth: '4px'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(reservation);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-gray-600" />
                                <span className="font-semibold text-gray-900 truncate">
                                  {reservation.client}
                                </span>
                                <Badge 
                                  variant={getStatusBadgeVariant(reservation.status)}
                                  className="text-xs"
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
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div 
                      className="h-full flex items-center p-4 cursor-pointer hover:bg-green-50 transition-colors group"
                      onClick={() => handleDateClick(currentDate)}
                    >
                      <div className="text-sm text-gray-400 group-hover:text-green-600 transition-colors">
                        ✓ Horário disponível - Clique para criar reserva
                      </div>
                    </div>
                  )}
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
