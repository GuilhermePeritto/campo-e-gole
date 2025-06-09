
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  BookOpen, 
  GraduationCap,
  UserCheck,
  ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const School = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Alunos',
      description: 'Gerenciar cadastro de alunos',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      path: '/escolinha/alunos'
    },
    {
      title: 'Professores',
      description: 'Gerenciar cadastro de professores',
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      path: '/escolinha/professores'
    },
    {
      title: 'Turmas',
      description: 'Gerenciar turmas e horários',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      path: '/escolinha/turmas'
    },
    {
      title: 'Pagamentos',
      description: 'Controle de mensalidades',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      path: '/escolinha/pagamentos'
    }
  ];

  const reports = [
    {
      title: 'Relatório de Alunos',
      description: 'Visualizar estatísticas dos alunos',
      path: '/escolinha/relatorios'
    },
    {
      title: 'Relatório Financeiro',
      description: 'Receitas e inadimplência',
      path: '/escolinha/relatorios'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Escolinha de Futebol</h1>
              <p className="text-blue-100 mt-1">
                Gerencie alunos, professores, turmas e pagamentos
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Alunos</p>
                  <p className="text-3xl font-bold">42</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Professores</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Turmas Ativas</p>
                  <p className="text-3xl font-bold">6</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receita Mensal</p>
                  <p className="text-3xl font-bold text-green-600">R$ 8.640</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={action.title} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(action.path)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className={`p-4 ${action.bgColor} rounded-lg`}>
                        <Icon className={`h-8 w-8 ${action.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{action.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                Atividades Recentes
              </CardTitle>
              <CardDescription>
                Últimas atividades do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Novo aluno cadastrado</p>
                    <p className="text-xs text-muted-foreground">Ana Silva - Infantil A</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2h atrás</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pagamento recebido</p>
                    <p className="text-xs text-muted-foreground">João Santos - R$ 150,00</p>
                  </div>
                  <span className="text-xs text-muted-foreground">4h atrás</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nova turma criada</p>
                    <p className="text-xs text-muted-foreground">Juvenil C - Prof. Carlos</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1d atrás</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Relatórios
              </CardTitle>
              <CardDescription>
                Acesse relatórios e estatísticas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reports.map((report) => (
                  <Button
                    key={report.title}
                    variant="outline"
                    className="w-full justify-between h-auto p-4"
                    onClick={() => navigate(report.path)}
                  >
                    <div className="text-left">
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default School;
