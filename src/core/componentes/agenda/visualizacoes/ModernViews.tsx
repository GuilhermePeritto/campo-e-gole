import { memo } from 'react';
import type { Reservation } from '@/hooks/useCalendar';
import ModernWeekView from './ModernWeekView';
import ModernMonthView from './ModernMonthView';
import ModernDayView from './ModernDayView';
import ModernAgendaView from './ModernAgendaView';

interface ModernViewsProps {
  viewType: 'month' | 'week' | 'day' | 'agenda';
  currentDate: Date;
  eventos: Reservation[];
  selectedLocais: string[];
  onEventClick: (evento: Reservation) => void;
  onDateClick: (date: Date) => void;
}

const ModernViews = memo(({
  viewType,
  currentDate,
  eventos,
  selectedLocais,
  onEventClick,
  onDateClick
}: ModernViewsProps) => {
  const commonProps = {
    currentDate,
    eventos,
    selectedLocais,
    onEventClick,
    onDateClick
  };

  switch (viewType) {
    case 'week':
      return <ModernWeekView {...commonProps} />;
    case 'month':
      return <ModernMonthView {...commonProps} />;
    case 'day':
      return <ModernDayView {...commonProps} />;
    case 'agenda':
      return <ModernAgendaView {...commonProps} />;
    default:
      return <ModernWeekView {...commonProps} />;
  }
});

ModernViews.displayName = 'ModernViews';

export default ModernViews;