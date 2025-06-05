
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Search, Filter, Calendar, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '@/hooks/usePagination';
import PaginationControls from '@/components/PaginationControls';

const AccountsPayable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const mockPayables = [
    {
      id: 1,
      description: 'Fornecedor de Bebidas - Pedido #123',
      supplier: 'Distribuidora XYZ',
      amount: 850.00,
      dueDate: '2024-06-15',
      category: 'Fornecedores',
      status: 'Pendente'
    },
    {
      id: 2,
      description: 'Energia Elétrica - Junho',
      supplier: 'Companhia Elétrica',
      amount: 450.00,
      dueDate: '2024-06-10',
      category: 'Utilidades',
      status: 'Vencido'
    },
    {
      id: 3,
      description: 'Salário - João da Silva',
      supplier: 'Funcionário',
      amount: 2500.00,
      dueDate: '2024-06-30',
      category: 'Pessoal',
      status: 'Pendente'
    },
    {
      id: 4,
      description: 'Material de Limpeza',
      supplier: 'Limpeza Total Ltda',
      amount: 180.00,
      dueDate: '2024-06-08',
      category: 'Manutenção',
      status: 'Vencido'
    },
    {
      id: 5,
      description: 'Equipamentos Esportivos',
      supplier: 'Sport Equipment Inc',
      amount: 1200.00,
      dueDate: '2024-06-25',
      category: 'Equipamentos',
      status: 'Pendente'
    }
  ];

  const filteredPayables = mockPayables.filter(payable => {
    const matchesSearch = payable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payable.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || payable.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const pagination = usePagination(filteredPayables, {
    pageSize: 10,
    totalItems: filteredPayables.length
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fornecedores': return 'bg-blue-100 text-blue-800';
      case 'Utilidades': return 'bg-yellow-100 text-yellow-800';
      case 'Pessoal': return 'bg-green-100 text-green-800';
      case 'Manutenção': return 'bg-purple-100 text-purple-800';
      case 'Equipamentos': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente': return 'bg-orange-100 text-orange-800';
      case 'Vencido': return 'bg-red-100 text-red-800';
      case 'Pago': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredPayables.reduce((sum, payable) => sum + payable.amount, 0);
  const overdueAmount = filteredPayables
    .filter(p => p.status === 'Vencido')
    .reduce((sum, payable) => sum + payable.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/financial')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <h1 className="text-xl font-semibold">Contas a Pagar</h1>
              </div>
            </div>
            <Button onClick={() => navigate('/financial/new-payable')} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Conta
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total a Pagar</p>
                  <p className="text-2xl font-bold text-purple-600">R$ {totalAmount.toFixed(2).replace('.', ',')}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total de Contas</p>
                  <p className="text-2xl font-bold text-blue-600">{filteredPayables.length}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Vencidas</p>
                  <p className="text-2xl font-bold text-yellow-600">{filteredPayables.filter(p => p.status === 'Vencido').length}</p>
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
                  placeholder="Buscar por descrição ou fornecedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="Fornecedores">Fornecedores</SelectItem>
                  <SelectItem value="Utilidades">Utilidades</SelectItem>
                  <SelectItem value="Pessoal">Pessoal</SelectItem>
                  <SelectItem value="Manutenção">Manutenção</SelectItem>
                  <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Contas a Pagar */}
        <Card>
          <CardHeader>
            <CardTitle>Contas a Pagar</CardTitle>
            <CardDescription>
              Todas as contas pendentes de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((payable) => (
                  <TableRow key={payable.id}>
                    <TableCell className="font-medium">{payable.description}</TableCell>
                    <TableCell>{payable.supplier}</TableCell>
                    <TableCell className="font-bold text-purple-600">
                      R$ {payable.amount.toFixed(2).replace('.', ',')}
                    </TableCell>
                    <TableCell>{new Date(payable.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(payable.category)}`}>
                        {payable.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payable.status)}`}>
                        {payable.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Pagar
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

export default AccountsPayable;
