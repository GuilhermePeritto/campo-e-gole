
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Menu } from 'lucide-react';

interface HeaderAgendaProps {
  dataAtual: Date;
  onNavegarSemana: (direcao: 'anterior' | 'proximo') => void;
  onAlternarSidebar: () => void;
  onNovoEvento: () => void;
}

const HeaderAgenda = ({
  dataAtual,
  onNavegarSemana,
  onAlternarSidebar,
  onNovoEvento
}: HeaderAgendaProps) => {
  const obterTituloSemana = () => {
    const mes = dataAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    const semanaDoMes = Math.ceil(dataAtual.getDate() / 7);
    return `${mes} / S${semanaDoMes}`;
  };

  const irParaHoje = () => {
    // Implementar navegação para hoje
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onAlternarSidebar}
          className="lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavegarSemana('anterior')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h1 className="text-xl font-semibold text-foreground min-w-[200px]">
            {obterTituloSemana()}
          </h1>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavegarSemana('proximo')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={irParaHoje}
        >
          Hoje
        </Button>
        
        <Button
          size="sm"
          onClick={onNovoEvento}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Evento
        </Button>
      </div>
    </div>
  );
};

export default HeaderAgenda;
