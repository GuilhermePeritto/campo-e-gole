
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

interface ReceivableFormData {
  client: string;
  description: string;
  amount: string;
  dueDate: string;
}

const NewReceivable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ReceivableFormData>({
    client: '',
    description: '',
    amount: '',
    dueDate: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#client',
      title: 'Cliente',
      content: 'Digite o nome do cliente que será responsável por esta conta a receber.'
    },
    {
      target: '#amount',
      title: 'Valor',
      content: 'Insira o valor total da conta a receber em reais.'
    },
    {
      target: '#description',
      title: 'Descrição',
      content: 'Descreva detalhadamente o motivo desta conta a receber (ex: Reserva Quadra A).'
    },
    {
      target: '#dueDate',
      title: 'Data de Vencimento',
      content: 'Selecione a data limite para pagamento desta conta.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova conta a receber:', formData);
    navigate('/eventos/contas-a-receber');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BaseFormPage
      title="Criar Novo Recebível"
      description="Adicione um novo recebível manualmente"
      icon={<CreditCard className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/contas-a-receber"
      backLabel="Contas a Receber"
      onSubmit={handleSubmit}
      submitLabel="Salvar Recebível"
      tourSteps={tourSteps}
      tourTitle="Criação de Novo Recebível"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações do Recebível</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="client" className="text-sm font-medium">Cliente *</Label>
            <Input
              id="client"
              placeholder="Nome do cliente"
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
              placeholder="0,00"
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
          placeholder="Descrição da conta (ex: Reserva Quadra A - 10/06)"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          className="resize-none"
          required
        />
      </div>
    </BaseFormPage>
  );
};

export default NewReceivable;
