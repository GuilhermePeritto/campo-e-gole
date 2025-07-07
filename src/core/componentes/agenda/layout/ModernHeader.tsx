import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Moon, Sun } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTheme } from 'next-themes';

interface ModernHeaderProps {
  currentDate: Date;
  viewType: 'month' | 'week' | 'day' | 'agenda';
  onNavigateDate: (direction: 'prev' | 'next') => void;
  onTodayClick: () => void;
  onNewEventClick: () => void;
  onViewTypeChange: (view: 'month' | 'week' | 'day' | 'agenda') => void;
}

const ModernHeader = memo(({
  currentDate,
  viewType,
  onNavigateDate,
  onTodayClick,
  onNewEventClick,
  onViewTypeChange
}: ModernHeaderProps) => {
  const { theme, setTheme } = useTheme();

  const titleFormat = useMemo(() => {
    switch (viewType) {
      case 'month':
        return format(currentDate, 'MMMM yyyy', { locale: ptBR });
      case 'week':
        return format(currentDate, "'Semana de' dd 'de' MMMM yyyy", { locale: ptBR });
      case 'day':
        return format(currentDate, "dd 'de' MMMM yyyy", { locale: ptBR });
      case 'agenda':
        return format(currentDate, 'MMMM yyyy', { locale: ptBR });
      default:
        return format(currentDate, 'MMMM yyyy', { locale: ptBR });
    }
  }, [currentDate, viewType]);

  const viewLabels = {
    'month': 'Mês',
    'week': 'Semana', 
    'day': 'Dia',
    'agenda': 'Lista'
  };

  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title and avatars */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-foreground">
            {titleFormat}
          </h1>
          
          {/* Avatar group */}
          <div className="flex -space-x-2">
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/avatar-40-16_zn3ygb.jpg" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/avatar-40-10_qyybkj.jpg" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/avatar-40-15_fguzbs.jpg" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/avatar-40-11_jtjhsp.jpg" />
              <AvatarFallback>U4</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-3">
          {/* Navigation */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigateDate('prev')}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={onTodayClick}
              className="h-9 px-3"
            >
              Hoje
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigateDate('next')}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* New Event Button */}
          <Button
            onClick={onNewEventClick}
            className="h-9 px-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>

          {/* View Selector */}
          <Select value={viewType} onValueChange={onViewTypeChange}>
            <SelectTrigger className="w-24 h-9">
              <SelectValue>{viewLabels[viewType]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="day">Dia</SelectItem>
              <SelectItem value="agenda">Lista</SelectItem>
            </SelectContent>
          </Select>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
});

ModernHeader.displayName = 'ModernHeader';

export default ModernHeader;