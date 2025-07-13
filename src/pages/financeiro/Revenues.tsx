import SummaryCardSkeleton from '@/components/SummaryCardSkeleton';
import ValueSkeleton from '@/components/ValueSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, Filter, Plus, Search, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Receitas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const mockReceitas = [
    {
      id: 1,
      description: 'Reserva Quadra A - João Silva',
      amount: 120.00,
      date: '2024-06-05',
      module: 'eventos',
      category: 'Reservas',
      status: 'Recebido'
    },
    {
      id: 2,
      description: 'Venda Bar - Mesa 5',
      amount: 85.50,
      date: '2024-06-05',
      module: 'bar',
      category: 'Vendas',
      status: 'Recebido'
    },
    {
      id: 3,
      description: 'Mensalidade Junho - Pedro Martins',
      amount: 150.00,
      date: '2024-06-01',
      module: 'escolinha',
      category: 'Mensalidades',
      status: 'Recebido'
    },
    {
      id: 4,
      description: 'Reserva Campo 1 - Time Unidos FC',
      amount: 200.00,
      date: '2024-06-04',
      module: 'eventos',
      category: 'Reservas',
      status: 'Pendente'
    },
    {
      id: 5,
      description: 'Comanda Bar - Evento Corporativo',
      amount: 450.00,
      date: '2024-06-03',
      module: 'bar',
      category: 'Vendas',
      status: 'Recebido'
    }
  ];

  const filteredReceitas = mockReceitas.filter(revenue => {
    const matchesSearch = revenue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === 'all' || revenue.module === filterModule;
    return matchesSearch && matchesModule;
  });

  // const pagination = usePagination(filteredReceitas, {
  //   pageSize: 10,
  //   totalItems: filteredReceitas.length
  // });

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
      case 'Recebido': return 'bg-green-100 text-green-800';
      case 'Pendente': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredReceitas.reduce((sum, revenue) => sum + revenue.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
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
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h1 className="text-xl font-semibold">Receitas</h1>
              </div>
            </div>
            <Button onClick={() => navigate('/financeiro/receitas/novo')} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Receita
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {isLoading ? (
            <>
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
            </>
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Receitas</p>
                      <p className="text-2xl font-bold text-green-600">
                        {isLoading ? <ValueSkeleton /> : `R$ ${totalAmount.toFixed(2).replace('.', ',')}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Recebidas</p>
                      <p className="text-2xl font-bold text-blue-600">{filteredReceitas.filter(r => r.status === 'Recebido').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                      <p className="text-2xl font-bold text-orange-600">{filteredReceitas.filter(r => r.status === 'Pendente').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar receitas..."
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

        {/* Tabela de Receitas */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Receitas</CardTitle>
            <CardDescription>
              Histórico completo de receitas do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Módulo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {pagination.paginatedData.map((revenue) => ( */}
                {filteredReceitas.map((revenue) => (
                  <TableRow key={revenue.id}>
                    <TableCell className="font-medium">{revenue.description}</TableCell>
                    <TableCell className="font-bold text-green-600">
                      {isLoading ? <ValueSkeleton /> : `R$ ${revenue.amount.toFixed(2).replace('.', ',')}`}
                    </TableCell>
                    <TableCell>{new Date(revenue.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModuleColor(revenue.module)}`}>
                        {revenue.module === 'eventos' ? 'Eventos' : revenue.module === 'bar' ? 'Bar' : 'Escolinha'}
                      </span>
                    </TableCell>
                    <TableCell>{revenue.category}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(revenue.status)}`}>
                        {revenue.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* <PaginationControls
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
            /> */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Receitas;
