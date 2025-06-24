
import BaseFormPage from '@/components/BaseFormPage';
import { TourStep } from '@/components/PageTour';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoDocumento from '@/core/componentes/CampoDocumento';
import CampoEmail from '@/core/componentes/CampoEmail';
import CampoTelefone from '@/core/componentes/CampoTelefone';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Cliente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: isEdit ? 'João Silva' : '',
    email: isEdit ? 'joao@email.com' : '',
    phone: isEdit ? '(11) 99999-9999' : '',
    document: isEdit ? '123.456.789-00' : '',
    documentType: isEdit ? 'cpf' : 'cpf',
    address: isEdit ? 'Rua das Flores, 123' : '',
    city: isEdit ? 'São Paulo' : '',
    state: isEdit ? 'SP' : '',
    zipCode: isEdit ? '01234-567' : '',
    notes: isEdit ? 'Cliente frequente, prefere horários noturnos' : ''
  });

  useEffect(() => {
    // Verificar se existe URL de retorno no sessionStorage
    const returnUrl = sessionStorage.getItem('returnUrl');
    if (returnUrl && !isEdit) {
      // Se estamos criando um novo cliente e existe URL de retorno, usar ela
      return;
    }
  }, [isEdit]);

  const tourSteps: TourStep[] = [
    {
      target: '[data-card="info-pessoais"]',
      title: 'Informações Pessoais',
      content: 'Preencha os dados pessoais do cliente.',
      placement: 'bottom'
    },
    {
      target: '#name',
      title: 'Nome Completo',
      content: 'Digite o nome completo do cliente.',
      placement: 'bottom'
    },
    {
      target: '[data-card="contato"]',
      title: 'Dados de Contato',
      content: 'Informe email e telefone para contato.',
      placement: 'top'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEdit ? 'Editando cliente:' : 'Criando cliente:', formData);
    
    // Verificar se existe URL de retorno
    const returnUrl = sessionStorage.getItem('returnUrl');
    if (returnUrl && !isEdit) {
      sessionStorage.removeItem('returnUrl');
      navigate(returnUrl);
    } else {
      navigate('/eventos/clientes');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formSections = [
    {
      id: 'info-pessoais',
      title: 'Informações Pessoais',
      alwaysOpen: true,
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: João Silva"
              required
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="documentType">Tipo de Documento</Label>
              <Select value={formData.documentType} onValueChange={(value) => handleChange('documentType', value)}>
                <SelectTrigger id="documentType" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="cnpj">CNPJ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CampoDocumento
              id="document"
              label={formData.documentType === 'cpf' ? 'CPF' : 'CNPJ'}
              value={formData.document}
              onChange={(value) => handleChange('document', value)}
              type={formData.documentType as 'cpf' | 'cnpj'}
              required
            />
          </div>
        </div>
      )
    },
    {
      id: 'contato',
      title: 'Dados de Contato',
      defaultOpen: false,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CampoEmail
            id="email"
            label="E-mail"
            value={formData.email}
            onChange={(value) => handleChange('email', value)}
            placeholder="cliente@email.com"
          />

          <CampoTelefone
            id="phone"
            label="Telefone"
            value={formData.phone}
            onChange={(value) => handleChange('phone', value)}
            placeholder="(11) 99999-9999"
          />
        </div>
      )
    },
    {
      id: 'endereco',
      title: 'Endereço',
      defaultOpen: false,
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Ex: Rua das Flores, 123"
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Ex: São Paulo"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="Ex: SP"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                placeholder="12345-678"
                className="h-11"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'observacoes',
      title: 'Observações',
      defaultOpen: false,
      content: (
        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Informações adicionais sobre o cliente..."
            rows={4}
          />
        </div>
      )
    }
  ];

  return (
    <BaseFormPage
      title={isEdit ? 'Editar Cliente' : 'Novo Cliente'}
      description={isEdit ? 'Edite as informações do cliente' : 'Cadastre um novo cliente'}
      icon={<User className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/clientes"
      backLabel="Clientes"
      onSubmit={handleSubmit}
      submitLabel={isEdit ? 'Salvar Alterações' : 'Cadastrar Cliente'}
      tourSteps={tourSteps}
      tourTitle={isEdit ? "Edição de Cliente" : "Cadastro de Cliente"}
      formSections={formSections}
    />
  );
};

export default Cliente;
