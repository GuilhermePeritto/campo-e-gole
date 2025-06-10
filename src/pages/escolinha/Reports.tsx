
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

  // Dados de pagamento aos professores por mês
  const teacherPaymentData = [
    { teacher: 'Carlos Silva', jan: 2400, fev: 2600, mar: 2800, abr: 3000, mai: 3200, jun: 3400 },
    { teacher: 'Ana Santos', jan: 2200, fev: 2400, mar: 2500, abr: 2700, mai: 2900, jun: 3100 },
    { teacher: 'João Pereira', jan: 1800, fev: 2000, mar: 2200, abr: 2300, mai: 2500, jun: 2700 },
    { teacher: 'Maria Oliveira', jan: 2000, fev: 2100, mar: 2300, abr: 2400, mai: 2600, jun: 2800 },
    { teacher: 'Pedro Costa', jan: 1600, fev: 1800, mar: 1900, abr: 2000, mai: 2200, jun: 2400 }
  ];

  // Dados consolidados de pagamento mensal
  const monthlyTeacherPayments = [
    { month: 'Jan', total: 10000 },
    { month: 'Fev', total: 10900 },
    { month: 'Mar', total: 11700 },
    { month: 'Abr', total: 12400 },
    { month: 'Mai', total: 13400 },
    { month: 'Jun', total: 14400 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/escolinha')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Escolinha
              </Button>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <h1 className="text-xl font-semibold">Relatórios da Escolinha</h1>
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
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Total de Alunos</p>
                <p className="text-3xl font-bold">85</p>
                <p className="text-sm text-green-600">+3 este mês</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Receita Mensal</p>
                <p className="text-3xl font-bold">R$ 12.750</p>
                <p className="text-sm text-green-600">+6% vs mês anterior</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Taxa de Ocupação</p>
                <p className="text-3xl font-bold">92%</p>
                <p className="text-sm text-muted-foreground">55/60 vagas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Pagamento Professores</p>
                <p className="text-3xl font-bold">R$ 14.400</p>
                <p className="text-sm text-orange-600">Jun/2024</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal</CardTitle>
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

          <Card>
            <CardHeader>
              <CardTitle>Status de Pagamentos</CardTitle>
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

        {/* Teacher Payment Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos aos Professores</CardTitle>
              <CardDescription>
                Evolução mensal dos pagamentos aos professores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTeacherPayments}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Total Pago']} />
                  <Bar dataKey="total" fill="#f59e0b" name="Total Pago (R$)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Turma</CardTitle>
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
        </div>

        {/* Teacher Payment Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhamento por Professor</CardTitle>
            <CardDescription>
              Valores pagos a cada professor por mês (baseado em aulas ministradas)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Professor</th>
                    <th className="text-center p-3 font-semibold">Jan</th>
                    <th className="text-center p-3 font-semibold">Fev</th>
                    <th className="text-center p-3 font-semibold">Mar</th>
                    <th className="text-center p-3 font-semibold">Abr</th>
                    <th className="text-center p-3 font-semibold">Mai</th>
                    <th className="text-center p-3 font-semibold">Jun</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherPaymentData.map((teacher, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{teacher.teacher}</td>
                      <td className="text-center p-3">R$ {teacher.jan.toLocaleString()}</td>
                      <td className="text-center p-3">R$ {teacher.fev.toLocaleString()}</td>
                      <td className="text-center p-3">R$ {teacher.mar.toLocaleString()}</td>
                      <td className="text-center p-3">R$ {teacher.abr.toLocaleString()}</td>
                      <td className="text-center p-3">R$ {teacher.mai.toLocaleString()}</td>
                      <td className="text-center p-3">R$ {teacher.jun.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EscolinhaRelatorios;
