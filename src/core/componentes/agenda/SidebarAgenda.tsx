
import React from 'react';
import { Calendar } from '@/components/ui/calendar-rac';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FiltroLocais from './FiltroLocais';
import { cn } from '@/lib/utils';
import type { DateValue } from "react-aria-components";

interface SidebarAgendaProps {
  isExpanded: boolean;
  onToggle: () => void;
  selectedDate: DateValue;
  onDateChange: (date: DateValue) => void;
  venues: Array<{ id: string; name: string; color: string }>;
  selectedLocais: string[];
  onToggleLocal: (localId: string) => void;
}

const SidebarAgenda: React.FC<SidebarAgendaProps> = ({
  isExpanded,
  onToggle,
  selectedDate,
  onDateChange,
  venues,
  selectedLocais,
  onToggleLocal
}) => {
  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
      isExpanded ? "w-80" : "w-12"
    )}>
      {/* Header com botão de toggle */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        {isExpanded && (
          <h2 className="text-sm font-medium text-foreground">Agenda</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Conteúdo da sidebar */}
      {isExpanded && (
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Calendário */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Data</h3>
            <Calendar
              className="rounded-md border border-border p-2"
              value={selectedDate}
              onChange={onDateChange}
            />
          </div>

          {/* Filtro de Locais */}
          <FiltroLocais
            locais={venues}
            selectedLocais={selectedLocais}
            onToggleLocal={onToggleLocal}
          />
        </div>
      )}
    </div>
  );
};

export default SidebarAgenda;
