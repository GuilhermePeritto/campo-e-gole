
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Save } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfiguracoesEmpresa = () => {
  const navigate = useNavigate();
  const { company, updateCompanyData } = useAuth();
  
  const [formData, setFormData] = useState({
    name: company?.name || '',
    document: company?.document || '',
    email: company?.email || '',
    phone: company?.phone || '',
    address: company?.address || '',
    city: company?.city || '',
    state: company?.state || '',
    zipCode: company?.zipCode || '',
    website: company?.website || '',
    description: company?.description || '',
    eventsModule: company?.settings.eventsModule || false,
    barModule: company?.settings.barModule || false,
    schoolModule: company?.settings.schoolModule || false,
    financialModule: company?.settings.financialModule || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateCompanyData({
      name: formData.name,
      document: formData.document,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      website: formData.website,
      description: formData.description,
      settings: {
        ...company?.settings,
        eventsModule: formData.eventsModule,
        barModule: formData.barModule,
        schoolModule: formData.schoolModule,
        financialModule: formData.financialModule
      }
    });
    
    navigate('/configuracoes');
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Configurações da Empresa"
        icon={<Building2 className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Básicos */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Básicos da Empresa</CardTitle>
              <CardDescription>
                Informações principais da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Empresa *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ex: Arena Sports Club"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document">CNPJ</Label>
                  <Input
                    id="document"
                    value={formData.document}
                    onChange={(e) => handleInputChange('document', e.target.value)}
                    placeholder="00.000.000/0001-00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contato@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 9999-9999"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://www.empresa.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descrição da empresa..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>
                Localização da empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Rua, número, bairro"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="São Paulo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="SP"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Módulos Ativos */}
          <Card>
            <CardHeader>
              <CardTitle>Módulos Ativos</CardTitle>
              <CardDescription>
                Defina quais módulos estão habilitados para sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Módulo Eventos</div>
                    <div className="text-sm text-muted-foreground">Gestão de reservas e agenda</div>
                  </div>
                  <Switch
                    checked={formData.eventsModule}
                    onCheckedChange={(checked) => handleInputChange('eventsModule', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Módulo Bar</div>
                    <div className="text-sm text-muted-foreground">Comandas e estoque</div>
                  </div>
                  <Switch
                    checked={formData.barModule}
                    onCheckedChange={(checked) => handleInputChange('barModule', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Módulo Escola</div>
                    <div className="text-sm text-muted-foreground">Alunos e mensalidades</div>
                  </div>
                  <Switch
                    checked={formData.schoolModule}
                    onCheckedChange={(checked) => handleInputChange('schoolModule', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Módulo Financeiro</div>
                    <div className="text-sm text-muted-foreground">Contas e relatórios</div>
                  </div>
                  <Switch
                    checked={formData.financialModule}
                    onCheckedChange={(checked) => handleInputChange('financialModule', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/configuracoes')}
            >
              Cancelar
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ConfiguracoesEmpresa;
