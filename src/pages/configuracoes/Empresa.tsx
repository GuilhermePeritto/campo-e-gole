
import BaseFormPage from '@/components/BaseFormPage';
import CompanyFormModal from '@/components/CompanyFormModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoDocumento from '@/core/components/CampoDocumento';
import CampoEmail from '@/core/components/CampoEmail';
import CampoTelefone from '@/core/components/CampoTelefone';
import { useEmpresas } from '@/hooks/useEmpresas';
import { Building, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

const Empresa = () => {
  const { empresas, fetchEmpresas } = useEmpresas();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState(null);

  // Estado para exibir dados da primeira empresa (se existir)
  const [companyData, setCompanyData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  useEffect(() => {
    fetchEmpresas({ page: 1, limit: 10 });
  }, [fetchEmpresas]);

  useEffect(() => {
    if (empresas.length > 0) {
      const empresa = empresas[0];
      setCompanyData({
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        email: empresa.email,
        telefone: empresa.telefone,
        endereco: empresa.endereco,
        cidade: empresa.cidade,
        estado: empresa.estado,
        cep: empresa.cep
      });
    }
  }, [empresas]);

  const handleEdit = () => {
    if (empresas.length > 0) {
      setEditingEmpresa(empresas[0]);
      setModalOpen(true);
    }
  };

  const handleCreate = () => {
    setEditingEmpresa(null);
    setModalOpen(true);
  };

  const handleModalSuccess = () => {
    fetchEmpresas({ page: 1, limit: 10 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEdit();
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
      submitLabel={empresas.length > 0 ? "Editar Dados" : "Nova Empresa"}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">
            {empresas.length > 0 ? 'Empresa Cadastrada' : 'Nenhuma Empresa Cadastrada'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {empresas.length > 0 ? 'Visualize ou edite os dados da empresa' : 'Cadastre sua primeira empresa'}
          </p>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleCreate}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Empresa
        </Button>
      </div>
      
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

      <CompanyFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        empresa={editingEmpresa}
        onSuccess={handleModalSuccess}
      />
    </BaseFormPage>
  );
};

export default Empresa;
