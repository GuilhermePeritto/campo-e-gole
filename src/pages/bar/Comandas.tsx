import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/usePagination';
import { CreditCard, Eye, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUniversalPayment } from '@/hooks/useUniversalPayment';

const Comandas = () => {
  const navigate = useNavigate();
  const { navigateToPayment } = useUniversalPayment();
  const [searchTerm, setSearchTerm] = useState('');

  const comandas = [
    { id: 1, customer: 'Mesa 1', total: 45.50, openTime: '10:30', status: 'aberta' },
    { id: 2, customer: 'João Silva', total: 22.00, openTime: '11:00', status: 'aberta' },
    { id: 3, customer: 'Mesa 5', total: 120.00, openTime: '12:15', status: 'fechada' },
    { id: 4, customer: 'Maria Costa', total: 67.80, openTime: '13:45', status: 'aberta' },
    { id: 5, customer: 'Mesa 3', total: 89.90, openTime: '14:00', status: 'aberta' },
    { id: 6, customer: 'Carlos Souza', total: 34.20, openTime: '15:30', status: 'fechada' },
    { id: 7, customer: 'Mesa 2', total: 55.00, openTime: '16:45', status: 'aberta' },
    { id: 8, customer: 'Ana Oliveira', total: 92.50, openTime: '17:00', status: 'aberta' },
    { id: 9, customer: 'Mesa 4', total: 76.30, openTime: '18:15', status: 'fechada' },
    { id: 10, customer: 'Pedro Santos', total: 41.10, openTime: '19:30', status: 'aberta' },
  ];

  const filteredComandas = comandas.filter(comanda =>
    comanda.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagination = usePagination(filteredComandas, {
    pageSize: 8,
    totalItems: filteredComandas.length
  });

  const handleCloseComanda = (comandaId: number) => {
    navigateToPayment({
      type: 'bar_comanda',
      id: comandaId.toString()
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberta':
        return 'bg-green-200 text-green-800';
      case 'fechada':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const totalValue = comandas.reduce((sum, comanda) => sum + comanda.total, 0);
  const openCount = comandas.filter(comanda => comanda.status === 'aberta').length;
  const closedCount = comandas.filter(comanda => comanda.status === 'fechada').length;

  return (
    <div className="min-h-screen bg-background text-gray-600 dark:text-gray-300">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/bar')}
                className="gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
              >
                Voltar
              </Button>
              <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Comandas</h1>
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
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">R$ {totalValue.toFixed(2)}</p>
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
                  <p className="text-sm font-medium text-gray-600">Comandas Abertas</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{openCount}</p>
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
                  <p className="text-sm font-medium text-gray-600">Comandas Fechadas</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{closedCount}</p>
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
              placeholder="Buscar por mesa ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border"
            />
          </div>
        </div>

        {/* Comandas Table */}
        <Card className="border">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-gray-600 dark:text-gray-300">Comandas Ativas</CardTitle>
                <CardDescription>
                  Gerencie as comandas em andamento
                </CardDescription>
              </div>
              <Button 
                onClick={() => navigate('/bar/comandas/novo')}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Comanda
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600 dark:text-gray-300">Comanda</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Mesa/Cliente</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Valor</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Abertura</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((comanda) => (
                  <TableRow key={comanda.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-600 dark:text-gray-300">#{comanda.id}</TableCell>
                    <TableCell className="text-gray-600">{comanda.customer}</TableCell>
                    <TableCell className="font-medium text-gray-600 dark:text-gray-300">R$ {comanda.total.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-600">{comanda.openTime}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(comanda.status)}`}>
                        {comanda.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/bar/comandas/${comanda.id}`)}
                          className="text-gray-600 dark:text-gray-300"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {comanda.status === 'aberta' && (
                          <Button
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={() => handleCloseComanda(comanda.id)}
                          >
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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

export default Comandas;
