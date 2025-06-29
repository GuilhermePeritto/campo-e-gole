
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CalendarDays, Clock, List } from 'lucide-react';
import { TipoVisualizacao } from '@/core/hooks/useAgenda';

interface SeletorVisualizacaoProps {
  tipoAtual: TipoVisualizacao;
  onMudarTipo: (tipo: TipoVisualizacao) => void;
}

const SeletorVisualizacao = ({ tipoAtual, onMudarTipo }: SeletorVisualizacaoProps) => {
  const opcoes = [
    {
      tipo: 'mes' as TipoVisualizacao,
      label: 'Mês',
      icon: Calendar,
      descricao: 'Visualização mensal'
    },
    {
      tipo: 'semana' as TipoVisualizacao,
      label: 'Semana',
      icon: CalendarDays,
      descricao: 'Visualização semanal'
    },
    {
      tipo: 'dia' as TipoVisualizacao,
      label: 'Dia',
      icon: Clock,
      descricao: 'Visualização diária'
    },
    {
      tipo: 'agenda' as TipoVisualizacao,
      label: 'Agenda',
      icon: List,
      descricao: 'Lista de eventos'
    }
  ];

  return (
    <Card>
      <CardContent className="p-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {opcoes.map((opcao) => {
            const IconComponent = opcao.icon;
            const isAtivo = tipoAtual === opcao.tipo;
            
            return (
              <Button
                key={opcao.tipo}
                variant={isAtivo ? "default" : "ghost"}
                size="sm"
                onClick={() => onMudarTipo(opcao.tipo)}
                className={`
                  flex flex-col items-center gap-1 h-auto py-2 px-3
                  ${isAtivo ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                `}
                title={opcao.descricao}
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-xs font-medium">{opcao.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeletorVisualizacao;
