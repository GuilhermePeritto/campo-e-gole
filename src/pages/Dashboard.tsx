
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SG</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Sistema de Gestão</h1>
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
                onClick={() => navigate('/configuracao')}
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Bem-vindo ao Sistema de Gestão
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Escolha um módulo para começar a gerenciar seu negócio
          </p>
        </div>

        {/* Módulos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Módulo Eventos */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-gradient-to-br from-green-500 to-green-600 border-0"
            onClick={() => navigate('/eventos')}
          >
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Eventos</h3>
                <p className="text-green-100 text-sm">
                  Gerencie reservas de quadras e espaços esportivos
                </p>
              </div>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Gestão de clientes</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Controle de locais</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Contas a receber</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Módulo Bar */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-gradient-to-br from-blue-500 to-blue-600 border-0"
            onClick={() => navigate('/bar')}
          >
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Coffee className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Bar</h3>
                <p className="text-blue-100 text-sm">
                  Controle de vendas, estoque e comandas do bar
                </p>
              </div>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>Gestão de produtos</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Controle de vendas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Relatórios de vendas</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Módulo Escola */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-gradient-to-br from-purple-500 to-purple-600 border-0"
            onClick={() => navigate('/school')}
          >
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Escolinha</h3>
                <p className="text-purple-100 text-sm">
                  Administre alunos, turmas e mensalidades
                </p>
              </div>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Gestão de alunos</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Controle de turmas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Mensalidades</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Módulo Financeiro */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-gradient-to-br from-orange-500 to-orange-600 border-0"
            onClick={() => navigate('/financeiro')}
          >
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Financeiro</h3>
                <p className="text-orange-100 text-sm">
                  Controle financeiro completo do sistema
                </p>
              </div>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Receitas e despesas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span>Relatórios financeiros</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Fluxo de caixa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Reservas Hoje</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Coffee className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">R$ 1.250</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Vendas Bar Hoje</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <GraduationCap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Alunos Ativos</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">R$ 5.420</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Receita Hoje</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
