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

interface ReceivableFormData {
  client: string;
  description: string;
  amount: string;
  dueDate: Date | undefined;
}

const Recebivel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

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
      target: '[data-card="info-basicas"]',
      title: 'Informações Básicas',
      content: 'Este card contém os dados principais da conta a receber como cliente e valor.',
      placement: 'bottom'
    },
    {
      target: '#client',
      title: 'Campo de Busca de Cliente',
      content: 'Use este campo para buscar e selecionar o cliente. Digite o nome e selecione da lista que aparece.',
      placement: 'bottom'
    },
    {
      target: '#amount',
      title: 'Campo de Valor',
      content: 'Este campo permite inserir valores monetários. Digite da direita para esquerda, como nos apps bancários.',
      placement: 'bottom'
    },
    {
      target: '[data-card="detalhes"]',
      title: 'Detalhes',
      content: 'Aqui você pode adicionar informações complementares sobre a conta a receber.',
      placement: 'top'
    }
  ];

  useEffect(() => {
    if (isEdit) {
      // Simular carregamento dos dados da conta
      const mockData = {
        client: 'João Silva',
        amount: '150',
        dueDate: new Date('2024-06-10'),
        description: 'Reserva Quadra A - 08/06'
      };
      setFormData(mockData);
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEdit ? 'Dados da conta atualizados:' : 'Nova conta a receber:', formData);
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

  const formSections = [
    {
      id: 'info-basicas',
      title: 'Informações Básicas',
      alwaysOpen: true, // This card will always be open
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CampoBusca
            id="client"
            label="Cliente"
            value={formData.client}
            onChange={handleClientChange}
            items={clientesExemplo}
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
      )
    },
    {
      id: 'detalhes',
      title: 'Detalhes',
      defaultOpen: false,
      content: (
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">Descrição *</Label>
          <Textarea
            id="description"
            placeholder={isEdit ? "Descrição da conta a receber..." : "Descrição da conta (ex: Reserva Quadra A - 10/06)"}
            value={formData.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            rows={3}
            className="resize-none"
            required
          />
        </div>
      )
    }
  ];

  return (
    <BaseFormPage
      title={isEdit ? "Editar Conta a Receber" : "Criar Nova Conta a Receber"}
      description={isEdit ? "Altere as informações da conta a receber conforme necessário" : "Registre um novo valor a receber de clientes por serviços prestados ou reservas realizadas"}
      icon={<CreditCard className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/contas-a-receber"
      backLabel="Contas a Receber"
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Salvar Alterações" : "Salvar Conta a Receber"}
      tourSteps={tourSteps}
      tourTitle={isEdit ? "Edição de Conta a Receber" : "Criação de Nova Conta a Receber"}
      formSections={formSections}
    />
  );
};

export default Recebivel;
