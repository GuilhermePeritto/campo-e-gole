
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { memo } from 'react';

interface CabecalhoDiaAgendaProps {
  data: string;
  quantidadeEventos: number;
}

const CabecalhoDiaAgenda = memo(({ data, quantidadeEventos }: CabecalhoDiaAgendaProps) => {
  const dataObj = parseISO(data);

  return (
    <div className="flex items-center justify-between border-b border-border/50 pb-3">
      <div className="flex items-center space-x-3">
        <h3 className="text-lg font-semibold text-foreground">
          {format(dataObj, "dd 'de' MMMM", { locale: ptBR })}
        </h3>
        <span className="text-sm text-muted-foreground capitalize">
          {format(dataObj, 'EEEE', { locale: ptBR })}
        </span>
      </div>
      <Badge variant="outline" className="bg-muted/50">
        {quantidadeEventos} {quantidadeEventos === 1 ? 'evento' : 'eventos'}
      </Badge>
    </div>
  );
});

CabecalhoDiaAgenda.displayName = 'CabecalhoDiaAgenda';

export default CabecalhoDiaAgenda;
