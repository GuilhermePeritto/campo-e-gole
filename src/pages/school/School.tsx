
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Calendar, DollarSign, TrendingUp, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const School = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total de Alunos', value: '45', icon: Users, color: 'text-blue-600' },
    { title: 'Turmas Ativas', value: '6', icon: BookOpen, color: 'text-green-600' },
    { title: 'Mensalidades em Dia', value: '38', icon: DollarSign, color: 'text-green-600' },
    { title: 'Mensalidades Atrasadas', value: '7', icon: TrendingUp, color: 'text-red-600' }
  ];

  const quickActions = [
    { title: 'Alunos', description: 'Gerenciar cadastro de alunos', path: '/school/students', icon: Users },
    { title: 'Turmas', description: 'Organizar turmas e horários', path: '/school/classes', icon: Calendar },
    { title: 'Mensalidades', description: 'Controlar pagamentos', path: '/school/payments', icon: DollarSign },
    { title: 'Relatórios', description: 'Visualizar relatórios', path: '/school/reports', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-bold text-black">Escolinha de Futebol</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-black">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-black">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse rapidamente as principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center gap-3 border-black text-black hover:bg-black hover:text-white"
                  onClick={() => navigate(action.path)}
                >
                  <action.icon className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-sm opacity-70">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default School;
