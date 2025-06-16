
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Users } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PaginaFormularioBase from '@/core/componentes/PaginaFormularioBase';
import CampoDocumento from '@/core/componentes/CampoDocumento';
import CampoTelefone from '@/core/componentes/CampoTelefone';
import CampoEmail from '@/core/componentes/CampoEmail';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

const EditarCliente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock data - em produção viria de uma API
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '11999999999',
    type: 'pessoa-fisica',
    document: '12345678900',
    address: 'Rua das Flores, 123, Centro, São Paulo',
    notes: 'Cliente preferencial'
  });

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Cliente',
      content: 'Atualize o nome completo do cliente conforme necessário.'
    },
    {
      target: '#type',
      title: 'Tipo de Cliente',
      content: 'Altere o tipo de cliente se houve mudança de pessoa física para jurídica ou vice-versa.'
    },
    {
      target: '#document',
      title: 'Documento',
      content: 'Atualize o CPF ou CNPJ do cliente se necessário.'
    },
    {
      target: '#phone',
      title: 'Telefone',
      content: 'Mantenha o telefone de contato sempre atualizado para comunicações importantes.'
    },
    {
      target: '#email',
      title: 'E-mail',
      content: 'Atualize o e-mail principal para envio de comunicados e comprovantes.'
    },
    {
      target: '#address',
      title: 'Endereço',
      content: 'Mantenha o endereço atualizado para correspondências e entregas.'
    },
    {
      target: '#notes',
      title: 'Observações',
      content: 'Adicione ou atualize informações importantes sobre o cliente.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e telefone.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Cliente atualizado!",
      description: `Dados de ${formData.name} foram atualizados.`,
    });
    navigate('/eventos/clientes');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <PaginaFormularioBase
      title="Editar Dados do Cliente"
      description="Atualize as informações do cliente"
      icon={<Users className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/clientes"
      backLabel="Clientes"
      onSubmit={handleSubmit}
      submitLabel="Salvar Alterações"
      tourSteps={tourSteps}
      tourTitle="Edição de Cliente"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Nome Completo *</Label>
            <Input
              id="name"
              placeholder="Ex: João da Silva"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">Tipo de Cliente</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger id="type" className="h-11">
                <SelectValue placeholder="Selecionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pessoa-fisica">Pessoa Física</SelectItem>
                <SelectItem value="pessoa-juridica">Pessoa Jurídica</SelectItem>
                <SelectItem value="clube">Clube/Equipe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CampoDocumento
            id="document"
            label={formData.type === 'pessoa-juridica' ? 'CNPJ' : 'CPF'}
            value={formData.document}
            onChange={(value) => handleInputChange('document', value)}
            tipo={formData.type === 'pessoa-juridica' ? 'cnpj' : 'cpf'}
          />

          <CampoTelefone
            id="phone"
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            required
          />

          <div className="md:col-span-2">
            <CampoEmail
              id="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">Endereço</Label>
            <Input
              id="address"
              placeholder="Rua, Número, Bairro, Cidade"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="h-11"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm font-medium">Observações</Label>
        <Textarea
          id="notes"
          className="resize-none"
          placeholder="Informações adicionais sobre o cliente..."
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={3}
        />
      </div>
    </PaginaFormularioBase>
  );
};

export default EditarCliente;
