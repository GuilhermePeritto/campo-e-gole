
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ModuleHeader from '@/components/ModuleHeader';
import PageTour, { TourStep } from '@/components/PageTour';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Save, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewClient = () => {
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
    },
    {
      target: '.form-actions',
      title: 'Salvar Cliente',
      content: 'Após preencher as informações necessárias, clique em "Salvar Cliente" para registrar no sistema.'
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
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Novo Cliente"
        icon={<UserPlus className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos/clientes"
        backLabel="Clientes"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="relative">
          <PageTour steps={tourSteps} title="Cadastro de Novo Cliente" />
          
          <CardHeader>
            <CardTitle>Cadastrar Novo Cliente</CardTitle>
            <CardDescription>
              Registre um novo cliente no sistema de eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="space-y-2">
                  <Label htmlFor="document">
                    {formData.type === 'pessoa-juridica' ? 'CNPJ' : 'CPF'}
                  </Label>
                  <Input
                    id="document"
                    value={formData.document}
                    onChange={(e) => handleChange('document', e.target.value)}
                    placeholder={formData.type === 'pessoa-juridica' ? '00.000.000/0000-00' : '000.000.000-00'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="cliente@email.com"
                  />
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

              <div className="flex gap-4 pt-4 form-actions">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Cliente
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/eventos/clientes')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewClient;
