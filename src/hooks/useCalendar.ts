
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
  color: string; // Made required instead of optional
  // Add missing properties for calendar views
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
  const [hoverPopup, setHoverPopup] = useState<HoverPopup>({
    isVisible: false,
    events: [],
    date: new Date(),
    mousePosition: { x: 0, y: 0 }
  });

  // Mock data
  const venues: Venue[] = [
    { id: 'all', name: 'Todos os locais', color: '#6b7280' },
    { id: '1', name: 'Quadra A', color: '#10b981' },
    { id: '2', name: 'Quadra B', color: '#f59e0b' },
    { id: '3', name: 'Campo Principal', color: '#3b82f6' }
  ];

  const mockReservations: Reservation[] = [
    {
      id: 1,
      title: 'João Silva - Treino',
      start: '2025-06-18T09:00:00',
      end: '2025-06-18T11:00:00',
      venueId: '1',
      clientName: 'João Silva',
      status: 'confirmed',
      color: '#10b981',
      client: 'João Silva',
      venue: 'Quadra A',
      startTime: '09:00',
      endTime: '11:00',
      day: new Date('2025-06-18')
    },
    {
      id: 2,
      title: 'Maria Santos - Aula',
      start: '2025-06-18T14:00:00',
      end: '2025-06-18T16:00:00',
      venueId: '2',
      clientName: 'Maria Santos',
      status: 'pending',
      color: '#f59e0b',
      client: 'Maria Santos',
      venue: 'Quadra B',
      startTime: '14:00',
      endTime: '16:00',
      day: new Date('2025-06-18')
    },
    {
      id: 3,
      title: 'Pedro Costa - Pelada',
      start: '2025-06-18T19:00:00',
      end: '2025-06-18T21:00:00',
      venueId: '3',
      clientName: 'Pedro Costa',
      status: 'confirmed',
      color: '#3b82f6',
      client: 'Pedro Costa',
      venue: 'Campo Principal',
      startTime: '19:00',
      endTime: '21:00',
      day: new Date('2025-06-18')
    }
  ];

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
    const dateStr = date.toISOString().split('T')[0];
    navigate(`/eventos/reservar?date=${dateStr}`);
  }, [navigate]);

  const handleEventClick = useCallback((event: Reservation) => {
    // Navigate to edit page with the event ID
    navigate(`/eventos/reservas/${event.id}`);
  }, [navigate]);

  const handleDayMouseEnter = useCallback((day: Date, e: React.MouseEvent) => {
    const dayReservations = mockReservations.filter(r =>
      r.day.toDateString() === day.toDateString()
    );
    
    if (dayReservations.length > 0) {
      setHoverPopup({
        isVisible: true,
        events: dayReservations,
        date: day,
        mousePosition: { x: e.clientX, y: e.clientY }
      });
    }
  }, [mockReservations]);

  const handleDayMouseLeave = useCallback(() => {
    setHoverPopup(prev => ({ ...prev, isVisible: false }));
  }, []);

  const handleDayMouseMove = useCallback((e: React.MouseEvent) => {
    setHoverPopup(prev => ({
      ...prev,
      mousePosition: { x: e.clientX, y: e.clientY }
    }));
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
    hoverPopup,
    venues,
    mockReservations,
    navigateDate,
    handleDateClick,
    handleEventClick,
    handleDayMouseEnter,
    handleDayMouseLeave,
    handleDayMouseMove
  };
};
