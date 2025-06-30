
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react';
import { ViewType } from '@/core/hooks/useAgendaNova';

interface HeaderAgendaProps {
  currentDate: Date;
  viewType: ViewType;
  onViewTypeChange: (view: ViewType) => void;
  onNavigateDate: (direction: 'prev' | 'next') => void;
  onGoToToday: () => void;
  onNewEvent: () => void;
}

const HeaderAgenda: React.FC<HeaderAgendaProps> = ({
  currentDate,
  viewType,
  onViewTypeChange,
  onNavigateDate,
  onGoToToday,
  onNewEvent
}) => {
  const formatDateTitle = () => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      year: 'numeric' 
    };
    
    if (viewType === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${weekStart.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
      } else {
        return `${weekStart.toLocaleDateString('pt-BR', { month: 'short' })} - ${weekEnd.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}`;
      }
    }
    
    if (viewType === 'day') {
      return currentDate.toLocaleDateString('pt-BR', { 
        weekday: 'long',
        day: 'numeric',
        month: 'long', 
        year: 'numeric' 
      });
    }
    
    return currentDate.toLocaleDateString('pt-BR', options);
  };

  const getViewTypeLabel = (view: ViewType): string => {
    const labels = {
      month: 'Mensal',
      week: 'Semanal',
      day: 'Diário',
      agenda: 'Agenda'
    };
    return labels[view];
  };

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Navegação de data */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigateDate('prev')}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigateDate('next')}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <h1 className="text-xl font-semibold text-foreground">
            {formatDateTitle()}
          </h1>
          
          <Button
            variant="outline"
            onClick={onGoToToday}
            className="text-sm"
          >
            Hoje
          </Button>
        </div>

        {/* Controles direita */}
        <div className="flex items-center space-x-3">
          <Select value={viewType} onValueChange={onViewTypeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mensal</SelectItem>
              <SelectItem value="week">Semanal</SelectItem>
              <SelectItem value="day">Diário</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={onNewEvent} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Evento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAgenda;
