
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { ArrowLeft, CreditCard, DollarSign, Search, Users2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EscolinhaMensalidades = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const students = [
    { id: 1, name: 'Lucas Silva', class: 'Infantil A', paymentDate: '15/05/2024', status: 'Pago' },
    { id: 2, name: 'Ana Costa', class: 'Juvenil B', paymentDate: '10/05/2024', status: 'Pendente' },
    { id: 3, name: 'Pedro Santos', class: 'Infantil B', paymentDate: '28/04/2024', status: 'Pago' },
    { id: 4, name: 'Maria Oliveira', class: 'Juvenil A', paymentDate: '20/05/2024', status: 'Pago' },
    { id: 5, name: 'João Pereira', class: 'Juvenil B', paymentDate: '05/05/2024', status: 'Pendente' },
    { id: 6, name: 'Mariana Souza', class: 'Infantil A', paymentDate: '18/05/2024', status: 'Pago' },
    { id: 7, name: 'Gustavo Almeida', class: 'Juvenil A', paymentDate: '12/05/2024', status: 'Pago' },
    { id: 8, name: 'Beatriz Rodrigues', class: 'Infantil B', paymentDate: '02/05/2024', status: 'Pendente' },
    { id: 9, name: 'Rafael Cunha', class: 'Juvenil B', paymentDate: '25/04/2024', status: 'Pago' },
    { id: 10, name: 'Isabela Gomes', class: 'Infantil A', paymentDate: '08/05/2024', status: 'Pago' }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (paymentStatus === '' || student.status === paymentStatus)
  );

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Mensalidades"
        icon={<CreditCard className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.school}
        backTo="/escolinha"
        backLabel="Escolinha"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Gerenciar Mensalidades</h2>
          <Button onClick={() => navigate('/escolinha/alunos/novo')} className="gap-2">
            <DollarSign className="h-4 w-4" />
            Registrar Pagamento
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Buscar aluno..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select onValueChange={setPaymentStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Students List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="border">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
                  <CardDescription>
                    Turma: {student.class} | Vencimento: {student.paymentDate}
                  </CardDescription>
                </div>
                <div className={`font-medium ${student.status === 'Pago' ? 'text-green-600' : 'text-red-600'}`}>
                  {student.status}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EscolinhaMensalidades;
