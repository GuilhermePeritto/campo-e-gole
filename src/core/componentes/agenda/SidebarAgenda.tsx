
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar-rac';
import { Separator } from '@/components/ui/separator';
import type { MockLocal } from '@/data/mockLocais';
import { cn } from '@/lib/utils';
import { ChevronLeft, FilterIcon, CalendarDays } from 'lucide-react';
import type { DateValue } from "react-aria-components";
import FiltroLocais from './FiltroLocais';

interface SidebarAgendaProps {
  isExpanded: boolean;
  selectedDate: DateValue | null;
  selectedLocais: string[];
  searchQuery: string;
  locais: MockLocal[];
  allLocais: MockLocal[];
  onToggle: () => void;
  onDateChange: (date: DateValue | null) => void;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
  onSearchChange: (query: string) => void;
}

const SidebarAgenda = ({
  isExpanded,
  selectedDate,
  selectedLocais,
  searchQuery,
  locais,
  allLocais,
  onToggle,
  onDateChange,
  onLocalToggle,
  isLocalSelected,
  onSearchChange
}: SidebarAgendaProps) => {
  return (
    <div className={cn(
      "bg-gradient-to-b from-background to-muted/20 border-r border-border/50 transition-all duration-300 flex flex-col shadow-sm",
      isExpanded ? "w-80" : "w-16"
    )}>
      {/* Header da Sidebar */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          {isExpanded && (
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(
              "h-9 w-9 hover:bg-accent/60 transition-all duration-200",
              isExpanded ? "ml-auto" : "mx-auto"
            )}
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <FilterIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Conteúdo da Sidebar */}
      {isExpanded && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Calendário */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
                <CalendarDays className="h-4 w-4" />
                <span>Calendário</span>
              </h3>
              <div className="bg-card/50 rounded-lg p-3 border border-border/50">
                <Calendar
                  value={selectedDate}
                  onChange={onDateChange}
                  className="w-full bg-transparent border-none p-0 shadow-none"
                />
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Filtro de Locais */}
            <FiltroLocais
              locais={locais}
              allLocais={allLocais}
              selectedLocais={selectedLocais}
              searchQuery={searchQuery}
              onLocalToggle={onLocalToggle}
              isLocalSelected={isLocalSelected}
              onSearchChange={onSearchChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarAgenda;
