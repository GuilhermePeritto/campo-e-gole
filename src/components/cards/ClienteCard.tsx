
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Cliente {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  documento?: string;
  tipo: 'Pessoa Física' | 'Pessoa Jurídica';
  situacao: 'Ativo' | 'Inativo' | 'Pendente';
  cidade?: string;
}

interface ClienteCardProps {
  cliente: Cliente;
  actions: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (cliente: Cliente) => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    className?: string;
  }>;
}

const ClienteCard: React.FC<ClienteCardProps> = ({ cliente, actions }) => {
  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'Ativo': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inativo': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border border-border/50 hover:border-border h-full">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base text-foreground line-clamp-1">
                {cliente.nome}
              </h3>
              <p className="text-sm text-muted-foreground">
                {cliente.tipo}
              </p>
            </div>
          </div>
          <Badge className={cn("text-xs", getSituacaoColor(cliente.situacao))}>
            {cliente.situacao}
          </Badge>
        </div>

        <div className="space-y-3 flex-1">
          {cliente.documento && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground min-w-0">Doc:</span>
              <span className="font-medium truncate">{cliente.documento}</span>
            </div>
          )}
          
          {cliente.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{cliente.email}</span>
            </div>
          )}
          
          {cliente.telefone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{cliente.telefone}</span>
            </div>
          )}
          
          {cliente.cidade && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{cliente.cidade}</span>
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
                onClick={() => action.onClick(cliente)}
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

export default ClienteCard;
