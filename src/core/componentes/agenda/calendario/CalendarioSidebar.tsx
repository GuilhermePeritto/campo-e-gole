
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
    <div className="espaco-y-3">
      <h3 className="texto-sm fonte-semibold texto-principal flex items-center espaco-x-2">
        <CalendarDays className="h-4 w-4" />
        <span>Calendário</span>
      </h3>
      <div className="fundo-cartao/50 rounded-lg p-3 borda borda-divisor/50">
        <Calendar
          value={dataSelecionada}
          onChange={onMudancaData}
          className={cn(
            "w-full bg-transparent border-none p-0 shadow-none",
            "[&_[data-selected]]:bg-primary [&_[data-selected]]:text-primary-foreground",
            "[&_[data-hovered]]:bg-accent [&_[data-hovered]]:text-accent-foreground",
            "[&_.react-aria-CalendarCell[data-selected]]:bg-primary",
            "[&_.react-aria-CalendarCell[data-selected]]:text-primary-foreground"
          )}
        />
      </div>
    </div>
  );
});

CalendarioSidebar.displayName = 'CalendarioSidebar';

export default CalendarioSidebar;
