
import BaseFormPage from '@/components/BaseFormPage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoDocumento from '@/core/components/CampoDocumento';
import CampoEmail from '@/core/components/CampoEmail';
import CampoTelefone from '@/core/components/CampoTelefone';
import { Building } from 'lucide-react';
import { useState } from 'react';

const Empresa = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando dados da empresa:', companyData);
    // Aqui faria a chamada para a API
  };

  return (
    <BaseFormPage
      title="Dados da Empresa"
      description="Gerencie as informações básicas da sua empresa"
      icon={<Building className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.inicio}
      backTo="/configuracoes"
      backLabel="Configurações"
      onSubmit={handleSubmit}
      submitLabel="Salvar Alterações"
    >
      <div className="space-y-6">
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
      </div>
    </BaseFormPage>
  );
};

export default Empresa;
