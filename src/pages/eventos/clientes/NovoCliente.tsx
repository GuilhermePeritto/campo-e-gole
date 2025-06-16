import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Users } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

const NovoCliente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'pessoa-fisica',
    document: '',
    address: '',
    notes: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Cliente',
      content: 'Informe o nome completo do cliente.'
    },
    {
      target: '#type',
      title: 'Tipo de Cliente',
      content: 'Selecione o tipo de cliente: Pessoa Física, Jurídica ou Clube/Equipe.'
    },
    {
      target: '#document',
      title: 'Documento',
      content: 'Informe o CPF ou CNPJ do cliente.'
    },
    {
      target: '#phone',
      title: 'Telefone',
      content: 'Informe o número de telefone para contato.'
    },
    {
      target: '#email',
      title: 'E-mail',
      content: 'Informe o endereço de e-mail do cliente.'
    },
    {
      target: '#address',
      title: 'Endereço',
      content: 'Informe o endereço completo do cliente.'
    },
    {
      target: '#notes',
      title: 'Observações',
      content: 'Adicione informações adicionais relevantes sobre o cliente.'
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
      title: "Cliente criado!",
      description: `Novo cliente ${formData.name} foi adicionado.`,
    });
    navigate('/eventos/clientes');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BaseFormPage
      title="Novo Cliente"
      description="Adicione um novo cliente ao sistema"
      icon={<Users className="h-5 w-5" />}
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
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">Telefone *</Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
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

          <div className="space-y-2">
            <Label htmlFor="document" className="text-sm font-medium">CPF/CNPJ</Label>
            <Input
              id="document"
              placeholder="000.000.000-00"
              value={formData.document}
              onChange={(e) => handleInputChange('document', e.target.value)}
              className="h-11"
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
    </BaseFormPage>
  );
};

export default NovoCliente;
