
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
  color?: string;
}

export interface HoverPopup {
  isVisible: boolean;
  events: Reservation[];
  date: string;
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
    date: '',
    mousePosition: { x: 0, y: 0 }
  });

  // Mock data
  const venues: Venue[] = [
    { id: '1', name: 'Quadra A', color: '#10b981' },
    { id: '2', name: 'Quadra B', color: '#f59e0b' },
    { id: '3', name: 'Campo Principal', color: '#3b82f6' }
  ];

  const mockReservations: Reservation[] = [
    {
      id: 1,
      title: 'João Silva - Treino',
      start: '2024-06-15T09:00:00',
      end: '2024-06-15T11:00:00',
      venueId: '1',
      clientName: 'João Silva',
      status: 'confirmed',
      color: '#10b981'
    },
    {
      id: 2,
      title: 'Maria Santos - Aula',
      start: '2024-06-15T14:00:00',
      end: '2024-06-15T16:00:00',
      venueId: '2',
      clientName: 'Maria Santos',
      status: 'pending',
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'Pedro Costa - Pelada',
      start: '2024-06-15T19:00:00',
      end: '2024-06-15T21:00:00',
      venueId: '3',
      clientName: 'Pedro Costa',
      status: 'confirmed',
      color: '#3b82f6'
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
    navigate(`/eventos/novo?date=${dateStr}`);
  }, [navigate]);

  const handleEventClick = useCallback((event: Reservation) => {
    // Navegar para a página de edição com o ID do evento
    navigate(`/eventos/reservas/${event.id}/editar`);
  }, [navigate]);

  const handleDayMouseEnter = useCallback((date: string, events: Reservation[], mouseEvent: React.MouseEvent) => {
    if (events.length > 0) {
      setHoverPopup({
        isVisible: true,
        events,
        date,
        mousePosition: { x: mouseEvent.clientX, y: mouseEvent.clientY }
      });
    }
  }, []);

  const handleDayMouseLeave = useCallback(() => {
    setHoverPopup(prev => ({ ...prev, isVisible: false }));
  }, []);

  const handleDayMouseMove = useCallback((mouseEvent: React.MouseEvent) => {
    setHoverPopup(prev => ({
      ...prev,
      mousePosition: { x: mouseEvent.clientX, y: mouseEvent.clientY }
    }));
  }, []);

  return {
    viewType,
    setViewType,
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
