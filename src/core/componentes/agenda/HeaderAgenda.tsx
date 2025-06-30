
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HeaderAgendaProps {
  currentDate: Date;
  viewType: 'month' | 'week' | 'day' | 'agenda';
  onNavigateDate: (direction: 'prev' | 'next') => void;
  onTodayClick: () => void;
  onNewEventClick: () => void;
  onViewTypeChange: (view: 'month' | 'week' | 'day' | 'agenda') => void;
}

const HeaderAgenda = ({
  currentDate,
  viewType,
  onNavigateDate,
  onTodayClick,
  onNewEventClick,
  onViewTypeChange
}: HeaderAgendaProps) => {
  const getDateTitle = () => {
    switch (viewType) {
      case 'month':
        return format(currentDate, 'MMMM yyyy', { locale: ptBR });
      case 'week':
        return format(currentDate, "'Semana de' dd MMM yyyy", { locale: ptBR });
      case 'day':
        return format(currentDate, 'dd \'de\' MMMM yyyy', { locale: ptBR });
      case 'agenda':
        return format(currentDate, 'MMMM yyyy', { locale: ptBR });
      default:
        return format(currentDate, 'MMMM yyyy', { locale: ptBR });
    }
  };

  const getViewTypeLabel = (view: string) => {
    switch (view) {
      case 'month': return 'Mensal';
      case 'week': return 'Semanal';
      case 'day': return 'Diário';
      case 'agenda': return 'Agenda';
      default: return 'Mensal';
    }
  };

  return (
    <div className="bg-background border-b px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Lado Esquerdo - Navegação de Data */}
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
            
            <h1 className="text-xl font-semibold text-foreground min-w-[200px]">
              {getDateTitle()}
            </h1>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigateDate('next')}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={onTodayClick}
            className="h-8"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Hoje
          </Button>
        </div>

        {/* Lado Direito - Ações */}
        <div className="flex items-center space-x-3">
          <Button
            onClick={onNewEventClick}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>

          <Select value={viewType} onValueChange={onViewTypeChange}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue>
                {getViewTypeLabel(viewType)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mensal</SelectItem>
              <SelectItem value="week">Semanal</SelectItem>
              <SelectItem value="day">Diário</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default HeaderAgenda;
