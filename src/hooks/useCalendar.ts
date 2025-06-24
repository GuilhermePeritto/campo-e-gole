
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLocais } from '@/data/mockLocais';
import { mockReservations } from '@/data/mockReservations';

export interface Venue {
  id: string;
  name: string;
  color: string;
}

export interface Reservation {
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

export interface HoverPopup {
  isVisible: boolean;
  events: Reservation[];
  date: Date;
  mousePosition: { x: number; y: number };
}

export const useCalendar = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Usar dados centralizados dos locais
  const venues: Venue[] = [
    { id: 'all', name: 'Todos os locais', color: '#6b7280' },
    ...mockLocais.map(local => ({
      id: local.id,
      name: local.name,
      color: local.status === 'active' ? '#10b981' : 
             local.status === 'maintenance' ? '#f59e0b' : '#ef4444'
    }))
  ];

  // Converter reservas mockadas para o formato usado na agenda
  const convertedReservations: Reservation[] = mockReservations.map(reservation => {
    const reservationDate = new Date(reservation.date);
    const startDateTime = `${reservation.date}T${reservation.startTime}:00`;
    const endDateTime = `${reservation.date}T${reservation.endTime}:00`;
    
    return {
      id: reservation.id,
      title: `${reservation.client} - ${reservation.sport || 'Reserva'}`,
      start: startDateTime,
      end: endDateTime,
      venueId: reservation.venueId,
      clientName: reservation.client,
      status: reservation.status,
      color: reservation.color,
      client: reservation.client,
      venue: reservation.venue,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      day: reservationDate
    };
  });

  const navigateDate = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      switch (viewType) {
        case 'month':
          newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
          break;
        case 'week':
          newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
          break;
        case 'day':
          newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
          break;
      }
      return newDate;
    });
  }, [viewType]);

  const handleDateClick = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    navigate(`/eventos/reserva?date=${dateStr}`);
  }, [navigate]);

  const handleEventClick = useCallback((event: Reservation) => {
    navigate(`/eventos/reserva/${event.id}`);
  }, [navigate]);

  const handleDayFilterClick = useCallback((day: Date) => {
    setCurrentDate(day);
    setViewType('day');
  }, []);

  const handleViewTypeChange = useCallback((view: 'month' | 'week' | 'day') => {
    setViewType(view);
  }, []);

  return {
    viewType,
    setViewType: handleViewTypeChange,
    selectedVenue,
    setSelectedVenue,
    currentDate,
    setCurrentDate,
    venues,
    mockReservations: convertedReservations,
    navigateDate,
    handleDateClick,
    handleEventClick,
    handleDayFilterClick
  };
};
