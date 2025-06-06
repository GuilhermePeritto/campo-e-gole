
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface StudentFormData {
  name: string;
  age: number;
  parentName: string;
  phone: string;
  email: string;
  address: string;
  class: string;
  monthlyFee: number;
}

const NewStudent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StudentFormData>({
    defaultValues: {
      name: '',
      age: 0,
      parentName: '',
      phone: '',
      email: '',
      address: '',
      class: '',
      monthlyFee: 150
    }
  });

  const onSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Novo aluno:', data);
      setIsSubmitting(false);
      navigate('/escolinha/alunos');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-gray-600 dark:text-gray-300">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/alunos')}
              className="gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Alunos
            </Button>
            <div className="flex items-center gap-2">
              <Users2 className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Novo Aluno</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-gray-600 dark:text-gray-300">Cadastrar Novo Aluno</CardTitle>
            <CardDescription>
              Adicione um novo aluno à escolinha de futebol
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Nome do aluno é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Nome do Aluno</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nome completo"
                            className="border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    rules={{ 
                      required: 'Idade é obrigatória',
                      min: { value: 4, message: 'Idade mínima é 4 anos' },
                      max: { value: 17, message: 'Idade máxima é 17 anos' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Idade</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="Idade em anos"
                            className="border"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="parentName"
                    rules={{ required: 'Nome do responsável é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Nome do Responsável</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nome do pai/mãe ou responsável"
                            className="border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    rules={{ required: 'Telefone é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Telefone</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(11) 99999-9999"
                            className="border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 dark:text-gray-300">E-mail (opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="email@exemplo.com"
                          className="border"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  rules={{ required: 'Endereço é obrigatório' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 dark:text-gray-300">Endereço</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Endereço completo"
                          className="border"
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
                    name="class"
                    rules={{ required: 'Turma é obrigatória' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Turma</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Infantil A, Juvenil B"
                            className="border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="monthlyFee"
                    rules={{ 
                      required: 'Mensalidade é obrigatória',
                      min: { value: 0.01, message: 'Valor deve ser maior que zero' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-300">Mensalidade (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            placeholder="150.00"
                            className="border"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border text-gray-600 dark:text-gray-300 hover:bg-black hover:text-gray-600 dark:text-gray-300"
                    onClick={() => navigate('/escolinha/alunos')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-black text-gray-600 dark:text-gray-300 hover:bg-gray-800"
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Aluno'}
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

export default NewStudent;
