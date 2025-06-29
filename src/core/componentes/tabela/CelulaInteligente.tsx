
import { Badge } from '@/components/ui/badge';
import { detectarTipoDado } from '@/core/hooks/useUtilsTabela';
import { CalendarDays, Check, Mail, Phone, X } from 'lucide-react';

interface PropsCelulaInteligente {
  valor: any;
  tipo?: string;
  chaveColuna?: string;
}

const CelulaInteligente = ({ valor, tipo, chaveColuna }: PropsCelulaInteligente) => {
  if (valor === null || valor === undefined || valor === '') {
    return <span className="text-muted-foreground">—</span>;
  }

  const tipoDetectado = tipo || detectarTipoDado(valor);
  const valorString = String(valor);

  switch (tipoDetectado) {
    case 'booleano':
      const valorBool = typeof valor === 'boolean' ? valor : 
                      ['true', 'ativo', 'sim', '1'].includes(valorString.toLowerCase());
      return (
        <Badge variant={valorBool ? 'default' : 'secondary'} className="gap-1">
          {valorBool ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
          {valorBool ? 'Sim' : 'Não'}
        </Badge>
      );

    case 'data':
      try {
        const data = valor instanceof Date ? valor : new Date(valor);
        if (isNaN(data.getTime())) throw new Error('Data inválida');
        return (
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            {data.toLocaleDateString('pt-BR')}
          </div>
        );
      } catch {
        return <span>{valorString}</span>;
      }

    case 'dataHora':
      try {
        const data = valor instanceof Date ? valor : new Date(valor);
        if (isNaN(data.getTime())) throw new Error('Data inválida');
        return (
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            {data.toLocaleDateString('pt-BR')} {data.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        );
      } catch {
        return <span>{valorString}</span>;
      }

    case 'moeda':
      const valorNum = typeof valor === 'number' ? valor : parseFloat(valorString.replace(/[^\d.-]/g, ''));
      if (isNaN(valorNum)) return <span>{valorString}</span>;
      return (
        <span className="font-medium">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(valorNum)}
        </span>
      );

    case 'numero':
      const num = typeof valor === 'number' ? valor : parseFloat(valorString);
      if (isNaN(num)) return <span>{valorString}</span>;
      return (
        <span className="font-mono">
          {new Intl.NumberFormat('pt-BR').format(num)}
        </span>
      );

    case 'email':
      return (
        <a 
          href={`mailto:${valorString}`}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Mail className="h-4 w-4" />
          {valorString}
        </a>
      );

    case 'telefone':
      const telefoneClean = valorString.replace(/[^\d]/g, '');
      const telefoneFormatado = telefoneClean.length === 11 
        ? `(${telefoneClean.slice(0,2)}) ${telefoneClean.slice(2,7)}-${telefoneClean.slice(7)}`
        : valorString;
      return (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          {telefoneFormatado}
        </div>
      );

    case 'url':
      return (
        <a 
          href={valorString} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {valorString}
        </a>
      );

    case 'status':
      const variantesStatus: Record<string, any> = {
        'ativo': 'default',
        'inativo': 'secondary',
        'pendente': 'outline',
        'aprovado': 'default',
        'rejeitado': 'destructive',
        'concluído': 'default',
        'cancelado': 'destructive',
        'pago': 'default',
        'vencido': 'destructive'
      };
      
      const variante = variantesStatus[valorString.toLowerCase()] || 'outline';
      return (
        <Badge variant={variante}>
          {valorString}
        </Badge>
      );

    default:
      return <span>{valorString}</span>;
  }
};

export default CelulaInteligente;
