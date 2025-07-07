import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { MockLocal } from '@/data/mockLocais';
import { cn } from '@/lib/utils';
import { ChevronLeft, CalendarDays, Check, Search } from 'lucide-react';
import type { DateValue } from "react-aria-components";
import { memo, useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format, isAfter, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Convert DateValue to Date for display
  const selectedDateAsDate = selectedDate ? 
    new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day) : 
    new Date();

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setCalendarDate(date);
    // Convert to DateValue format
    const dateValue = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    } as DateValue;
    onDateChange(dateValue);
  };

  // Filter locais based on search
  const filteredLocais = useMemo(() => {
    if (!localSearchQuery.trim()) return allLocais;
    return allLocais.filter(local => 
      local.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      local.type.toLowerCase().includes(localSearchQuery.toLowerCase())
    );
  }, [allLocais, localSearchQuery]);

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
            <Calendar
              mode="single"
              selected={selectedDateAsDate}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const currentMonth = new Date();
                return isAfter(date, endOfMonth(currentMonth));
              }}
              className="rounded-md border border-border pointer-events-auto"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 cursor-pointer",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-30",
                day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
            />
          </div>

          <Separator />

          {/* Venues/Locais */}
          <div className="flex-1 space-y-3 min-h-0 flex flex-col">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Locais
            </h3>
            
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar locais..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>

            <ScrollArea className="flex-1 -mx-2">
              <div className="space-y-2 px-2">
                {/* All option */}
                <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors">
                  <Checkbox
                    id="all-venues"
                    checked={selectedLocais.includes('all')}
                    onCheckedChange={() => onLocalToggle('all')}
                    className="sr-only peer"
                  />
                  <Check 
                    className={cn(
                      "h-4 w-4 text-primary",
                      !selectedLocais.includes('all') && "invisible"
                    )}
                  />
                  <label
                    htmlFor="all-venues"
                    className={cn(
                      "flex-1 text-sm font-medium cursor-pointer",
                      !selectedLocais.includes('all') && "text-muted-foreground/70 line-through"
                    )}
                  >
                    Todos os Locais
                  </label>
                  <div className="w-3 h-3 rounded-full bg-primary/20" />
                </div>

                {/* Individual venues */}
                {filteredLocais.map((local) => {
                  const isSelected = isLocalSelected(local.id);
                  const eventCount = eventCountByVenue[local.id] || 0;
                  
                  return (
                    <div 
                      key={local.id}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors"
                    >
                      <Checkbox
                        id={local.id}
                        checked={isSelected}
                        onCheckedChange={() => onLocalToggle(local.id)}
                        className="sr-only peer"
                      />
                      <Check 
                        className={cn(
                          "h-4 w-4 text-primary",
                          !isSelected && "invisible"
                        )}
                      />
                      <label
                        htmlFor={local.id}
                        className={cn(
                          "flex-1 text-sm font-medium cursor-pointer",
                          !isSelected && "text-muted-foreground/70 line-through"
                        )}
                      >
                        {local.name}
                        <div className="text-xs text-muted-foreground">
                          {local.type}
                        </div>
                        {eventCount > 0 && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({eventCount})
                          </span>
                        )}
                      </label>
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: local.color }}
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
});

ModernSidebar.displayName = 'ModernSidebar';

export default ModernSidebar;