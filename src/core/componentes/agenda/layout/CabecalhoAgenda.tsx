
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { memo, useMemo } from 'react';

interface CabecalhoAgendaProps {
  dataAtual: Date;
  tipoVisualizacao: 'month' | 'week' | 'day' | 'agenda';
  onNavegarData: (direcao: 'prev' | 'next') => void;
  onCliqueHoje: () => void;
  onNovoEvento: () => void;
  onMudancaTipoVisualizacao: (tipo: 'month' | 'week' | 'day' | 'agenda') => void;
}

const CabecalhoAgenda = memo(({
  dataAtual,
  tipoVisualizacao,
  onNavegarData,
  onCliqueHoje,
  onNovoEvento,
  onMudancaTipoVisualizacao
}: CabecalhoAgendaProps) => {
  const tituloData = useMemo(() => {
    switch (tipoVisualizacao) {
      case 'month':
        return format(dataAtual, 'MMMM yyyy', { locale: ptBR });
      case 'week':
        return format(dataAtual, "'Semana de' dd MMM yyyy", { locale: ptBR });
      case 'day':
        return format(dataAtual, 'dd \'de\' MMMM yyyy', { locale: ptBR });
      case 'agenda':
        return format(dataAtual, 'MMMM yyyy', { locale: ptBR });
      default:
        return format(dataAtual, 'MMMM yyyy', { locale: ptBR });
    }
  }, [dataAtual, tipoVisualizacao]);

  const obterLabelTipoVisualizacao = useMemo(() => {
    const labels = {
      'month': 'Mensal',
      'week': 'Semanal', 
      'day': 'Diário',
      'agenda': 'Agenda'
    };
    return (tipo: string) => labels[tipo as keyof typeof labels] || 'Mensal';
  }, []);

  return (
    <div className="fundo-gradiente-para-r from-background via-background to-muted/30 borda-b borda-divisor/50 sombra-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Lado Esquerdo - Navegação de Data */}
          <div className="flex items-center espaco-x-6">
            <div className="flex items-center espaco-x-3">
              <Clock className="h-5 w-5 texto-primario" />
              <h1 className="texto-xl fonte-bold texto-principal min-w-[200px] capitalize">
                {tituloData}
              </h1>
            </div>
          </div>

          {/* Lado Direito - Controles */}
          <div className="flex items-center espaco-x-4">
            {/* Navegação de Data */}
            <div className="flex items-center espaco-x-1 fundo-mutado/50 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavegarData('prev')}
                className="h-8 w-8 hover:bg-background/80 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                onClick={onCliqueHoje}
                className="h-8 px-3 hover:bg-background/80 transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Hoje
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavegarData('next')}
                className="h-8 w-8 hover:bg-background/80 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-8" />

            {/* Seletor de Visualização */}
            <Select value={tipoVisualizacao} onValueChange={onMudancaTipoVisualizacao}>
              <SelectTrigger className="w-36 h-9 fundo-fundo/50 borda-divisor/50">
                <SelectValue>
                  {obterLabelTipoVisualizacao(tipoVisualizacao)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Mensal</SelectItem>
                <SelectItem value="week">Semanal</SelectItem>
                <SelectItem value="day">Diário</SelectItem>
                <SelectItem value="agenda">Agenda</SelectItem>
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-8" />

            {/* Botão Novo Evento */}
            <Button
              onClick={onNovoEvento}
              className="h-9 px-4 fundo-primario hover:bg-primary/90 texto-primario-primeiro sombra-sm transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

CabecalhoAgenda.displayName = 'CabecalhoAgenda';

export default CabecalhoAgenda;
