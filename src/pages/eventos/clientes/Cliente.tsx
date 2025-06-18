import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import PageTour, { TourStep } from '@/components/PageTour';
import CampoEmail from '@/core/componentes/CampoEmail';
import CampoTelefone from '@/core/componentes/CampoTelefone';
import CampoDocumento from '@/core/componentes/CampoDocumento';

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
      target: '[data-tour="nome"]',
      title: 'Nome do Cliente',
      content: 'Digite o nome completo do cliente ou razão social da empresa.',
      placement: 'bottom'
    },
    {
      target: '[data-tour="documento"]',
      title: 'Documento',
      content: 'Informe o CPF para pessoa física ou CNPJ para pessoa jurídica.',
      placement: 'bottom'
    },
    {
      target: '[data-tour="contato"]',
      title: 'Informações de Contato',
      content: 'Adicione informações de contato para comunicação.',
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

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title={isEdit ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
        icon={<Users className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos/clientes"
        backLabel="Clientes"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg relative">
          <PageTour steps={tourSteps} title="Tour - Cadastro de Cliente" />
          
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="text-primary">
                <Users className="h-5 w-5" />
              </div>
              {isEdit ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
            </CardTitle>
            <CardDescription>
              {isEdit ? 'Edite as informações do cliente' : 'Registre um novo cliente no sistema'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2" data-tour="nome">
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

                  <div className="space-y-2" data-tour="documento">
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
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <h3 className="text-lg font-semibold text-foreground">Contato</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-tour="contato">
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
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <h3 className="text-lg font-semibold text-foreground">Endereço</h3>
                </div>
                
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
              </div>

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
              
              <div className="flex gap-4 pt-6 border-t">
                <Button type="submit" className="flex-1 h-11 font-medium">
                  {isEdit ? 'Salvar Alterações' : 'Cadastrar Cliente'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/eventos/clientes')}
                  className="flex-1 h-11 font-medium"
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

export default Cliente;
