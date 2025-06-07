
import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FluxoDeCaixa = () => {
  const navigate = useNavigate();

  const mockFluxoDeCaixa = [
    { date: '2024-06-01', description: 'Saldo Inicial', type: 'inicial', amount: 10000.00 },
    { date: '2024-06-02', description: 'Reserva Quadra A', type: 'entrada', amount: 120.00 },
    { date: '2024-06-02', description: 'Conta de Luz', type: 'saida', amount: -450.00 },
    { date: '2024-06-03', description: 'Venda Bar', type: 'entrada', amount: 85.50 },
    { date: '2024-06-04', description: 'Mensalidade Aluno', type: 'entrada', amount: 150.00 },
    { date: '2024-06-05', description: 'Material de Limpeza', type: 'saida', amount: -80.00 },
    { date: '2024-06-06', description: 'Reserva Quadra B', type: 'entrada', amount: 200.00 },
    { date: '2024-06-07', description: 'Fornecedor Bebidas', type: 'saida', amount: -300.00 },
    { date: '2024-06-08', description: 'Aula Particular', type: 'entrada', amount: 100.00 },
    { date: '2024-06-09', description: 'Internet', type: 'saida', amount: -150.00 }
  ];

  const pagination = usePagination(mockFluxoDeCaixa, {
    pageSize: 6,
    totalItems: mockFluxoDeCaixa.length
  });

  let runningBalance = 0;

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
              <DollarSign className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Fluxo de Caixa</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Entradas</p>
                  <p className="text-2xl font-bold text-green-600">R$ 655,50</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Saídas</p>
                  <p className="text-2xl font-bold text-red-600">R$ 980,00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo Atual</p>
                  <p className="text-2xl font-bold text-blue-600">R$ 9.675,50</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fluxo de Caixa */}
        <Card>
          <CardHeader>
            <CardTitle>Movimentação Financeira</CardTitle>
            <CardDescription>
              Histórico detalhado de entradas e saídas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pagination.paginatedData.map((item, index) => {
                // Reset running balance for first item when paginated
                if (index === 0 && pagination.currentPage === 1) {
                  runningBalance = 0;
                }
                
                if (item.type === 'inicial') {
                  runningBalance = item.amount;
                } else {
                  runningBalance += item.amount;
                }

                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        item.type === 'entrada' ? 'bg-green-100' : 
                        item.type === 'saida' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {item.type === 'entrada' ? (
                          <TrendingUp className={`h-4 w-4 ${
                            item.type === 'entrada' ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        ) : item.type === 'saida' ? (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        item.amount > 0 ? 'text-green-600' : 
                        item.amount < 0 ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {item.amount > 0 ? '+' : ''}R$ {Math.abs(item.amount).toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Saldo: R$ {runningBalance.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

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
              pageSizeOptions={[6, 10, 15]}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FluxoDeCaixa;
