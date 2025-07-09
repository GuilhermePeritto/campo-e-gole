import CalendarioSidebar from '@/components/agenda/layout/CalendarioSidebar';
import ListaLocaisAgenda from '@/components/agenda/locais/ListaLocaisAgenda';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useLocais } from '@/hooks/useLocais';
import type { Local } from '@/types/reservas';
import { ChevronLeft, FilterIcon } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import type { DateValue } from "react-aria-components";

interface BarraLateralAgendaProps {
  isExpanded: boolean;
  selectedDate: DateValue | null;
  selectedLocais: string[];
  locais: Local[];
  allLocais: Local[];
  locaisLoading?: boolean;
  eventCountByVenue?: Record<string, number>;
  onToggle: () => void;
  onDateChange: (date: DateValue | null) => void;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
  tipoVisualizacao: 'mes' | 'semana' | 'dia' | 'lista';
  eventDates?: string[];
}

const BarraLateralAgenda = memo((props: BarraLateralAgendaProps) => {
  const {
    isExpanded,
    selectedDate,
    locais,
    allLocais,
    locaisLoading = false,
    eventCountByVenue,
    onDateChange,
    selectedLocais,
    onLocalToggle,
    isLocalSelected,
    onToggle,
    tipoVisualizacao,
    eventDates = []
  } = props;

  // Estado de busca e debounce
  const [buscaLocal, setBuscaLocal] = useState('');
  const [locaisFiltrados, setLocaisFiltrados] = useState<any[]>([]);
  const { locais: fetchedLocais, loading, fetchLocais } = useLocais();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Buscar locais ao montar e ao filtrar
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchLocais({ search: buscaLocal });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [buscaLocal, fetchLocais]);

  useEffect(() => {
    setLocaisFiltrados(locais);
  }, [locais]);

  // Gera um Date para o mês/ano/dia selecionado
  const selectedDateAsDate = selectedDate ? new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day) : new Date();

  return (
    <div className={
      `flex flex-col h-full min-h-0 bg-sidebar border-r border-border z-20 
      transition-all duration-500 ease-in-out
      ${isExpanded
        ? 'w-72 min-w-[240px] max-w-[320px] shadow-lg'
        : 'w-14 min-w-[56px] max-w-[56px] shadow'
      }`
    }>
      {/* Header */}
      <div className={
        `flex flex-col border-border
        transition-all duration-500 ease-in-out
        ${isExpanded ? 'items-center p-4 pb-2' : 'items-center py-2'}`
      }>
        {/* Botão de toggle */}
        <div className={
          `w-full flex mb-2
          transition-all duration-500 ease-in-out
          ${isExpanded ? 'justify-between items-center' : 'justify-center'}`
        }>
          {isExpanded && <Label>Filtros</Label>}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 hover:bg-accent transition-transform duration-500"
            title={isExpanded ? "Recolher barra lateral" : "Expandir barra lateral"}
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <FilterIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className='w-full flex items-center justify-center px-2'>
          <Separator className='w-full' />
        </div>
        
        {/* Calendário */}
        <div className="py-2">
          <CalendarioSidebar
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            isExpanded={isExpanded}
            eventDates={eventDates}
          />
        </div>
        {/* Lista de Locais */}
        <ListaLocaisAgenda
          locaisSelecionados={selectedLocais}
          locais={locais}
          todosLocais={allLocais}
          eventCountByVenue={eventCountByVenue}
          aoAlternarLocal={onLocalToggle}
          estaLocalSelecionado={isLocalSelected}
          modoCompacto={!isExpanded}
          loading={locaisLoading}
        />
      </div>
    </div>
  );
});

BarraLateralAgenda.displayName = 'BarraLateralAgenda';

export default BarraLateralAgenda;