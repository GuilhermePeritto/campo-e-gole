
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { BarChart3, Calendar, Download, PieChart, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinanceiroRelatorios = () => {
  const navigate = useNavigate();

  const reportTypes = [
    {
      title: 'DRE - Demonstração do Resultado',
      description: 'Receitas, despesas e resultado líquido do período',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      action: () => console.log('Gerar DRE')
    },
    {
      title: 'Relatório de Receitas',
      description: 'Detalhamento completo das receitas por módulo',
      icon: BarChart3,
      color: 'bg-blue-100 text-blue-600',
      action: () => console.log('Gerar receitas')
    },
    {
      title: 'Relatório de Despesas',
      description: 'Análise das despesas por categoria e período',
      icon: PieChart,
      color: 'bg-red-100 text-red-600',
      action: () => console.log('Gerar despesas')
    },
    {
      title: 'Fluxo de Caixa Mensal',
      description: 'Movimentação financeira detalhada do mês',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
      action: () => console.log('Gerar fluxo')
    },
    {
      title: 'Pagamento de Professores',
      description: 'Relatório detalhado de pagamentos aos professores',
      icon: Users,
      color: 'bg-indigo-100 text-indigo-600',
      action: () => navigate('/financeiro/relatorios/professores')
    },
    {
      title: 'Relatório Personalizado',
      description: 'Crie relatórios customizados com drag-and-drop',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-600',
      action: () => navigate('/financeiro/relatorios/personalizado'),
      buttonText: 'Montar seu Relatório'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Relatórios Financeiros"
        icon={<BarChart3 className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.financial}
        backTo="/financeiro"
        backLabel="Financeiro"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Relatórios Disponíveis</h2>
          <p className="text-muted-foreground">
            Gere relatórios detalhados sobre a situação financeira do sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reportTypes.map((report, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={report.action}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${report.color}`}>
                    <report.icon className="h-5 w-5" />
                  </div>
                  {report.title}
                </CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2" onClick={report.action}>
                  <Download className="h-4 w-4" />
                  {report.buttonText || 'Gerar Relatório'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumo Rápido */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo Financeiro - Junho 2024</CardTitle>
            <CardDescription>
              Visão geral dos principais indicadores financeiros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-green-600 mb-2">Receitas Totais</h3>
                <p className="text-2xl font-bold">R$ 25.420</p>
                <p className="text-sm text-muted-foreground">+12% vs mês anterior</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-red-600 mb-2">Despesas Totais</h3>
                <p className="text-2xl font-bold">R$ 8.750</p>
                <p className="text-sm text-muted-foreground">-5% vs mês anterior</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-blue-600 mb-2">Lucro Líquido</h3>
                <p className="text-2xl font-bold">R$ 16.670</p>
                <p className="text-sm text-muted-foreground">+18% vs mês anterior</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-purple-600 mb-2">Margem de Lucro</h3>
                <p className="text-2xl font-bold">65,6%</p>
                <p className="text-sm text-muted-foreground">+4,2% vs mês anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FinanceiroRelatorios;
