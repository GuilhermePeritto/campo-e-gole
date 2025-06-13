
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PageTour, { TourStep } from '@/components/PageTour';

interface PayableFormData {
  supplier: string;
  description: string;
  amount: number;
  dueDate: string;
  category: string;
}

const NewPayable = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tourSteps: TourStep[] = [
    {
      target: '[name="supplier"]',
      title: 'Fornecedor',
      content: 'Digite o nome do fornecedor ou prestador de serviços.'
    },
    {
      target: '[name="amount"]',
      title: 'Valor',
      content: 'Insira o valor total da conta a pagar em reais.'
    },
    {
      target: '[name="description"]',
      title: 'Descrição',
      content: 'Descreva detalhadamente o motivo desta conta a pagar.'
    },
    {
      target: '[name="dueDate"]',
      title: 'Data de Vencimento',
      content: 'Selecione a data limite para pagamento desta conta.'
    }
  ];

  const form = useForm<PayableFormData>({
    defaultValues: {
      supplier: '',
      description: '',
      amount: 0,
      dueDate: '',
      category: ''
    }
  });

  const onSubmit = async (data: PayableFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Nova conta a pagar:', data);
      setIsSubmitting(false);
      navigate('/financeiro/contas-a-pagar');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/financeiro/contas-a-pagar')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Contas a Pagar
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <h1 className="text-xl font-semibold">Nova Conta a Pagar</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="relative">
          <PageTour steps={tourSteps} title="Criação de Nova Conta a Pagar" />
          
          <CardHeader>
            <CardTitle>Criar Nova Conta a Pagar</CardTitle>
            <CardDescription>
              Adicione uma nova conta a pagar ao sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="supplier"
                    rules={{ required: 'Nome do fornecedor é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fornecedor</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nome do fornecedor"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    rules={{ 
                      required: 'Valor é obrigatório',
                      min: { value: 0.01, message: 'Valor deve ser maior que zero' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: 'Descrição é obrigatória' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Descrição da conta a pagar"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    rules={{ required: 'Data de vencimento é obrigatória' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Vencimento</FormLabel>
                        <FormControl>
                          <Input 
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    rules={{ required: 'Categoria é obrigatória' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fornecedores">Fornecedores</SelectItem>
                            <SelectItem value="utilidades">Utilidades</SelectItem>
                            <SelectItem value="pessoal">Pessoal</SelectItem>
                            <SelectItem value="manutencao">Manutenção</SelectItem>
                            <SelectItem value="equipamentos">Equipamentos</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/financeiro/contas-a-pagar')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Conta'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewPayable;
