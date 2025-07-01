
import { Calendar } from '@/components/ui/calendar-rac';
import { cn } from '@/lib/utils';
import { CalendarDays } from 'lucide-react';
import type { DateValue } from "react-aria-components";
import { memo } from 'react';

interface CalendarioSidebarProps {
  dataSelecionada: DateValue | null;
  onMudancaData: (data: DateValue | null) => void;
}

const CalendarioSidebar = memo(({ 
  dataSelecionada, 
  onMudancaData 
}: CalendarioSidebarProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
        <CalendarDays className="h-4 w-4" />
        <span>Calendário</span>
      </h3>
      <div className="bg-card/50 rounded-lg p-3 border border-border/50">
        <Calendar
          value={dataSelecionada}
          onChange={onMudancaData}
          className={cn(
            "w-full bg-transparent border-none p-0 shadow-none",
            // Estilos para estados selecionados usando data attributes corretos
            "[&_[data-selected]]:bg-primary [&_[data-selected]]:text-primary-foreground",
            "[&_[data-hovered]]:bg-accent [&_[data-hovered]]:text-accent-foreground",
            "[&_[data-pressed]]:bg-primary/90 [&_[data-pressed]]:text-primary-foreground",
            // Suporte para React Aria Components mais recentes
            "[&_.react-aria-CalendarCell[data-selected]]:bg-primary",
            "[&_.react-aria-CalendarCell[data-selected]]:text-primary-foreground",
            "[&_.react-aria-CalendarCell[data-hovered]]:bg-accent",
            "[&_.react-aria-CalendarCell[data-hovered]]:text-accent-foreground",
            // Estilos adicionais para garantir visibilidade
            "[&_button[data-selected]]:bg-primary [&_button[data-selected]]:text-primary-foreground",
            "[&_button[aria-selected=true]]:bg-primary [&_button[aria-selected=true]]:text-primary-foreground"
          )}
        />
      </div>
    </div>
  );
});

CalendarioSidebar.displayName = 'CalendarioSidebar';

export default CalendarioSidebar;
