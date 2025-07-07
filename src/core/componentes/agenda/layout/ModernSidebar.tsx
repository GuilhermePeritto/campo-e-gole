import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { MockLocal } from '@/data/mockLocais';
import { cn } from '@/lib/utils';
import { ChevronLeft, CalendarDays } from 'lucide-react';
import type { DateValue } from "react-aria-components";
import { memo, useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ModernCalendar from './ModernCalendar';
import ModernLocationsList from './ModernLocationsList';

interface ModernSidebarProps {
  isExpanded: boolean;
  selectedDate: DateValue | null;
  selectedLocais: string[];
  searchQuery: string;
  locais: MockLocal[];
  allLocais: MockLocal[];
  eventCountByVenue?: Record<string, number>;
  onToggle: () => void;
  onDateChange: (date: DateValue | null) => void;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
  onSearchChange: (query: string) => void;
}

const ModernSidebar = memo(({
  isExpanded,
  selectedDate,
  selectedLocais,
  searchQuery,
  locais,
  allLocais,
  eventCountByVenue = {},
  onToggle,
  onDateChange,
  onLocalToggle,
  isLocalSelected,
  onSearchChange,
}: ModernSidebarProps) => {
  // Convert DateValue to Date for display
  const selectedDateAsDate = selectedDate ? 
    new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day) : 
    new Date();

  const currentMonth = format(selectedDateAsDate, 'MMMM yyyy', { locale: ptBR });

  return (
    <div className={cn(
      "bg-sidebar border-r border-border transition-all duration-300 flex flex-col h-full",
      isExpanded ? "w-72" : "w-16"
    )}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {isExpanded && (
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Calendars</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(
              "h-9 w-9 hover:bg-accent",
              !isExpanded && "mx-auto"
            )}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              !isExpanded && "rotate-180"
            )} />
          </Button>
        </div>
      </div>

      {/* Sidebar Content */}
      {isExpanded && (
        <div className="flex-1 flex flex-col p-4 space-y-6 overflow-hidden">
          {/* Calendar */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground capitalize">
              {currentMonth}
            </h3>
            <ModernCalendar
              value={selectedDate}
              onChange={onDateChange}
            />
          </div>

          <Separator />

          {/* Venues/Locais */}
          <ModernLocationsList
            selectedLocais={selectedLocais}
            locais={locais}
            allLocais={allLocais}
            eventCountByVenue={eventCountByVenue}
            onLocalToggle={onLocalToggle}
            isLocalSelected={isLocalSelected}
          />
        </div>
      )}
    </div>
  );
});

ModernSidebar.displayName = 'ModernSidebar';

export default ModernSidebar;