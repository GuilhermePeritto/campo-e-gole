
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users2, Calendar, DollarSign } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const StudentHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in real app, fetch from API
  const student = {
    id: 1,
    name: 'Pedro Silva',
    age: 8,
    class: 'Infantil A',
    phone: '(11) 99999-1111',
    guardianName: 'João Silva',
    joinDate: '2024-01-15',
    status: 'em dia'
  };

  const paymentHistory = [
    {
      id: 1,
      month: 'Junho 2024',
      amount: 150,
      dueDate: '2024-06-10',
      paidDate: '2024-06-08',
      status: 'pago',
      method: 'PIX'
    },
    {
      id: 2,
      month: 'Maio 2024',
      amount: 150,
      dueDate: '2024-05-10',
      paidDate: '2024-05-12',
      status: 'pago',
      method: 'Cartão'
    },
    {
      id: 3,
      month: 'Abril 2024',
      amount: 150,
      dueDate: '2024-04-10',
      paidDate: '2024-04-15',
      status: 'pago',
      method: 'Dinheiro'
    },
    {
      id: 4,
      month: 'Março 2024',
      amount: 150,
      dueDate: '2024-03-10',
      paidDate: null,
      status: 'atrasado',
      method: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-200 text-green-800';
      case 'atrasado':
        return 'bg-red-200 text-red-800';
      case 'pendente':
        return 'bg-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const totalPaid = paymentHistory.filter(p => p.status === 'pago').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = paymentHistory.filter(p => p.status === 'atrasado').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-white text-black">
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
              <h1 className="text-xl font-semibold text-black">Histórico do Aluno</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info */}
        <Card className="border-black mb-6">
          <CardHeader>
            <CardTitle className="text-black">{student.name}</CardTitle>
            <CardDescription>
              Informações gerais e histórico financeiro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <h3 className="font-semibold text-black">Idade</h3>
                <p className="text-gray-600">{student.age} anos</p>
              </div>
              <div>
                <h3 className="font-semibold text-black">Turma</h3>
                <p className="text-gray-600">{student.class}</p>
              </div>
              <div>
                <h3 className="font-semibold text-black">Responsável</h3>
                <p className="text-gray-600">{student.guardianName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-black">Data de Matrícula</h3>
                <p className="text-gray-600">{student.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pago</p>
                  <p className="text-2xl font-bold text-black">R$ {totalPaid.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Em Atraso</p>
                  <p className="text-2xl font-bold text-black">R$ {totalOverdue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Meses na Escola</p>
                  <p className="text-2xl font-bold text-black">{paymentHistory.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Histórico de Pagamentos</CardTitle>
            <CardDescription>
              Registro completo de mensalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Mês</TableHead>
                  <TableHead className="text-black">Valor</TableHead>
                  <TableHead className="text-black">Vencimento</TableHead>
                  <TableHead className="text-black">Data do Pagamento</TableHead>
                  <TableHead className="text-black">Forma de Pagamento</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-black">{payment.month}</TableCell>
                    <TableCell className="text-gray-600">R$ {payment.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-600">{payment.dueDate}</TableCell>
                    <TableCell className="text-gray-600">
                      {payment.paidDate || '-'}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {payment.method || '-'}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentHistory;
