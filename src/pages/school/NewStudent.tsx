
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

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
      navigate('/school/students');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/school/students')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Alunos
            </Button>
            <div className="flex items-center gap-2">
              <Users2 className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Novo Aluno</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Cadastrar Novo Aluno</CardTitle>
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
                        <FormLabel className="text-black">Nome do Aluno</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nome completo"
                            className="border-black"
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
                        <FormLabel className="text-black">Idade</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="Idade em anos"
                            className="border-black"
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
                        <FormLabel className="text-black">Nome do Responsável</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nome do pai/mãe ou responsável"
                            className="border-black"
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
                        <FormLabel className="text-black">Telefone</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(11) 99999-9999"
                            className="border-black"
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
                      <FormLabel className="text-black">E-mail (opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="email@exemplo.com"
                          className="border-black"
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
                      <FormLabel className="text-black">Endereço</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Endereço completo"
                          className="border-black"
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
                        <FormLabel className="text-black">Turma</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Infantil A, Juvenil B"
                            className="border-black"
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
                        <FormLabel className="text-black">Mensalidade (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            placeholder="150.00"
                            className="border-black"
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
                    className="flex-1 border-black text-black hover:bg-black hover:text-white"
                    onClick={() => navigate('/school/students')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-black text-white hover:bg-gray-800"
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
