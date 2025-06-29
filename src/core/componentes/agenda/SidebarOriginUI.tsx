
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { Calendar as CalendarIcon, X } from 'lucide-react';

interface Local {
  id: string;
  name: string;
  color: string;
}

interface SidebarOriginUIProps {
  dataAtual: Date;
  onMudarData: (data: Date) => void;
  locais: Local[];
  filtrosAtivos: string[];
  onAlternarFiltro: (localId: string) => void;
  sidebarAberto: boolean;
  onFecharSidebar: () => void;
}

const SidebarOriginUI = ({
  dataAtual,
  onMudarData,
  locais,
  filtrosAtivos,
  onAlternarFiltro,
  sidebarAberto,
  onFecharSidebar
}: SidebarOriginUIProps) => {
  const calendarios = [
    { id: 'my-events', name: 'Meus Eventos', color: '#3b82f6', count: 12 },
    { id: 'marketing', name: 'Marketing Team', color: '#ef4444', count: 8 },
    { id: 'development', name: 'Development', color: '#10b981', count: 15 },
    ...locais.map(local => ({
      id: local.id,
      name: local.name,
      color: local.color,
      count: Math.floor(Math.random() * 20) + 1
    }))
  ];

  return (
    <Sidebar className="w-80 border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <span className="font-semibold">Agenda</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onFecharSidebar}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        {/* Mini Calendário */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {dataAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={dataAtual}
              onSelect={(data) => data && onMudarData(data)}
              className="rounded-md border-0 p-0"
              classNames={{
                months: "flex w-full flex-col space-y-4",
                month: "space-y-4 w-full",
                table: "w-full border-collapse space-y-1",
                head_row: "",
                row: "w-full mt-2",
              }}
            />
          </CardContent>
        </Card>

        {/* Filtros de Calendários */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Calendários</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {calendarios.map((calendario) => (
              <div key={calendario.id} className="flex items-center space-x-3">
                <Checkbox
                  id={calendario.id}
                  checked={filtrosAtivos.includes(calendario.id) || filtrosAtivos.includes('all')}
                  onCheckedChange={() => onAlternarFiltro(calendario.id)}
                />
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: calendario.color }}
                  />
                  <label
                    htmlFor={calendario.id}
                    className="text-sm font-medium leading-none cursor-pointer flex-1"
                  >
                    {calendario.name}
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {calendario.count}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarOriginUI;
