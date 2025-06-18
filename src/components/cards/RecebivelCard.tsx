
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, User, Calendar, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDateForDisplay } from '@/utils/dateUtils';

interface Recebivel {
  id: string;
  cliente: string;
  valor: string;
  dataVencimento: Date | string;
  status: 'Pendente' | 'Pago' | 'Vencido';
  descricao?: string;
}

interface RecebivelCardProps {
  recebivel: Recebivel;
  actions: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (recebivel: Recebivel) => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    className?: string;
  }>;
}

const RecebivelCard: React.FC<RecebivelCardProps> = ({ recebivel, actions }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Vencido': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isVencido = () => {
    const hoje = new Date();
    const vencimento = new Date(recebivel.dataVencimento);
    return vencimento < hoje && recebivel.status !== 'Pago';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border border-border/50 hover:border-border h-full">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base text-foreground line-clamp-1">
                R$ {recebivel.valor}
              </h3>
              <p className="text-sm text-muted-foreground">
                {recebivel.cliente}
              </p>
            </div>
          </div>
          <Badge className={cn("text-xs", getStatusColor(isVencido() ? 'Vencido' : recebivel.status))}>
            {isVencido() ? 'Vencido' : recebivel.status}
          </Badge>
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Vencimento:</span>
            <span className={cn("font-medium", isVencido() && "text-red-600")}>
              {formatDateForDisplay(recebivel.dataVencimento)}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Cliente:</span>
            <span className="font-medium truncate">{recebivel.cliente}</span>
          </div>
          
          {recebivel.descricao && (
            <div className="text-sm">
              <span className="text-muted-foreground">Descrição:</span>
              <p className="text-foreground mt-1 line-clamp-2">{recebivel.descricao}</p>
            </div>
          )}
        </div>

        {actions.length > 0 && (
          <div className="flex gap-2 mt-4 pt-3 border-t border-border/50">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={() => action.onClick(recebivel)}
                className={cn("flex-1 gap-1.5", action.className)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecebivelCard;
