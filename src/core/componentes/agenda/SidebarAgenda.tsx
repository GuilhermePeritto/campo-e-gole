
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar-rac';
import type { MockLocal } from '@/data/mockLocais';
import { cn } from '@/lib/utils';
import { ChevronLeft, FilterIcon } from 'lucide-react';
import { Separator, type DateValue } from "react-aria-components";
import FiltroLocais from './FiltroLocais';

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
        "bg-muted/30 border-r transition-all duration-300 flex flex-col",
        isExpanded ? "w-80" : "w-12"
      )}>
        {/* Header da Sidebar */}
        <div className="p-4 flex items-center justify-between">
          {/* {isExpanded && (
            <h2 className="text-lg font-semibold">Agenda</h2>
          )} */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <FilterIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator className='mx-4'/>

        {/* Conteúdo da Sidebar */}
        {isExpanded && (
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Calendário */}
            <div>
              <Calendar
                value={selectedDate}
                onChange={onDateChange}
                className="w-full bg-transparent border-none p-0 shadow-none"
              />
            </div>

            <Separator/>

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
