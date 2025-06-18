import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import CampoEmail from '@/core/componentes/CampoEmail';
import CampoTelefone from '@/core/componentes/CampoTelefone';
import CampoDocumento from '@/core/componentes/CampoDocumento';
import BaseFormPage from '@/components/BaseFormPage';

const Cliente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    nome: isEdit ? 'João Silva' : '',
    email: isEdit ? 'joao@email.com' : '',
    telefone: isEdit ? '(11) 99999-1111' : '',
    documento: isEdit ? '123.456.789-00' : '',
    tipoDocumento: 'cpf' as 'cpf' | 'cnpj',
    tipo: isEdit ? 'Pessoa Física' : 'Pessoa Física',
    situacao: isEdit ? 'Ativo' : 'Ativo',
    endereco: isEdit ? 'Rua das Flores, 123' : '',
    cidade: isEdit ? 'São Paulo' : '',
    cep: isEdit ? '01234-567' : '',
    observacoes: isEdit ? 'Cliente regular, sempre pontual nos pagamentos.' : ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '[data-card="info-basicas"]',
      title: 'Informações Básicas',
      content: 'Este card contém os dados principais do cliente como nome, documento e tipo.',
      placement: 'bottom'
    },
    {
      target: '#nome',
      title: 'Nome do Cliente',
      content: 'Digite o nome completo do cliente ou razão social da empresa.',
      placement: 'bottom'
    },
    {
      target: '[data-card="contato"]',
      title: 'Informações de Contato',
      content: 'Adicione informações de contato para comunicação.',
      placement: 'bottom'
    },
    {
      target: '[data-card="endereco"]',
      title: 'Endereço',
      content: 'Cadastre o endereço completo do cliente.',
      placement: 'top'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEdit ? 'Editando cliente:' : 'Criando cliente:', formData);
    navigate('/eventos/clientes');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formSections = [
    {
      id: 'info-basicas',
      title: 'Informações Básicas',
      alwaysOpen: true, // This card will always be open
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome/Razão Social *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Nome do cliente ou empresa"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <CampoDocumento
              id="documento"
              label="CPF/CNPJ"
              value={formData.documento}
              onChange={(value) => handleChange('documento', value)}
              tipo={formData.tipoDocumento}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Cliente *</Label>
            <Select value={formData.tipo} onValueChange={(value) => handleChange('tipo', value)}>
              <SelectTrigger id="tipo" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pessoa Física">Pessoa Física</SelectItem>
                <SelectItem value="Pessoa Jurídica">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="situacao">Situação</Label>
            <Select value={formData.situacao} onValueChange={(value) => handleChange('situacao', value)}>
              <SelectTrigger id="situacao" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      id: 'contato',
      title: 'Informações de Contato',
      defaultOpen: false,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CampoEmail
            id="email"
            label="E-mail"
            value={formData.email}
            onChange={(value) => handleChange('email', value)}
            required
          />

          <CampoTelefone
            id="telefone"
            label="Telefone"
            value={formData.telefone}
            onChange={(value) => handleChange('telefone', value)}
            required
          />
        </div>
      )
    },
    {
      id: 'endereco',
      title: 'Endereço',
      defaultOpen: false,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => handleChange('endereco', e.target.value)}
              placeholder="Rua, número, complemento"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              id="cidade"
              value={formData.cidade}
              onChange={(e) => handleChange('cidade', e.target.value)}
              placeholder="Nome da cidade"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input
              id="cep"
              value={formData.cep}
              onChange={(e) => handleChange('cep', e.target.value)}
              placeholder="00000-000"
              className="h-11"
            />
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
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            value={formData.observacoes}
            onChange={(e) => handleChange('observacoes', e.target.value)}
            placeholder="Observações sobre o cliente..."
            rows={3}
          />
        </div>
      )
    }
  ];

  return (
    <BaseFormPage
      title={isEdit ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
      description={isEdit ? 'Edite as informações do cliente' : 'Registre um novo cliente no sistema'}
      icon={<Users className="h-5 w-5" />}
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
