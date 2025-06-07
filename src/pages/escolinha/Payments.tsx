
import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, CreditCard, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const payments = [
    { 
      id: 1, 
      studentName: 'Pedro Silva', 
      month: 'Junho/2024',
      amount: 150,
      dueDate: '2024-06-05',
      paidDate: '2024-06-03',
      status: 'pago'
    },
    { 
      id: 2, 
      studentName: 'Ana Costa', 
      month: 'Junho/2024',
      amount: 150,
      dueDate: '2024-06-05',
      paidDate: null,
      status: 'atrasado'
    },
    { 
      id: 3, 
      studentName: 'João Santos', 
      month: 'Junho/2024',
      amount: 180,
      dueDate: '2024-06-05',
      paidDate: '2024-06-04',
      status: 'pago'
    },
    { 
      id: 4, 
      studentName: 'Maria Oliveira', 
      month: 'Junho/2024',
      amount: 150,
      dueDate: '2024-06-05',
      paidDate: null,
      status: 'pendente'
    }
  ];

  const filteredPayments = payments.filter(payment =>
    payment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagination = usePagination(filteredPayments, {
    pageSize: 8,
    totalItems: filteredPayments.length
  });

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

  const totalReceived = payments
    .filter(p => p.status === 'pago')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status !== 'pago')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-background text-gray-600 dark:text-gray-300">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha')}
              className="gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Escolinha
            </Button>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Mensalidades</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Recebido</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">R$ {totalReceived.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendente</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">R$ {totalPending.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">R$ {(totalReceived + totalPending).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome do aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border"
            />
          </div>
        </div>

        {/* Payments Table */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-gray-600 dark:text-gray-300">Controle de Mensalidades</CardTitle>
            <CardDescription>
              Gerencie os pagamentos das mensalidades dos alunos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600 dark:text-gray-300">Aluno</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Mês/Ano</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Valor</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Vencimento</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Data Pagamento</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-600 dark:text-gray-300">{payment.studentName}</TableCell>
                    <TableCell className="text-gray-600">{payment.month}</TableCell>
                    <TableCell className="font-medium text-gray-600 dark:text-gray-300">R$ {payment.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-600">{payment.dueDate}</TableCell>
                    <TableCell className="text-gray-600">{payment.paidDate || '-'}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {payment.status !== 'pago' && (
                        <Button
                          size="sm"
                          className="bg-green-600 text-gray-600 dark:text-gray-300 hover:bg-green-700"
                        >
                          Receber
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Paginação */}
            <PaginationControls
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              pageSize={pagination.pageSize}
              startIndex={pagination.startIndex}
              endIndex={pagination.endIndex}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPageChange={pagination.goToPage}
              onPageSizeChange={pagination.setPageSize}
              pageSizeOptions={[5, 8, 12]}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Payments;
