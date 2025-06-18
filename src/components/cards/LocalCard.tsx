
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Clock, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Local {
  id: string;
  nome: string;
  tipo: string;
  capacidade?: number;
  valorHora?: string;
  situacao: 'Ativo' | 'Inativo' | 'Manutenção';
  descricao?: string;
}

interface LocalCardProps {
  local: Local;
  actions: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (local: Local) => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    className?: string;
  }>;
}

const LocalCard: React.FC<LocalCardProps> = ({ local, actions }) => {
  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'Ativo': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inativo': return 'bg-red-100 text-red-800 border-red-200';
      case 'Manutenção': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border border-border/50 hover:border-border h-full">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base text-foreground line-clamp-1">
                {local.nome}
              </h3>
              <p className="text-sm text-muted-foreground">
                {local.tipo}
              </p>
            </div>
          </div>
          <Badge className={cn("text-xs", getSituacaoColor(local.situacao))}>
            {local.situacao}
          </Badge>
        </div>

        <div className="space-y-3 flex-1">
          {local.capacidade && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">Capacidade:</span>
              <span className="font-medium">{local.capacidade} pessoas</span>
            </div>
          )}
          
          {local.valorHora && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">Valor/hora:</span>
              <span className="font-medium">R$ {local.valorHora}</span>
            </div>
          )}
          
          {local.descricao && (
            <div className="text-sm">
              <span className="text-muted-foreground">Descrição:</span>
              <p className="text-foreground mt-1 line-clamp-2">{local.descricao}</p>
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
                onClick={() => action.onClick(local)}
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

export default LocalCard;
