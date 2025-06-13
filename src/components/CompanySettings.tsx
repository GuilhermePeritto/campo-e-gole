
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Building, Save, Upload } from 'lucide-react';

const CompanySettings = () => {
  const { company, updateCompanyData } = useAuth();
  
  const [companyData, setCompanyData] = useState({
    name: company?.name || '',
    document: company?.document || '',
    email: company?.email || '',
    phone: company?.phone || '',
    address: company?.address || '',
    city: company?.city || '',
    state: company?.state || '',
    zipCode: company?.zipCode || '',
    website: company?.website || '',
    description: company?.description || ''
  });

  const handleSave = () => {
    updateCompanyData(companyData);
    toast({
      title: "Dados da empresa salvos",
      description: "As informações da empresa foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-4">
          <Building className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Dados da Empresa
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure as informações básicas da sua empresa
        </p>
      </div>

      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-card to-card/50">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl">Informações Básicas</CardTitle>
          <CardDescription>Dados principais da empresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa</Label>
              <Input
                id="name"
                value={companyData.name}
                onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome da empresa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document">CNPJ</Label>
              <Input
                id="document"
                value={companyData.document}
                onChange={(e) => setCompanyData(prev => ({ ...prev, document: e.target.value }))}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={companyData.email}
                onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="contato@empresa.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={companyData.phone}
                onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={companyData.website}
                onChange={(e) => setCompanyData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://www.empresa.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={companyData.description}
              onChange={(e) => setCompanyData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Breve descrição da empresa..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-card to-card/50">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl">Endereço</CardTitle>
          <CardDescription>Localização da empresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={companyData.address}
                onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Rua, número, complemento"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={companyData.city}
                onChange={(e) => setCompanyData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Cidade"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={companyData.state}
                onChange={(e) => setCompanyData(prev => ({ ...prev, state: e.target.value }))}
                placeholder="Estado"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={companyData.zipCode}
                onChange={(e) => setCompanyData(prev => ({ ...prev, zipCode: e.target.value }))}
                placeholder="00000-000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleSave}
          className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Dados
        </Button>
      </div>
    </div>
  );
};

export default CompanySettings;
