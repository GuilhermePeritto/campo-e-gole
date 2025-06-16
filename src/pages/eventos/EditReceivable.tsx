
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

const EditReceivable = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    dueDate: '',
    description: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#client',
      title: 'Cliente',
      content: 'Atualize o nome do cliente responsável por esta conta a receber.'
    },
    {
      target: '#amount',
      title: 'Valor',
      content: 'Altere o valor da conta a receber se necessário.'
    },
    {
      target: '#dueDate',
      title: 'Data de Vencimento',
      content: 'Atualize a data de vencimento conforme acordado com o cliente.'
    },
    {
      target: '#description',
      title: 'Descrição',
      content: 'Modifique ou adicione detalhes sobre esta conta a receber.'
    }
  ];

  useEffect(() => {
    // Simular carregamento dos dados da conta
    const mockData = {
      client: 'João Silva',
      amount: '150',
      dueDate: '2024-06-10',
      description: 'Reserva Quadra A - 08/06'
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da conta atualizados:', formData);
    // Aqui seria feita a atualização no backend
    navigate('/eventos/contas-a-receber');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BaseFormPage
      title="Editar Conta a Receber"
      description="Altere as informações da conta a receber conforme necessário"
      icon={<CreditCard className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/contas-a-receber"
      backLabel="Contas a Receber"
      onSubmit={handleSubmit}
      submitLabel="Salvar Alterações"
      tourSteps={tourSteps}
      tourTitle="Edição de Conta a Receber"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações da Conta</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="client" className="text-sm font-medium">Cliente *</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => handleChange('client', e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">Valor (R$) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="dueDate" className="text-sm font-medium">Data de Vencimento *</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="h-11"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">Descrição *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Descrição da conta a receber..."
          rows={3}
          className="resize-none"
          required
        />
      </div>
    </BaseFormPage>
  );
};

export default EditReceivable;
