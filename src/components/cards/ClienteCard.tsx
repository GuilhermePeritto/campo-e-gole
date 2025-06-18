
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Eye, Mail, Phone, Users } from 'lucide-react';

interface ClienteCardProps {
  cliente: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    tipo: string;
    situacao: 'Ativo' | 'Inativo' | 'Pendente';
    dataCadastro: string;
  };
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

const ClienteCard = ({ cliente, onEdit, onView }: ClienteCardProps) => {
  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Inativo': return 'bg-red-100 text-red-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle className="text-lg">{cliente.nome}</CardTitle>
              <CardDescription className="text-sm">{cliente.tipo}</CardDescription>
            </div>
          </div>
          <Badge className={`px-2 py-1 rounded-full text-xs font-medium ${getSituacaoColor(cliente.situacao)}`}>
            {cliente.situacao}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{cliente.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{cliente.telefone}</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Cliente desde {new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}
        </div>

        <div className="flex gap-2 pt-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onView(cliente.id)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(cliente.id)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClienteCard;
