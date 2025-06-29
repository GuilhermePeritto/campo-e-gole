
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import FiltroLocaisMultiple from './FiltroLocaisMultiple';
import SeletorVisualizacao from './SeletorVisualizacao';
import { TipoVisualizacao } from '@/core/hooks/useAgenda';

interface Local {
  id: string;
  name: string;
  color: string;
}

interface SidebarCalendarioProps {
  dataAtual: Date;
  onMudarData: (data: Date) => void;
  tipoVisualizacao: TipoVisualizacao;
  onMudarTipoVisualizacao: (tipo: TipoVisualizacao) => void;
  locais: Local[];
  locaisSelecionados: string[];
  onAlternarLocal: (localId: string) => void;
  onLimparFiltros: () => void;
  onNavegarData: (direcao: 'anterior' | 'proximo') => void;
}

const SidebarCalendario = ({
  dataAtual,
  onMudarData,
  tipoVisualizacao,
  onMudarTipoVisualizacao,
  locais,
  locaisSelecionados,
  onAlternarLocal,
  onLimparFiltros,
  onNavegarData
}: SidebarCalendarioProps) => {
  const { open } = useSidebar();

  const obterTituloData = () => {
    switch (tipoVisualizacao) {
      case 'mes':
        return dataAtual.toLocaleDateString('pt-BR', { 
          year: 'numeric', 
          month: 'long' 
        });
      case 'semana':
        const inicioSemana = new Date(dataAtual);
        inicioSemana.setDate(dataAtual.getDate() - dataAtual.getDay());
        const fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6);
        return `${inicioSemana.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} - ${fimSemana.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}`;
      case 'dia':
        return dataAtual.toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'agenda':
        return 'Lista de Eventos';
      default:
        return '';
    }
  };

  return (
    <Sidebar className={open ? "w-80" : "w-16"} collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {open && <span className="font-semibold">Agenda</span>}
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-4">
        {open && (
          <>
            {/* Navegação de Data */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavegarData('anterior')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle className="text-sm font-medium text-center flex-1">
                    {obterTituloData()}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavegarData('proximo')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Seletor de Visualização */}
            <SeletorVisualizacao
              tipoAtual={tipoVisualizacao}
              onMudarTipo={onMudarTipoVisualizacao}
            />

            {/* Mini Calendário */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Calendário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={dataAtual}
                  onSelect={(data) => data && onMudarData(data)}
                  className="rounded-md border-0 p-0 pointer-events-auto"
                  classNames={{
                    months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                    month: "space-y-4 w-full flex flex-col",
                    table: "w-full h-full border-collapse space-y-1",
                    head_row: "",
                    row: "w-full mt-2",
                  }}
                />
              </CardContent>
            </Card>

            <Separator />

            {/* Filtros de Locais */}
            <FiltroLocaisMultiple
              locais={locais}
              locaisSelecionados={locaisSelecionados}
              onAlternarLocal={onAlternarLocal}
              onLimparFiltros={onLimparFiltros}
            />
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarCalendario;
