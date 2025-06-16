
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import CampoBusca from '@/core/componentes/CampoBusca';
import CampoValor from '@/core/componentes/CampoValor';
import SeletorData from '@/core/componentes/SeletorData';

const EditarRecebivel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    dueDate: undefined as Date | undefined,
    description: ''
  });

  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
  ];

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
      dueDate: new Date('2024-06-10'),
      description: 'Reserva Quadra A - 08/06'
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da conta atualizados:', formData);
    navigate('/eventos/contas-a-receber');
  };

  const handleClientChange = (value: string) => {
    setFormData(prev => ({ ...prev, client: value }));
  };

  const handleAmountChange = (value: string) => {
    setFormData(prev => ({ ...prev, amount: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dueDate: date }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
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
          <CampoBusca
            id="client"
            label="Cliente"
            value={formData.client}
            onChange={handleClientChange}
            opcoes={clientesExemplo}
            required
          />

          <CampoValor
            id="amount"
            label="Valor"
            value={formData.amount}
            onChange={handleAmountChange}
            required
          />

          <div className="md:col-span-2">
            <SeletorData
              id="dueDate"
              label="Data de Vencimento"
              value={formData.dueDate}
              onChange={handleDateChange}
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
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Descrição da conta a receber..."
          rows={3}
          className="resize-none"
          required
        />
      </div>
    </BaseFormPage>
  );
};

export default EditarRecebivel;
