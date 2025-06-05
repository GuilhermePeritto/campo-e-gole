
import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, Calendar, DollarSign, Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContasAReceber = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('all');

  const mockReceivables = [
    {
      id: 1,
      description: 'Reserva Quadra A - João Silva',
      amount: 120.00,
      dueDate: '2024-06-10',
      module: 'eventos',
      client: 'João Silva',
      status: 'Pendente'
    },
    {
      id: 2,
      description: 'Mensalidade Junho - Pedro Martins',
      amount: 150.00,
      dueDate: '2024-06-15',
      module: 'escolinha',
      client: 'Pedro Martins',
      status: 'Vencido'
    },
    {
      id: 3,
      description: 'Evento Corporativo - Empresa ABC',
      amount: 800.00,
      dueDate: '2024-06-20',
      module: 'eventos',
      client: 'Empresa ABC',
      status: 'Pendente'
    },
    {
      id: 4,
      description: 'Comanda Bar - Mesa 12',
      amount: 75.50,
      dueDate: '2024-06-08',
      module: 'bar',
      client: 'Cliente Balcão',
      status: 'Vencido'
    },
    {
      id: 5,
      description: 'Mensalidade Junho - Ana Costa',
      amount: 150.00,
      dueDate: '2024-06-25',
      module: 'escolinha',
      client: 'Ana Costa',
      status: 'Pendente'
    }
  ];

  const filteredReceivables = mockReceivables.filter(receivable => {
    const matchesSearch = receivable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receivable.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === 'all' || receivable.module === filterModule;
    return matchesSearch && matchesModule;
  });

  const pagination = usePagination(filteredReceivables, {
    pageSize: 10,
    totalItems: filteredReceivables.length
  });

  const getModuleColor = (module: string) => {
    switch (module) {
      case 'eventos': return 'bg-green-100 text-green-800';
      case 'bar': return 'bg-blue-100 text-blue-800';
      case 'escolinha': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente': return 'bg-orange-100 text-orange-800';
      case 'Vencido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredReceivables.reduce((sum, receivable) => sum + receivable.amount, 0);
  const overdueAmount = filteredReceivables
    .filter(r => r.status === 'Vencido')
    .reduce((sum, receivable) => sum + receivable.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/financeiro')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <h1 className="text-xl font-semibold">Contas a Receber</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total a Receber</p>
                  <p className="text-2xl font-bold text-orange-600">R$ {totalAmount.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vencidos</p>
                  <p className="text-2xl font-bold text-red-600">R$ {overdueAmount.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Títulos</p>
                  <p className="text-2xl font-bold text-blue-600">{filteredReceivables.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vencidos</p>
                  <p className="text-2xl font-bold text-yellow-600">{filteredReceivables.filter(r => r.status === 'Vencido').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por descrição ou cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterModule} onValueChange={setFilterModule}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por módulo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os módulos</SelectItem>
                  <SelectItem value="eventos">Eventos</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="escolinha">Escolinha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Contas a Receber */}
        <Card>
          <CardHeader>
            <CardTitle>Títulos a Receber</CardTitle>
            <CardDescription>
              Todas as contas pendentes de recebimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Módulo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((receivable) => (
                  <TableRow key={receivable.id}>
                    <TableCell className="font-medium">{receivable.description}</TableCell>
                    <TableCell>{receivable.client}</TableCell>
                    <TableCell className="font-bold text-orange-600">
                      R$ {receivable.amount.toFixed(2).replace('.', ',')}
                    </TableCell>
                    <TableCell>{new Date(receivable.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModuleColor(receivable.module)}`}>
                        {receivable.module === 'eventos' ? 'Eventos' : receivable.module === 'bar' ? 'Bar' : 'Escolinha'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(receivable.status)}`}>
                        {receivable.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Receber
                        </Button>
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

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
              pageSizeOptions={[10, 20, 50]}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ContasAReceber;
