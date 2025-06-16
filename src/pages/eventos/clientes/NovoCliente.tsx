
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginaFormularioBase from '@/core/componentes/PaginaFormularioBase';
import CampoDocumento from '@/core/componentes/CampoDocumento';
import CampoTelefone from '@/core/componentes/CampoTelefone';
import CampoEmail from '@/core/componentes/CampoEmail';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

const NovoCliente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'pessoa-fisica',
    document: '',
    email: '',
    phone: '',
    address: '',
    observations: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Cliente',
      content: 'Digite o nome completo do cliente ou razão social da empresa que será cadastrada.'
    },
    {
      target: '#type',
      title: 'Tipo de Cliente',
      content: 'Selecione se é Pessoa Física (CPF) ou Pessoa Jurídica (CNPJ) para adequar os campos de documento.'
    },
    {
      target: '#document',
      title: 'Documento (CPF/CNPJ)',
      content: 'Digite o CPF (para pessoa física) ou CNPJ (para pessoa jurídica) do cliente.'
    },
    {
      target: '#email',
      title: 'E-mail de Contato',
      content: 'E-mail principal do cliente para comunicações e envio de comprovantes.'
    },
    {
      target: '#phone',
      title: 'Telefone de Contato',
      content: 'Número de telefone principal para contato com o cliente. Campo obrigatório.'
    },
    {
      target: '#address',
      title: 'Endereço Completo',
      content: 'Endereço completo do cliente incluindo rua, número, bairro, cidade e CEP.'
    },
    {
      target: '#observations',
      title: 'Observações',
      content: 'Campo opcional para informações adicionais sobre o cliente ou preferências especiais.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo cliente:', formData);
    navigate('/eventos/clientes');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <PaginaFormularioBase
      title="Cadastrar Novo Cliente"
      description="Registre um novo cliente no sistema de eventos"
      icon={<UserPlus className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/clientes"
      backLabel="Clientes"
      onSubmit={handleSubmit}
      submitLabel="Salvar Cliente"
      tourSteps={tourSteps}
      tourTitle="Cadastro de Novo Cliente"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome/Razão Social *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Nome completo ou razão social"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Cliente *</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pessoa-fisica">Pessoa Física</SelectItem>
                <SelectItem value="pessoa-juridica">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CampoDocumento
            id="document"
            label={formData.type === 'pessoa-juridica' ? 'CNPJ' : 'CPF'}
            value={formData.document}
            onChange={(value) => handleChange('document', value)}
            tipo={formData.type === 'pessoa-juridica' ? 'cnpj' : 'cpf'}
          />

          <CampoTelefone
            id="phone"
            value={formData.phone}
            onChange={(value) => handleChange('phone', value)}
            required
          />

          <div className="md:col-span-2">
            <CampoEmail
              id="email"
              value={formData.email}
              onChange={(value) => handleChange('email', value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Endereço Completo</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Rua, número, bairro, cidade, CEP..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="observations">Observações</Label>
        <Textarea
          id="observations"
          value={formData.observations}
          onChange={(e) => handleChange('observations', e.target.value)}
          placeholder="Observações adicionais sobre o cliente..."
          rows={3}
        />
      </div>
    </PaginaFormularioBase>
  );
};

export default NovoCliente;
