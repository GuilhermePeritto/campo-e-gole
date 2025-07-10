import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { BarChart3, CreditCard, GraduationCap, Plus, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const School = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Novo Aluno',
      description: 'Novo aluno',
      icon: Plus,
      color: 'bg-module-school',
      action: () => navigate('/escolinha/alunos/novo')
    },
    {
      title: 'Alunos',
      description: 'Gerenciar alunos matriculados',
      icon: Users2,
      color: 'bg-module-school',
      action: () => navigate('/escolinha/alunos')
    },
    {
      title: 'Clientes',
      description: 'Gerenciar clientes da escola',
      icon: Users2,
      color: 'bg-module-school',
      action: () => navigate('/escolinha/clientes')
    },
    {
      title: 'Professores',
      description: 'Gerenciar professores',
      icon: GraduationCap,
      color: 'bg-module-school',
      action: () => navigate('/escolinha/professores')
    },
    {
      title: 'Turmas',
      description: 'Organizar turmas e horários',
      icon: GraduationCap,
      color: 'bg-module-school',
      action: () => navigate('/escolinha/turmas')
    },
    {
      title: 'Mensalidades',
      description: 'Controlar pagamentos',
      icon: CreditCard,
      color: 'bg-module-school',
      action: () => navigate('/escolinha/mensalidades')
    },
    {
      title: 'Relatórios',
      description: 'Análises e estatísticas',
      icon: BarChart3,
      color: 'bg-module-school',
      action: () => navigate('/escolinha/relatorios')
    }
  ];

  const recentStudents = [
    { id: 1, name: 'Lucas Silva', class: 'Infantil A', age: 8, status: 'Ativo', lastPayment: '15/04/2024' },
    { id: 2, name: 'Ana Costa', class: 'Juvenil B', age: 12, status: 'Ativo', lastPayment: '10/04/2024' },
    { id: 3, name: 'Pedro Santos', class: 'Infantil B', age: 9, status: 'Pendente', lastPayment: '28/03/2024' },
    { id: 4, name: 'Maria Oliveira', class: 'Juvenil A', age: 14, status: 'Ativo', lastPayment: '20/04/2024' }
  ];

  const schoolStats = {
    totalStudents: 150,
    activeClasses: 8,
    monthlyRevenue: 12500.00,
    pendingPayments: 15
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'text-green-600';
      case 'Pendente': return 'text-yellow-600';
      case 'Inativo': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Escola"
        icon={<Users2 className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.school}
      />

      <main className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
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
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Inicio Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Alunos Recentes</CardTitle>
              <CardDescription>
                Últimos alunos matriculados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-muted/50 border rounded-lg">
                    <div>
                      <div className="font-medium text-card-foreground">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.class} - {student.age} anos</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-medium ${getStatusColor(student.status)}`}>
                        {student.status}
                      </div>
                      <div className="text-xs text-muted-foreground">{student.lastPayment}</div>
                    </div>
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
              <CardTitle className="text-card-foreground">Estatísticas da Escola</CardTitle>
              <CardDescription>
                Visão geral do desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total de Alunos</span>
                  <span className="font-semibold text-green-600">{schoolStats.totalStudents}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Turmas Ativas</span>
                  <span className="font-semibold text-blue-600">{schoolStats.activeClasses}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Receita Mensal</span>
                  <span className="font-semibold text-purple-600">R$ {schoolStats.monthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pagamentos Pendentes</span>
                  <span className="font-semibold text-orange-600">{schoolStats.pendingPayments}</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/escolinha/relatorios')}
              >
                Gerar Relatório Detalhado
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Pagamentos do Mês</CardTitle>
              <CardDescription>
                Situação financeira atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
                <div className="text-sm text-muted-foreground mb-4">Taxa de adimplência</div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">135</div>
                    <div className="text-muted-foreground">Pagos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-red-600">15</div>
                    <div className="text-muted-foreground">Pendentes</div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/escolinha/mensalidades')}
              >
                Gerenciar Mensalidades
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default School;
