
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar-rac';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import FiltroLocais from './FiltroLocais';
import type { DateValue } from "react-aria-components";
import type { MockLocal } from '@/data/mockLocais';

interface SidebarAgendaProps {
  isExpanded: boolean;
  selectedDate: DateValue | null;
  selectedLocais: string[];
  locais: MockLocal[];
  onToggle: () => void;
  onDateChange: (date: DateValue | null) => void;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
}

const SidebarAgenda = ({
  isExpanded,
  selectedDate,
  selectedLocais,
  locais,
  onToggle,
  onDateChange,
  onLocalToggle,
  isLocalSelected
}: SidebarAgendaProps) => {
  return (
    <>
      {/* Sidebar */}
      <div className={cn(
        "bg-background border-r transition-all duration-300 flex flex-col",
        isExpanded ? "w-80" : "w-12"
      )}>
        {/* Header da Sidebar */}
        <div className="p-4 border-b flex items-center justify-between">
          {isExpanded && (
            <h2 className="text-lg font-semibold">Agenda</h2>
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

        {/* Conteúdo da Sidebar */}
        {isExpanded && (
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Calendário */}
            <div>
              <Calendar
                value={selectedDate}
                onChange={onDateChange}
                className="w-full"
              />
            </div>

            {/* Filtro de Locais */}
            <FiltroLocais
              locais={locais}
              selectedLocais={selectedLocais}
              onLocalToggle={onLocalToggle}
              isLocalSelected={isLocalSelected}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarAgenda;
