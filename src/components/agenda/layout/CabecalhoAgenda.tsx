import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, RefreshCw } from 'lucide-react';
import { memo, useMemo } from 'react';

interface CabecalhoAgendaProps {
  dataAtual: Date;
  tipoVisualizacao: 'mes' | 'semana' | 'dia' | 'lista';
  aoNavegarData: (direcao: 'anterior' | 'proxima') => void;
  aoClicarHoje: () => void;
  aoClicarNovoEvento: () => void;
  aoMudarTipoVisualizacao: (tipo: 'mes' | 'semana' | 'dia' | 'lista') => void;
  aoSincronizar?: () => void;
  sincronizando?: boolean;
}

const CabecalhoAgenda = memo(({
  dataAtual,
  tipoVisualizacao,
  aoNavegarData,
  aoClicarHoje,
  aoClicarNovoEvento,
  aoMudarTipoVisualizacao,
  aoSincronizar,
  sincronizando = false
}: CabecalhoAgendaProps) => {

  const titulo = useMemo(() => {
    switch (tipoVisualizacao) {
      case 'mes':
        return format(dataAtual, 'MMMM yyyy', { locale: ptBR });
      case 'semana':
        return format(dataAtual, "'Semana de' dd 'de' MMMM yyyy", { locale: ptBR });
      case 'dia':
        return format(dataAtual, "dd 'de' MMMM yyyy", { locale: ptBR });
      case 'lista':
        return format(dataAtual, 'MMMM yyyy', { locale: ptBR });
      default:
        return format(dataAtual, 'MMMM yyyy', { locale: ptBR });
    }
  }, [dataAtual, tipoVisualizacao]);

  const rotulosVisualizacao = {
    'mes': 'Mês',
    'semana': 'Semana',
    'dia': 'Dia',
    'lista': 'Lista'
  };

  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Lado esquerdo - Título e avatares */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-foreground">
            {titulo}
          </h1>
          {/* Avatar group */}
          <div className="flex -space-x-2">
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/avatar-40-16_zn3ygb.jpg" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/avatar-40-10_qyybkj.jpg" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/avatar-40-15_fguzbs.jpg" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/avatar-40-11_jtjhsp.jpg" />
              <AvatarFallback>U4</AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Lado direito - Controles */}
        <div className="flex items-center space-x-2">
          {/* Navegação */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                console.log('Botão anterior clicado');
                aoNavegarData('anterior');
              }}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                console.log('Botão hoje clicado');
                aoClicarHoje();
              }}
              className="h-9 px-3"
            >
              Hoje
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                console.log('Botão próximo clicado');
                aoNavegarData('proxima');
              }}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {/* Novo Evento */}
          <Button
            onClick={aoClicarNovoEvento}
            className="h-9 px-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
          {/* Seletor de Visualização */}
          <Select value={tipoVisualizacao} onValueChange={aoMudarTipoVisualizacao}>
            <SelectTrigger className="w-24 h-9">
              <SelectValue>{rotulosVisualizacao[tipoVisualizacao]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes">Mês</SelectItem>
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="dia">Dia</SelectItem>
              <SelectItem value="lista">Lista</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Botão de Sincronizar */}
          <Button
            variant="outline"
            size="icon"
            onClick={aoSincronizar}
            disabled={sincronizando}
            className="h-9 w-9"
            title="Sincronizar dados"
          >
            <RefreshCw className={`h-4 w-4 ${sincronizando ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
});

CabecalhoAgenda.displayName = 'CabecalhoAgenda';

export default CabecalhoAgenda;