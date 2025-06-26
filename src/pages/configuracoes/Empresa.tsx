
import BaseFormPage from '@/components/BaseFormPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CampoDocumento from '@/core/componentes/CampoDocumento';
import CampoEmail from '@/core/componentes/CampoEmail';
import CampoTelefone from '@/core/componentes/CampoTelefone';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Building, MapPin, Plus, Settings } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Empresa = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    nome: 'Arena Sports Club',
    cnpj: '12345678000195',
    email: 'contato@arenasports.com',
    telefone: '11987654321',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234567'
  });

  const [filiais] = useState([
    {
      id: 1,
      nome: 'Filial Centro',
      endereco: 'Av. Paulista, 1000',
      cidade: 'São Paulo',
      telefone: '11987654321',
      ativo: true,
      modulos: {
        eventos: true,
        bar: true,
        escolinha: false,
        financeiro: true
      }
    },
    {
      id: 2,
      nome: 'Filial Zona Norte',
      endereco: 'Rua do Limão, 500',
      cidade: 'São Paulo',
      telefone: '11987654322',
      ativo: true,
      modulos: {
        eventos: true,
        bar: false,
        escolinha: true,
        financeiro: true
      }
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando dados da empresa:', companyData);
    // Aqui faria a chamada para a API
  };

  return (
    <BaseFormPage
      title="Empresa e Filiais"
      description="Gerencie os dados da sua empresa e filiais"
      icon={<Building className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.inicio}
      backTo="/configuracoes"
      backLabel="Configurações"
      onSubmit={handleSubmit}
      submitLabel="Salvar Alterações"
    >
      <Tabs defaultValue="empresa" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="empresa" className="gap-2">
            <Building className="h-4 w-4" />
            Dados da Empresa
          </TabsTrigger>
          <TabsTrigger value="filiais" className="gap-2">
            <MapPin className="h-4 w-4" />
            Filiais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Dados principais da empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da Empresa *</Label>
                  <Input
                    id="nome"
                    value={companyData.nome}
                    onChange={(e) => setCompanyData({...companyData, nome: e.target.value})}
                    className="h-11"
                  />
                </div>
                <CampoDocumento
                  id="cnpj"
                  label="CNPJ"
                  value={companyData.cnpj}
                  onChange={(value) => setCompanyData({...companyData, cnpj: value})}
                  tipo="cnpj"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <CampoEmail
                  id="email"
                  value={companyData.email}
                  onChange={(value) => setCompanyData({...companyData, email: value})}
                  required
                />
                <CampoTelefone
                  id="telefone"
                  value={companyData.telefone}
                  onChange={(value) => setCompanyData({...companyData, telefone: value})}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>
                Localização da empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="endereco">Endereço *</Label>
                  <Input
                    id="endereco"
                    value={companyData.endereco}
                    onChange={(e) => setCompanyData({...companyData, endereco: e.target.value})}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={companyData.cep}
                    onChange={(e) => setCompanyData({...companyData, cep: e.target.value})}
                    className="h-11"
                    placeholder="00000-000"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={companyData.cidade}
                    onChange={(e) => setCompanyData({...companyData, cidade: e.target.value})}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado *</Label>
                  <Input
                    id="estado"
                    value={companyData.estado}
                    onChange={(e) => setCompanyData({...companyData, estado: e.target.value})}
                    className="h-11"
                    maxLength={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filiais" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Filiais Cadastradas</h3>
              <p className="text-sm text-muted-foreground">
                Gerencie as filiais da sua empresa
              </p>
            </div>
            <Button onClick={() => navigate('/configuracoes/filiais/nova')} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Filial
            </Button>
          </div>

          <div className="grid gap-4">
            {filiais.map((filial) => (
              <Card key={filial.id} className="cursor-pointer hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{filial.nome}</CardTitle>
                      <CardDescription>
                        {filial.endereco}, {filial.cidade}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch checked={filial.ativo} />
                        <span className="text-sm">{filial.ativo ? 'Ativa' : 'Inativa'}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/configuracoes/filiais/${filial.id}/editar`)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm">
                    <span className="font-medium">Módulos ativos:</span>
                    <div className="flex gap-2">
                      {filial.modulos.eventos && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Eventos</span>}
                      {filial.modulos.bar && <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Bar</span>}
                      {filial.modulos.escolinha && <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Escolinha</span>}
                      {filial.modulos.financeiro && <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Financeiro</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </BaseFormPage>
  );
};

export default Empresa;
