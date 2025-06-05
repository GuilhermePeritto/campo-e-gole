import ExportButton from '@/components/ExportButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const EscolinhaRelatorios = () => {
  const navigate = useNavigate();

  const monthlyData = [
    { month: 'Jan', revenue: 8500, students: 65 },
    { month: 'Fev', revenue: 9200, students: 68 },
    { month: 'Mar', revenue: 10100, students: 72 },
    { month: 'Abr', revenue: 11300, students: 78 },
    { month: 'Mai', revenue: 12000, students: 82 },
    { month: 'Jun', revenue: 12750, students: 85 }
  ];

  const paymentStatusData = [
    { name: 'Em dia', value: 77, color: '#22c55e' },
    { name: 'Atrasado', value: 8, color: '#ef4444' }
  ];

  const classData = [
    { class: 'Infantil A', students: 12 },
    { class: 'Infantil B', students: 15 },
    { class: 'Juvenil A', students: 18 },
    { class: 'Juvenil B', students: 10 }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/school')}
                className="gap-2 text-black hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Escolinha
              </Button>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <h1 className="text-xl font-semibold text-black">Relatórios da Escolinha</h1>
              </div>
            </div>
            <ExportButton 
              data={monthlyData}
              filename="relatorio-escolinha"
              title="Relatório da Escolinha"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-black">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Total de Alunos</p>
                <p className="text-3xl font-bold text-black">85</p>
                <p className="text-sm text-green-600">+3 este mês</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                <p className="text-3xl font-bold text-black">R$ 12.750</p>
                <p className="text-sm text-green-600">+6% vs mês anterior</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Taxa de Ocupação</p>
                <p className="text-3xl font-bold text-black">92%</p>
                <p className="text-sm text-gray-600">55/60 vagas</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Inadimplência</p>
                <p className="text-3xl font-bold text-black">9.4%</p>
                <p className="text-sm text-red-600">8 alunos atrasados</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Evolução Mensal</CardTitle>
              <CardDescription>
                Receita e número de alunos ao longo do ano
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#22c55e" name="Receita (R$)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Status de Pagamentos</CardTitle>
              <CardDescription>
                Distribuição dos alunos por situação financeira
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Class Distribution */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Distribuição por Turma</CardTitle>
            <CardDescription>
              Número de alunos em cada turma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#000000" name="Alunos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EscolinhaRelatorios;
