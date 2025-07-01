
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';

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
    <div className="bg-gradient-to-r from-background via-background to-muted/30 border-b border-border/50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Lado Esquerdo - Navegação de Data */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground min-w-[200px] capitalize">
                {getDateTitle()}
              </h1>
            </div>
          </div>

          {/* Lado Direito - Controles */}
          <div className="flex items-center space-x-4">
            {/* Navegação de Data */}
            <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigateDate('prev')}
                className="h-8 w-8 hover:bg-background/80"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                onClick={onTodayClick}
                className="h-8 px-3 hover:bg-background/80"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Hoje
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigateDate('next')}
                className="h-8 w-8 hover:bg-background/80"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-8" />

            {/* Seletor de Visualização */}
            <Select value={viewType} onValueChange={onViewTypeChange}>
              <SelectTrigger className="w-36 h-9 bg-background/50 border-border/50">
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

            <Separator orientation="vertical" className="h-8" />

            {/* Botão Novo Evento */}
            <Button
              onClick={onNewEventClick}
              className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAgenda;
