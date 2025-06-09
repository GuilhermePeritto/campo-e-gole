
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Calendar, CreditCard, Plus, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const School = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Novo Aluno',
      description: 'Cadastrar um novo aluno',
      icon: Plus,
      color: 'bg-green-500',
      action: () => navigate('/escolinha/alunos/novo')
    },
    {
      title: 'Gerenciar Alunos',
      description: 'Ver e editar alunos cadastrados',
      icon: Users2,
      color: 'bg-orange-500',
      action: () => navigate('/escolinha/alunos')
    },
    {
      title: 'Mensalidades',
      description: 'Controle de pagamentos',
      icon: CreditCard,
      color: 'bg-purple-500',
      action: () => navigate('/escolinha/mensalidades')
    },
    {
      title: 'Turmas',
      description: 'Gerenciar turmas e horários',
      icon: Calendar,
      color: 'bg-blue-500',
      action: () => navigate('/escolinha/turmas')
    },
    {
      title: 'Relatórios',
      description: 'Análises e inadimplência',
      icon: BarChart3,
      color: 'bg-green-500',
      action: () => navigate('/escolinha/relatorios')
    }
  ];

  const recentStudents = [
    { id: 1, name: 'Pedro Silva', age: 8, class: 'Infantil A', status: 'em dia' },
    { id: 2, name: 'Ana Costa', age: 10, class: 'Infantil B', status: 'atrasado' },
    { id: 3, name: 'João Santos', age: 12, class: 'Juvenil A', status: 'em dia' },
    { id: 4, name: 'Maria Oliveira', age: 9, class: 'Infantil A', status: 'em dia' }
  ];

  const monthlyStats = {
    totalStudents: 85,
    activeStudents: 82,
    pendingPayments: 8,
    monthlyRevenue: 12750
  };

  return (
    <div className="min-h-screen bg-background text-gray-600 dark:text-gray-300">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/painel')}
              className="gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Users2 className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Escolinha de Futebol</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border"
                  onClick={action.action}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-300 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-gray-600 dark:text-gray-300">Alunos Recentes</CardTitle>
              <CardDescription>
                Últimos alunos cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 border border rounded-lg">
                    <div>
                      <div className="font-medium text-gray-600 dark:text-gray-300">{student.name}</div>
                      <div className="text-sm text-gray-600">{student.age} anos - {student.class}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg ${
                      student.status === 'em dia' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-red-200 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/escolinha/alunos')}
              >
                Ver Todos os Alunos
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-gray-600 dark:text-gray-300">Situação Financeira</CardTitle>
              <CardDescription>
                Status dos pagamentos mensais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Alunos em dia</span>
                  <span className="font-semibold text-green-600">{monthlyStats.activeStudents - monthlyStats.pendingPayments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pagamentos pendentes</span>
                  <span className="font-semibold text-red-600">{monthlyStats.pendingPayments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taxa de inadimplência</span>
                  <span className="font-semibold text-gray-600 dark:text-gray-300">{((monthlyStats.pendingPayments / monthlyStats.totalStudents) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/escolinha/mensalidades')}
              >
                Gerenciar Pagamentos
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-gray-600 dark:text-gray-300">Resumo do Mês</CardTitle>
              <CardDescription>
                Estatísticas gerais da escolinha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600 dark:text-gray-300 mb-2">R$ {monthlyStats.monthlyRevenue.toLocaleString()}</div>
                <div className="text-sm text-green-600 mb-4">Receita mensal</div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-600 dark:text-gray-300">{monthlyStats.totalStudents}</div>
                    <div className="text-gray-600">Total de Alunos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-600 dark:text-gray-300">{monthlyStats.activeStudents}</div>
                    <div className="text-gray-600">Alunos Ativos</div>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/escolinha/relatorios')}
              >
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default School;
