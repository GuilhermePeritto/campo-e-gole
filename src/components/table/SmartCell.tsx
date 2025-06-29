
import { Badge } from '@/components/ui/badge';
import { detectDataType } from '@/utils/tableUtils';
import { CalendarDays, Check, Mail, Phone, X } from 'lucide-react';

interface SmartCellProps {
  value: any;
  type?: string;
  columnKey?: string;
}

const SmartCell = ({ value, type, columnKey }: SmartCellProps) => {
  if (value === null || value === undefined || value === '') {
    return <span className="text-muted-foreground">—</span>;
  }

  const detectedType = type || detectDataType(value);
  const stringValue = String(value);

  switch (detectedType) {
    case 'boolean':
      const boolValue = typeof value === 'boolean' ? value : 
                      ['true', 'ativo', 'sim', '1'].includes(stringValue.toLowerCase());
      return (
        <Badge variant={boolValue ? 'default' : 'secondary'} className="gap-1">
          {boolValue ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
          {boolValue ? 'Sim' : 'Não'}
        </Badge>
      );

    case 'date':
      try {
        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) throw new Error('Invalid date');
        return (
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            {date.toLocaleDateString('pt-BR')}
          </div>
        );
      } catch {
        return <span>{stringValue}</span>;
      }

    case 'datetime':
      try {
        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) throw new Error('Invalid date');
        return (
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            {date.toLocaleDateString('pt-BR')} {date.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        );
      } catch {
        return <span>{stringValue}</span>;
      }

    case 'currency':
      const numValue = typeof value === 'number' ? value : parseFloat(stringValue.replace(/[^\d.-]/g, ''));
      if (isNaN(numValue)) return <span>{stringValue}</span>;
      return (
        <span className="font-medium">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(numValue)}
        </span>
      );

    case 'number':
      const num = typeof value === 'number' ? value : parseFloat(stringValue);
      if (isNaN(num)) return <span>{stringValue}</span>;
      return (
        <span className="font-mono">
          {new Intl.NumberFormat('pt-BR').format(num)}
        </span>
      );

    case 'email':
      return (
        <a 
          href={`mailto:${stringValue}`}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Mail className="h-4 w-4" />
          {stringValue}
        </a>
      );

    case 'phone':
      const cleanPhone = stringValue.replace(/[^\d]/g, '');
      const formattedPhone = cleanPhone.length === 11 
        ? `(${cleanPhone.slice(0,2)}) ${cleanPhone.slice(2,7)}-${cleanPhone.slice(7)}`
        : stringValue;
      return (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          {formattedPhone}
        </div>
      );

    case 'url':
      return (
        <a 
          href={stringValue} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {stringValue}
        </a>
      );

    case 'status':
      const statusVariants: Record<string, any> = {
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
      
      const variant = statusVariants[stringValue.toLowerCase()] || 'outline';
      return (
        <Badge variant={variant}>
          {stringValue}
        </Badge>
      );

    default:
      return <span>{stringValue}</span>;
  }
};

export default SmartCell;
