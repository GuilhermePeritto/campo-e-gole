
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from '@/components/ui/sonner';

// Main pages
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Financial from './pages/Financial';
import School from './pages/School';
import Bar from './pages/Bar';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import UniversalReceivePayment from './pages/UniversalReceivePayment';

// Events pages
import EventsCalendar from './pages/eventos/Calendar';
import EventsClients from './pages/eventos/Clients';
import EventsNewClient from './pages/eventos/NewClient';
import EventsEditClient from './pages/eventos/EditClient';
import EventsClientHistory from './pages/eventos/ClientHistory';
import EventsVenues from './pages/eventos/Venues';
import EventsNewVenue from './pages/eventos/NewVenue';
import EventsEditVenue from './pages/eventos/EditVenue';
import EventsNewReservation from './pages/eventos/NewReservation';
import EventsEditReservation from './pages/eventos/EditReservation';
import EventsReceivables from './pages/eventos/Receivables';
import EventsNewReceivable from './pages/eventos/NewReceivable';
import EventsEditReceivable from './pages/eventos/EditReceivable';
import EventsReceivePayment from './pages/eventos/ReceivePayment';
import EventsReports from './pages/eventos/Reports';

// Financial pages
import FinanceiroReceitas from './pages/financeiro/Revenues';
import FinanceiroNovaReceita from './pages/financeiro/NewRevenue';
import FinanceiroDespesas from './pages/financeiro/Expenses';
import FinanceiroNovaDespesa from './pages/financeiro/NewExpense';
import FinanceiroContasReceber from './pages/financeiro/AccountsReceivable';
import FinanceiroContasPagar from './pages/financeiro/AccountsPayable';
import FinanceiroFluxoCaixa from './pages/financeiro/CashFlow';
import FinanceiroRelatorios from './pages/financeiro/Reports';
import FinanceiroRelatorioProfessores from './pages/financeiro/TeacherPaymentReport';
import FinanceiroReceberPagamento from './pages/financeiro/ReceivePayment';
import CustomReport from './pages/financeiro/CustomReport';

// School pages
import EscolinhaClasses from './pages/escolinha/Classes';
import EscolinhaNewClass from './pages/escolinha/NewClass';
import EscolinhaEditClass from './pages/escolinha/EditClass';
import EscolinhaClassStudents from './pages/escolinha/ClassStudents';
import EscolinhaStudents from './pages/escolinha/Students';
import EscolinhaNewStudent from './pages/escolinha/NewStudent';
import EscolinhaEditStudent from './pages/escolinha/EditStudent';
import EscolinhaStudentHistory from './pages/escolinha/StudentHistory';
import EscolinhaTeachers from './pages/escolinha/Teachers';
import EscolinhaNewTeacher from './pages/escolinha/NewTeacher';
import EscolinhaEditTeacher from './pages/escolinha/EditTeacher';
import EscolinhaTeacherReport from './pages/escolinha/TeacherReport';
import EscolinhaAttendanceCall from './pages/escolinha/AttendanceCall';
import EscolinhaPublicAttendanceCall from './pages/escolinha/PublicAttendanceCall';
import EscolinhaPayments from './pages/escolinha/Payments';
import EscolinhaReceivePayment from './pages/escolinha/ReceivePayment';
import EscolinhaReports from './pages/escolinha/Reports';

// Bar pages
import BarProducts from './pages/bar/Products';
import BarNewProduct from './pages/bar/NewProduct';
import BarEditProduct from './pages/bar/EditProduct';
import BarInventory from './pages/bar/Inventory';
import BarComandas from './pages/bar/Comandas';
import BarNewComanda from './pages/bar/NewComanda';
import BarViewComanda from './pages/bar/ViewComanda';
import BarNewSale from './pages/bar/NewSale';
import BarUnifiedSale from './pages/bar/UnifiedSale';
import BarCheckout from './pages/bar/Checkout';
import BarReports from './pages/bar/Reports';

// Settings pages
import ConfiguracoesNewUser from './pages/configuracoes/NewUser';
import ConfiguracoesEditUser from './pages/configuracoes/EditUser';
import ConfiguracoesNewGroup from './pages/configuracoes/NewGroup';
import ConfiguracoesEditGroup from './pages/configuracoes/EditGroup';

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
                <Route path="/painel" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/eventos" element={<Events />} />
                <Route path="/financeiro" element={<Financial />} />
                <Route path="/escolinha" element={<School />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/configuracoes" element={<Settings />} />
                <Route path="/receber-pagamento" element={<UniversalReceivePayment />} />

                {/* Events routes */}
                <Route path="/eventos/calendario" element={<EventsCalendar />} />
                <Route path="/eventos/clientes" element={<EventsClients />} />
                <Route path="/eventos/clientes/novo" element={<EventsNewClient />} />
                <Route path="/eventos/clientes/:id/editar" element={<EventsEditClient />} />
                <Route path="/eventos/clientes/:id/historico" element={<EventsClientHistory />} />
                <Route path="/eventos/espacos" element={<EventsVenues />} />
                <Route path="/eventos/locais" element={<EventsVenues />} />
                <Route path="/eventos/espacos/novo" element={<EventsNewVenue />} />
                <Route path="/eventos/locais/novo" element={<EventsNewVenue />} />
                <Route path="/eventos/espacos/:id/editar" element={<EventsEditVenue />} />
                <Route path="/eventos/locais/:id/editar" element={<EventsEditVenue />} />
                <Route path="/eventos/reservas/nova" element={<EventsNewReservation />} />
                <Route path="/eventos/nova" element={<EventsNewReservation />} />
                <Route path="/eventos/reservas/:id/editar" element={<EventsEditReservation />} />
                <Route path="/eventos/contas-a-receber" element={<EventsReceivables />} />
                <Route path="/eventos/contas-a-receber/novo" element={<EventsNewReceivable />} />
                <Route path="/eventos/contas-a-receber/:id/editar" element={<EventsEditReceivable />} />
                <Route path="/eventos/receber-pagamento" element={<EventsReceivePayment />} />
                <Route path="/eventos/relatorios" element={<EventsReports />} />

                {/* Financial routes */}
                <Route path="/financeiro/receitas" element={<FinanceiroReceitas />} />
                <Route path="/financeiro/receitas/novo" element={<FinanceiroNovaReceita />} />
                <Route path="/financeiro/despesas" element={<FinanceiroDespesas />} />
                <Route path="/financeiro/despesas/novo" element={<FinanceiroNovaDespesa />} />
                <Route path="/financeiro/contas-a-receber" element={<FinanceiroContasReceber />} />
                <Route path="/financeiro/contas-a-pagar" element={<FinanceiroContasPagar />} />
                <Route path="/financeiro/fluxo-caixa" element={<FinanceiroFluxoCaixa />} />
                <Route path="/financeiro/relatorios" element={<FinanceiroRelatorios />} />
                <Route path="/financeiro/relatorios/personalizado" element={<CustomReport />} />
                <Route path="/financeiro/relatorios/professores" element={<FinanceiroRelatorioProfessores />} />
                <Route path="/financeiro/receber-pagamento" element={<FinanceiroReceberPagamento />} />

                {/* School routes */}
                <Route path="/escolinha/turmas" element={<EscolinhaClasses />} />
                <Route path="/escolinha/turmas/nova" element={<EscolinhaNewClass />} />
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
                <Route path="/escolinha/pagamentos" element={<EscolinhaPayments />} />
                <Route path="/escolinha/receber-pagamento" element={<EscolinhaReceivePayment />} />
                <Route path="/escolinha/relatorios" element={<EscolinhaReports />} />

                {/* Bar routes */}
                <Route path="/bar/produtos" element={<BarProducts />} />
                <Route path="/bar/produtos/novo" element={<BarNewProduct />} />
                <Route path="/bar/produtos/:id/editar" element={<BarEditProduct />} />
                <Route path="/bar/estoque" element={<BarInventory />} />
                <Route path="/bar/comandas" element={<BarComandas />} />
                <Route path="/bar/comandas/nova" element={<BarNewComanda />} />
                <Route path="/bar/comandas/:id" element={<BarViewComanda />} />
                <Route path="/bar/venda/nova" element={<BarNewSale />} />
                <Route path="/bar/vendas/nova" element={<BarNewSale />} />
                <Route path="/bar/nova-venda" element={<BarNewSale />} />
                <Route path="/bar/vendas/unificada" element={<BarUnifiedSale />} />
                <Route path="/bar/checkout" element={<BarCheckout />} />
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
