
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ModuleHeader from '@/components/ModuleHeader';
import PageTour, { TourStep } from '@/components/PageTour';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Save, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NovaDespesa = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
    supplier: '',
    observations: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#description',
      title: 'Descrição da Despesa',
      content: 'Digite uma descrição clara da despesa que está sendo registrada. Ex: "Conta de energia elétrica - Janeiro/2024".'
    },
    {
      target: '#amount',
      title: 'Valor da Despesa',
      content: 'Informe o valor total da despesa em reais. Use apenas números e vírgula para decimais.'
    },
    {
      target: '#date',
      title: 'Data da Despesa',
      content: 'Selecione a data em que a despesa foi paga ou venceu.'
    },
    {
      target: '#category',
      title: 'Categoria da Despesa',
      content: 'Escolha a categoria que melhor classifica esta despesa para organização e relatórios.'
    },
    {
      target: '#supplier',
      title: 'Fornecedor',
      content: 'Campo opcional para informar o nome da empresa ou pessoa que forneceu o produto/serviço.'
    },
    {
      target: '#observations',
      title: 'Observações',
      content: 'Campo opcional para incluir informações extras sobre a despesa, como número da nota fiscal ou detalhes do pagamento.'
    },
    {
      target: '.form-actions',
      title: 'Salvar Despesa',
      content: 'Após preencher os campos obrigatórios, clique em "Salvar Despesa" para registrar no sistema.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova despesa:', formData);
    navigate('/financeiro/despesas');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageTour steps={tourSteps} title="Cadastro de Nova Despesa" />
      
      <ModuleHeader
        title="Nova Despesa"
        icon={<TrendingDown className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.financial}
        backTo="/financeiro/despesas"
        backLabel="Despesas"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Nova Despesa</CardTitle>
            <CardDescription>
              Registre uma nova saída de despesa no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Ex: Conta de energia elétrica"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Valor *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0,00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Data *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utilidades">Utilidades</SelectItem>
                      <SelectItem value="equipamentos">Equipamentos</SelectItem>
                      <SelectItem value="pessoal">Pessoal</SelectItem>
                      <SelectItem value="manutencao">Manutenção</SelectItem>
                      <SelectItem value="fornecedores">Fornecedores</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="supplier">Fornecedor</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                    placeholder="Nome do fornecedor ou prestador de serviço"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => setFormData({...formData, observations: e.target.value})}
                  placeholder="Observações adicionais..."
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4 form-actions">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Despesa
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/financeiro/despesas')}
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

export default NovaDespesa;
