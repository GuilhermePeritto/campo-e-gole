
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users2, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const StudentHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const studentInfo = {
    name: 'Pedro Silva',
    age: 8,
    class: 'Infantil A',
    enrollDate: '2024-01-15'
  };

  const paymentHistory = [
    {
      id: 1,
      month: 'Junho/2024',
      amount: 150,
      dueDate: '2024-06-05',
      paidDate: '2024-06-03',
      status: 'pago'
    },
    {
      id: 2,
      month: 'Maio/2024',
      amount: 150,
      dueDate: '2024-05-05',
      paidDate: '2024-05-04',
      status: 'pago'
    },
    {
      id: 3,
      month: 'Abril/2024',
      amount: 150,
      dueDate: '2024-04-05',
      paidDate: '2024-04-06',
      status: 'pago'
    }
  ];

  const attendanceHistory = [
    {
      id: 1,
      date: '2024-06-05',
      present: true,
      notes: 'Participou do treino completo'
    },
    {
      id: 2,
      date: '2024-06-03',
      present: true,
      notes: 'Excelente desempenho'
    },
    {
      id: 3,
      date: '2024-05-29',
      present: false,
      notes: 'Faltou por motivo de saúde'
    },
    {
      id: 4,
      date: '2024-05-27',
      present: true,
      notes: 'Participou normalmente'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-200 text-green-800';
      case 'pendente':
        return 'bg-yellow-200 text-yellow-800';
      case 'atrasado':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
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
              <h1 className="text-xl font-semibold text-black">Histórico do Aluno</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info */}
        <Card className="border-black mb-6">
          <CardHeader>
            <CardTitle className="text-black">{studentInfo.name}</CardTitle>
            <CardDescription>
              {studentInfo.age} anos • Turma: {studentInfo.class} • Matriculado em: {studentInfo.enrollDate}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment History */}
          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Histórico de Pagamentos</CardTitle>
              <CardDescription>
                Últimos pagamentos de mensalidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black">Mês</TableHead>
                    <TableHead className="text-black">Valor</TableHead>
                    <TableHead className="text-black">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-black">{payment.month}</TableCell>
                      <TableCell className="text-gray-600">R$ {payment.amount}</TableCell>
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

          {/* Attendance History */}
          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Histórico de Presença</CardTitle>
              <CardDescription>
                Últimas presenças nos treinos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black">Data</TableHead>
                    <TableHead className="text-black">Presença</TableHead>
                    <TableHead className="text-black">Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceHistory.map((attendance) => (
                    <TableRow key={attendance.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-black">{attendance.date}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-lg ${attendance.present ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {attendance.present ? 'Presente' : 'Falta'}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">{attendance.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentHistory;
