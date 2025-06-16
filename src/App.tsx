import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Main pages
import Bar from './pages/Bar';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Financial from './pages/Financial';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import School from './pages/School';
import Settings from './pages/Settings';
import UniversalReceivePayment from './pages/UniversalReceivePayment';

// Events pages
import EventsCalendar from './pages/eventos/agenda/Agenda';
import EventsClients from './pages/eventos/clientes/Clientes';
import EventsNewClient from './pages/eventos/clientes/NovoCliente';
import EventsEditClient from './pages/eventos/clientes/EditarCliente';
import EventsClientHistory from './pages/eventos/ClientHistory';
import EventsVenues from './pages/eventos/Venues';
import EventsNewVenue from './pages/eventos/NewVenue';
import EventsEditVenue from './pages/eventos/EditVenue';
import EventsNewReservation from './pages/eventos/NewReservation';
import EventsEditReservation from './pages/eventos/EditReservation';
import EventsReceivables from './pages/eventos/Receivables';
import EventsNewReceivable from './pages/eventos/contas-a-receber/NovoRecebivel';
import EventsEditReceivable from './pages/eventos/contas-a-receber/EditarRecebivel';
import EventsReceivePayment from './pages/eventos/financeiro/ReceberPagamento';
import EventsReports from './pages/eventos/Reports';

// Financial pages
import FinanceiroContasPagar from './pages/financeiro/AccountsPayable';
import FinanceiroContasReceber from './pages/financeiro/AccountsReceivable';
import FinanceiroFluxoCaixa from './pages/financeiro/CashFlow';
import CustomReport from './pages/financeiro/CustomReport';
import FinanceiroDespesas from './pages/financeiro/Expenses';
import FinanceiroNovaDespesa from './pages/financeiro/NewExpense';
import FinanceiroNewPayable from './pages/financeiro/NewPayable';
import FinanceiroNewReceivable from './pages/financeiro/NewReceivable';
import FinanceiroNovaReceita from './pages/financeiro/NewRevenue';
import FinanceiroReceberPagamento from './pages/financeiro/ReceivePayment';
import FinanceiroRelatorios from './pages/financeiro/Reports';
import FinanceiroReceitas from './pages/financeiro/Revenues';
import FinanceiroRelatorioProfessores from './pages/financeiro/TeacherPaymentReport';

// School pages
import EscolinhaAttendanceCall from './pages/escolinha/AttendanceCall';
import EscolinhaClasses from './pages/escolinha/Classes';
import EscolinhaClassStudents from './pages/escolinha/ClassStudents';
import EscolinhaEditClass from './pages/escolinha/EditClass';
import EscolinhaEditStudent from './pages/escolinha/EditStudent';
import EscolinhaEditTeacher from './pages/escolinha/EditTeacher';
import EscolinhaNewClass from './pages/escolinha/NewClass';
import EscolinhaNewStudent from './pages/escolinha/NewStudent';
import EscolinhaNewTeacher from './pages/escolinha/NewTeacher';
import EscolinhaPayments from './pages/escolinha/Payments';
import EscolinhaPublicAttendanceCall from './pages/escolinha/PublicAttendanceCall';
import EscolinhaReceivePayment from './pages/escolinha/ReceivePayment';
import EscolinhaReports from './pages/escolinha/Reports';
import EscolinhaStudentHistory from './pages/escolinha/StudentHistory';
import EscolinhaStudents from './pages/escolinha/Students';
import EscolinhaTeacherReport from './pages/escolinha/TeacherReport';
import EscolinhaTeachers from './pages/escolinha/Teachers';

// Bar pages
import BarCheckout from './pages/bar/Checkout';
import Comanda from './pages/bar/Comanda';
import BarEditProduct from './pages/bar/EditProduct';
import BarInventory from './pages/bar/Inventory';
import BarNewProduct from './pages/bar/NewProduct';
import BarProducts from './pages/bar/Products';
import BarReports from './pages/bar/Reports';
import BarUnifiedSale from './pages/bar/UnifiedSale';

// Settings pages
import ConfiguracoesEditGroup from './pages/configuracoes/EditGroup';
import ConfiguracoesEditUser from './pages/configuracoes/EditUser';
import ConfiguracoesNewGroup from './pages/configuracoes/NewGroup';
import ConfiguracoesNewUser from './pages/configuracoes/NewUser';

// Adicionar novas importações
import Comandas from './pages/bar/Comandas';
import InternalSystem from './pages/InternalSystem';
import InternalClients from './pages/sistema-interno/Clients';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Main routes */}
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/painel" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/receber-pagamento" element={<UniversalReceivePayment />} />

                {/* Sistema Interno routes */}
                <Route path="/sistema-interno" element={<InternalSystem />} />
                <Route path="/sistema-interno/clientes" element={<InternalClients />} />

                {/* Module routes */}
                <Route path="/eventos" element={<Events />} />
                <Route path="/financeiro" element={<Financial />} />
                <Route path="/escolinha" element={<School />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/configuracoes" element={<Settings />} />

                {/* Events routes */}
                <Route path="/eventos/calendario" element={<EventsCalendar />} />
                <Route path="/eventos/clientes" element={<EventsClients />} />
                <Route path="/eventos/clientes/novo" element={<EventsNewClient />} />
                <Route path="/eventos/clientes/:id/editar" element={<EventsEditClient />} />
                <Route path="/eventos/clientes/:id/historico" element={<EventsClientHistory />} />
                <Route path="/eventos/locais" element={<EventsVenues />} />
                <Route path="/eventos/locais/novo" element={<EventsNewVenue />} />
                <Route path="/eventos/locais/:id/editar" element={<EventsEditVenue />} />
                <Route path="/eventos/novo" element={<EventsNewReservation />} />
                <Route path="/eventos/reservas/:id/editar" element={<EventsEditReservation />} />
                <Route path="/eventos/contas-a-receber" element={<EventsReceivables />} />
                <Route path="/eventos/contas-a-receber/novo" element={<EventsNewReceivable />} />
                <Route path="/eventos/contas-a-receber/:id/editar" element={<EventsEditReceivable />} />
                <Route path="/eventos/contas-a-receber/:id/receber" element={<EventsReceivePayment />} />
                <Route path="/eventos/receber-pagamento" element={<EventsReceivePayment />} />
                <Route path="/eventos/relatorios" element={<EventsReports />} />

                {/* Financial routes */}
                <Route path="/financeiro/receitas" element={<FinanceiroReceitas />} />
                <Route path="/financeiro/receitas/novo" element={<FinanceiroNovaReceita />} />
                <Route path="/financeiro/despesas" element={<FinanceiroDespesas />} />
                <Route path="/financeiro/despesas/novo" element={<FinanceiroNovaDespesa />} />
                <Route path="/financeiro/contas-a-receber" element={<FinanceiroContasReceber />} />
                <Route path="/financeiro/contas-a-receber/novo" element={<FinanceiroNewReceivable />} />
                <Route path="/financeiro/contas-a-pagar" element={<FinanceiroContasPagar />} />
                <Route path="/financeiro/contas-a-pagar/novo" element={<FinanceiroNewPayable />} />
                <Route path="/financeiro/fluxo-caixa" element={<FinanceiroFluxoCaixa />} />
                <Route path="/financeiro/relatorios" element={<FinanceiroRelatorios />} />
                <Route path="/financeiro/relatorios/personalizado" element={<CustomReport />} />
                <Route path="/financeiro/relatorios/professores" element={<FinanceiroRelatorioProfessores />} />
                <Route path="/financeiro/receber-pagamento" element={<FinanceiroReceberPagamento />} />

                {/* School routes */}
                <Route path="/escolinha/turmas" element={<EscolinhaClasses />} />
                <Route path="/escolinha/turmas/novo" element={<EscolinhaNewClass />} />
                <Route path="/escolinha/turmas/:id/editar" element={<EscolinhaEditClass />} />
                <Route path="/escolinha/turmas/:id/alunos" element={<EscolinhaClassStudents />} />
                <Route path="/escolinha/alunos" element={<EscolinhaStudents />} />
                <Route path="/escolinha/alunos/novo" element={<EscolinhaNewStudent />} />
                <Route path="/escolinha/alunos/:id/editar" element={<EscolinhaEditStudent />} />
                <Route path="/escolinha/alunos/:id/historico" element={<EscolinhaStudentHistory />} />
                <Route path="/escolinha/professores" element={<EscolinhaTeachers />} />
                <Route path="/escolinha/professores/novo" element={<EscolinhaNewTeacher />} />
                <Route path="/escolinha/professores/:id/editar" element={<EscolinhaEditTeacher />} />
                <Route path="/escolinha/professores/:id/relatorio" element={<EscolinhaTeacherReport />} />
                <Route path="/escolinha/chamada" element={<EscolinhaAttendanceCall />} />
                <Route path="/escolinha/chamada-publica" element={<EscolinhaPublicAttendanceCall />} />
                <Route path="/escolinha/mensalidades" element={<EscolinhaPayments />} />
                <Route path="/escolinha/receber-pagamento" element={<EscolinhaReceivePayment />} />
                <Route path="/escolinha/relatorios" element={<EscolinhaReports />} />

                {/* Bar routes */}
                <Route path="/bar/comandas" element={<Comandas />} />
                <Route path="/bar/produtos" element={<BarProducts />} />
                <Route path="/bar/produtos/novo" element={<BarNewProduct />} />
                <Route path="/bar/produtos/:id/editar" element={<BarEditProduct />} />
                <Route path="/bar/estoque" element={<BarInventory />} />
                <Route path="/bar/comandas/novo" element={<Comanda />} />
                <Route path="/bar/comandas/:id" element={<Comanda />} />
                <Route path="/bar/checkout" element={<BarCheckout />} />
                <Route path="/bar/vendas/unificada" element={<BarUnifiedSale />} />
                <Route path="/bar/relatorios" element={<BarReports />} />

                {/* Settings routes */}
                <Route path="/configuracoes/usuarios/novo" element={<ConfiguracoesNewUser />} />
                <Route path="/configuracoes/usuarios/:id/editar" element={<ConfiguracoesEditUser />} />
                <Route path="/configuracoes/grupos/novo" element={<ConfiguracoesNewGroup />} />
                <Route path="/configuracoes/grupos/:id/editar" element={<ConfiguracoesEditGroup />} />

                {/* Fallback route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
