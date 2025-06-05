
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Calendar, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Financial = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold">Controle Financeiro</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receitas Totais</p>
                  <p className="text-2xl font-bold text-green-600">R$ 25.420</p>
                  <p className="text-xs text-muted-foreground">+12% este mês</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Despesas Totais</p>
                  <p className="text-2xl font-bold text-red-600">R$ 8.750</p>
                  <p className="text-xs text-muted-foreground">-5% este mês</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Lucro Líquido</p>
                  <p className="text-2xl font-bold text-blue-600">R$ 16.670</p>
                  <p className="text-xs text-muted-foreground">+18% este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">A Receber</p>
                  <p className="text-2xl font-bold text-orange-600">R$ 3.240</p>
                  <p className="text-xs text-muted-foreground">15 pendências</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu de Funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/financial/revenues')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <TrendingUp className="h-5 w-5" />
                Receitas
              </CardTitle>
              <CardDescription>
                Gerenciar todas as receitas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">R$ 25.420</p>
              <p className="text-sm text-muted-foreground">Total este mês</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/financial/expenses')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <TrendingDown className="h-5 w-5" />
                Despesas
              </CardTitle>
              <CardDescription>
                Controlar gastos e despesas operacionais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">R$ 8.750</p>
              <p className="text-sm text-muted-foreground">Total este mês</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/financial/accounts-receivable')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Calendar className="h-5 w-5" />
                Contas a Receber
              </CardTitle>
              <CardDescription>
                Títulos pendentes de todos os módulos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">R$ 3.240</p>
              <p className="text-sm text-muted-foreground">15 pendências</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/financial/accounts-payable')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Calendar className="h-5 w-5" />
                Contas a Pagar
              </CardTitle>
              <CardDescription>
                Compromissos financeiros pendentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">R$ 1.850</p>
              <p className="text-sm text-muted-foreground">8 pendências</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/financial/cash-flow')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <BarChart3 className="h-5 w-5" />
                Fluxo de Caixa
              </CardTitle>
              <CardDescription>
                Movimentação financeira detalhada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">R$ 16.670</p>
              <p className="text-sm text-muted-foreground">Saldo atual</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/financial/reports')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <PieChart className="h-5 w-5" />
                Relatórios
              </CardTitle>
              <CardDescription>
                Análises e relatórios financeiros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">DRE, Balanço, Análises</p>
            </CardContent>
          </Card>
        </div>

        {/* Comparativo por Módulos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Receitas por Módulo</CardTitle>
            <CardDescription>
              Comparativo de faturamento entre os módulos do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-green-600 mb-2">Eventos</h3>
                <p className="text-2xl font-bold">R$ 15.680</p>
                <p className="text-sm text-muted-foreground">62% do total</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-blue-600 mb-2">Bar</h3>
                <p className="text-2xl font-bold">R$ 7.240</p>
                <p className="text-sm text-muted-foreground">28% do total</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-purple-600 mb-2">Escolinha</h3>
                <p className="text-2xl font-bold">R$ 2.500</p>
                <p className="text-sm text-muted-foreground">10% do total</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Funções mais utilizadas do controle financeiro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => navigate('/financial/new-revenue')}
              >
                <TrendingUp className="h-5 w-5" />
                Nova Receita
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => navigate('/financial/new-expense')}
              >
                <TrendingDown className="h-5 w-5" />
                Nova Despesa
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => navigate('/financial/receive-payment')}
              >
                <Calendar className="h-5 w-5" />
                Receber Título
              </Button>
              
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => navigate('/financial/reports')}
              >
                <Filter className="h-5 w-5" />
                Gerar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Financial;
