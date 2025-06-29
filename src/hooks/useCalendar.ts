
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocais } from './useLocais';
import { useReservas } from './useReservas';

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

export const useCalendar = () => {
  const navigate = useNavigate();
  const { getVenuesForCalendar } = useLocais();
  const { getCalendarReservations } = useReservas();
  
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  const venues = getVenuesForCalendar();
  const mockReservations = getCalendarReservations;

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
    navigate(`/eventos/reserva/${event.id}/editar`);
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
    mockReservations,
    navigateDate,
    handleDateClick,
    handleEventClick,
    handleDayFilterClick
  };
};
