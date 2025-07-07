import CompactLocationsList from '@/components/agenda/layout/CompactLocationsList';
import DateSelector from '@/components/agenda/layout/DateSelector';
import ModernCalendar from '@/components/agenda/layout/ModernCalendar';
import ModernLocationsList from '@/components/agenda/layout/ModernLocationsList';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { MockLocal } from '@/data/mockLocais';
import { parseDate } from '@internationalized/date';
import { ChevronLeft, FilterIcon } from 'lucide-react';
import { memo, useRef } from 'react';
import type { DateValue } from "react-aria-components";

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
  tipoVisualizacao: 'mes' | 'semana' | 'dia' | 'lista';
}

// Função utilitária para somar dias a um DateValue (CalendarDate)
function addDaysDateValue(dateValue, amount) {
  // CalendarDate de @internationalized/date tem year, month, day
  // Cria um Date JS, soma dias, retorna parseDate(yyyy-MM-dd)
  const jsDate = new Date(dateValue.year, dateValue.month - 1, dateValue.day + amount);
  const yyyy = jsDate.getFullYear();
  const mm = String(jsDate.getMonth() + 1).padStart(2, '0');
  const dd = String(jsDate.getDate()).padStart(2, '0');
  return parseDate(`${yyyy}-${mm}-${dd}`);
}

const BarraLateralAgenda = memo((props: ModernSidebarProps) => {
  const {
    isExpanded,
    selectedDate,
    locais,
    allLocais,
    eventCountByVenue,
    onDateChange,
    selectedLocais,
    onLocalToggle,
    isLocalSelected,
    onToggle,
    onSearchChange,
    tipoVisualizacao
  } = props;

  // Gera um Date para o mês/ano/dia selecionado
  const selectedDateAsDate = selectedDate ? new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day) : new Date();

  // Debounce para seleção de dia/mês
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  function debounceChange(fn: () => void) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fn, 400);
  }

  return (
    <div className={`
      flex flex-col h-full min-h-0 bg-sidebar border-r border-border z-20 
      transition-all duration-500 ease-in-out
      ${isExpanded
        ? 'w-72 min-w-[240px] max-w-[320px] shadow-lg'
        : 'w-14 min-w-[56px] max-w-[56px] shadow'
      }
    `}>
      {/* Header */}
      <div className={`
        flex flex-col border-border
        transition-all duration-500 ease-in-out
        ${isExpanded ? 'items-center p-4 pb-2' : 'items-center py-2'}
      `}>
        {/* Botão de toggle */}
        <div className={`
          w-full flex mb-2
          transition-all duration-500 ease-in-out
          ${isExpanded ? 'justify-between items-center' : 'justify-center'}
        `}>
          {isExpanded && <Label>Filtros</Label>}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 hover:bg-accent transition-transform duration-300"
            title={isExpanded ? "Recolher barra lateral" : "Expandir barra lateral"}
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <FilterIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Calendário - visível apenas quando expandido */}
        <div className={`
          transition-all duration-500 ease-in-out overflow-hidden
          ${isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}
        `}>
          <ModernCalendar
            value={selectedDate}
            onChange={onDateChange}
            className="rounded-md p-2 pointer-events-auto border-none shadow-none"
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-h-0 flex flex-col">
        {isExpanded ? (
          /* Conteúdo expandido */
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col transition-all duration-500 ease-in-out">
            <div className='w-full flex items-center justify-center px-2'>
              <Separator className='w-full' />
            </div>
            <ModernLocationsList
              selectedLocais={selectedLocais}
              locais={locais}
              allLocais={allLocais}
              eventCountByVenue={eventCountByVenue}
              onLocalToggle={onLocalToggle}
              isLocalSelected={isLocalSelected}
              compact={false}
            />
          </div>
        ) : (
          /* Conteúdo recolhido */
          <div className="flex flex-col items-center h-full min-h-0">
            {/* Metade superior - Dias/Meses */}
            <div className="transition-transform hover:translate-x-[25px]">
              <DateSelector
                type={tipoVisualizacao === 'mes' ? 'month' : 'day'}
                selectedValue={tipoVisualizacao === 'mes' ? selectedDateAsDate.getMonth() : selectedDateAsDate.getDate()}
                month={selectedDateAsDate.getMonth()}
                year={selectedDateAsDate.getFullYear()}
                orientation="vertical"
                curveSide="left"
                onSelect={(value) => {
                  debounceChange(() => {
                    const yyyy = selectedDateAsDate.getFullYear();
                    const mm = tipoVisualizacao === 'mes'
                      ? String(value + 1).padStart(2, '0')
                      : String(selectedDateAsDate.getMonth() + 1).padStart(2, '0');
                    const dd = tipoVisualizacao === 'mes'
                      ? '01'
                      : String(value).padStart(2, '0');
                    onDateChange(parseDate(`${yyyy}-${mm}-${dd}`));
                  });
                }}
              />
            </div>

            <div className='w-full flex items-center justify-center px-2'>
              <Separator className='w-full' />
            </div>

            {/* Metade inferior - Locais */}
            <div className="flex-1 flex w-full flex-col items-center justify-center overflow-y-auto min-h-0">
              <CompactLocationsList
                selectedLocais={selectedLocais}
                locais={locais}
                allLocais={allLocais}
                eventCountByVenue={eventCountByVenue}
                onLocalToggle={onLocalToggle}
                isLocalSelected={isLocalSelected}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

BarraLateralAgenda.displayName = 'BarraLateralAgenda';

export default BarraLateralAgenda;