
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { BarChart3, BookOpen, Calendar, Coffee, CreditCard, DollarSign, GraduationCap, LogOut, MapPin, Moon, Package, PieChart, Settings, ShoppingCart, Sun, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const modules = [
    {
      title: 'Eventos',
      description: 'Gerencie reservas de quadras e espaços esportivos',
      icon: Calendar,
      color: 'bg-green-500',
      path: '/eventos',
      features: ['Gestão de clientes', 'Controle de locais', 'Contas a receber']
    },
    {
      title: 'Bar',
      description: 'Controle de vendas, estoque e comandas do bar',
      icon: Coffee,
      color: 'bg-blue-500',
      path: '/bar',
      features: ['Gestão de produtos', 'Controle de vendas', 'Relatórios de vendas']
    },
    {
      title: 'Escolinha',
      description: 'Administre alunos, turmas e mensalidades',
      icon: GraduationCap,
      color: 'bg-purple-500',
      path: '/escolinha',
      features: ['Gestão de alunos', 'Controle de turmas', 'Mensalidades']
    },
    {
      title: 'Financeiro',
      description: 'Controle financeiro completo do sistema',
      icon: DollarSign,
      color: 'bg-orange-500',
      path: '/financeiro',
      features: ['Receitas e despesas', 'Relatórios financeiros', 'Fluxo de caixa']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SG</span>
              </div>
              <h1 className="text-xl font-semibold">Sistema de Gestão</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/configuracoes')}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                Configurações
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Bem-vindo ao Sistema de Gestão
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha um módulo para começar a gerenciar seu negócio
          </p>
        </div>

        {/* Módulos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {modules.map((module, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-0 overflow-hidden"
              onClick={() => navigate(module.path)}
            >
              <div className={`${module.color} p-6 text-white`}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <module.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{module.title}</h3>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-sm mb-4">{module.description}</p>
                <div className="space-y-2">
                  {module.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                +8% em relação a ontem
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas Bar</CardTitle>
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 1.250</div>
              <p className="text-xs text-muted-foreground">
                +15% em relação a ontem
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +3 novos esta semana
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Hoje</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 5.420</div>
              <p className="text-xs text-muted-foreground">
                +12% em relação a ontem
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
