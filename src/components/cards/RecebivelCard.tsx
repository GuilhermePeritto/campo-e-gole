
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CreditCard, DollarSign, Edit, User } from 'lucide-react';

interface RecebivelCardProps {
  recebivel: {
    id: number;
    client: string;
    description: string;
    dueDate: string;
    amount: number;
    status: string;
    installment: string;
  };
  onEdit: (id: number) => void;
}

const RecebivelCard = ({ recebivel, onEdit }: RecebivelCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'vencido': return 'bg-red-100 text-red-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pago': return 'Pago';
      case 'vencido': return 'Vencido';
      case 'pendente': return 'Pendente';
      default: return status;
    }
  };

  const isOverdue = status => {
    if (status === 'vencido') return true;
    if (status === 'pendente') {
      const today = new Date();
      const dueDate = new Date(recebivel.dueDate);
      return dueDate < today;
    }
    return false;
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-200 ${isOverdue(recebivel.status) ? 'border-red-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-orange-600" />
            <div>
              <CardTitle className="text-lg">R$ {recebivel.amount.toFixed(2)}</CardTitle>
              <CardDescription className="text-sm">Parcela {recebivel.installment}</CardDescription>
            </div>
          </div>
          <Badge className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(recebivel.status)}`}>
            {getStatusLabel(recebivel.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{recebivel.client}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Vence em {new Date(recebivel.dueDate).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {recebivel.description}
        </div>

        <div className="pt-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(recebivel.id)}
            className="w-full"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecebivelCard;
