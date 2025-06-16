import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginaFormularioBase from '@/core/componentes/PaginaFormularioBase';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import CampoBusca from '@/core/componentes/CampoBusca';
import CampoValor from '@/core/componentes/CampoValor';
import SeletorData from '@/core/componentes/SeletorData';

interface ReceivableFormData {
  client: string;
  description: string;
  amount: string;
  dueDate: Date | undefined;
}

const NovoRecebivel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ReceivableFormData>({
    client: '',
    description: '',
    amount: '',
    dueDate: new Date()
  });

  // Dados de exemplo para o campo de busca de clientes
  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
    { id: '4', label: 'Ana Oliveira', subtitle: 'CPF: 456.789.123-00' },
    { id: '5', label: 'Carlos Ferreira', subtitle: 'CPF: 789.123.456-00' },
  ];

  const tourSteps: TourStep[] = [
    {
      target: '#client',
      title: 'Campo de Busca de Cliente',
      content: 'Use este campo para buscar e selecionar o cliente. Digite o nome e selecione da lista que aparece.'
    },
    {
      target: '#amount',
      title: 'Campo de Valor',
      content: 'Este campo permite inserir valores monetários. Digite da direita para esquerda, como nos apps bancários.'
    },
    {
      target: '#dueDate',
      title: 'Seletor de Data',
      content: 'Selecione a data de vencimento com este calendário interativo. Por padrão, vem com a data de hoje.'
    },
    {
      target: '#description',
      title: 'Descrição',
      content: 'Descreva detalhadamente o motivo desta conta a receber (ex: Reserva Quadra A).'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova conta a receber:', formData);
    navigate('/eventos/contas-a-receber');
  };

  const handleClientChange = (value: string, item?: any) => {
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
    <PaginaFormularioBase
      title="Criar Nova Conta a Receber"
      description="Registre um novo valor a receber de clientes por serviços prestados ou reservas realizadas"
      icon={<CreditCard className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/contas-a-receber"
      backLabel="Contas a Receber"
      onSubmit={handleSubmit}
      submitLabel="Salvar Conta a Receber"
      tourSteps={tourSteps}
      tourTitle="Criação de Nova Conta a Receber"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações da Conta a Receber</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CampoBusca
            id="client"
            label="Cliente"
            value={formData.client}
            onChange={handleClientChange}
            opcoes={clientesExemplo}
            placeholder="Digite o nome do cliente..."
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
          placeholder="Descrição da conta (ex: Reserva Quadra A - 10/06)"
          value={formData.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          rows={3}
          className="resize-none"
          required
        />
      </div>
    </PaginaFormularioBase>
  );
};

export default NovoRecebivel;
