import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

// Events pages
import EventsCalendar from './pages/eventos/Calendar';
import EventsClientHistory from './pages/eventos/ClientHistory';
import EventsClients from './pages/eventos/Clients';
import EventsEditClient from './pages/eventos/EditClient';
import EventsEditReceivable from './pages/eventos/EditReceivable';
import EventsEditReservation from './pages/eventos/EditReservation';
import EventsEditVenue from './pages/eventos/EditVenue';
import EventsNewClient from './pages/eventos/NewClient';
import EventsNewReceivable from './pages/eventos/NewReceivable';
import EventsReservation from './pages/eventos/NewReservation';
import EventsNewVenue from './pages/eventos/NewVenue';
import EventsReceivables from './pages/eventos/Receivables';
import EventsReceivePayment from './pages/eventos/ReceivePayment';
import EventsReports from './pages/eventos/Reports';
import EventsVenues from './pages/eventos/Venues';

// Bar pages
import BarCheckout from './pages/bar/Checkout';
import BarComandas from './pages/bar/Comandas';
import BarEditProduct from './pages/bar/EditProduct';
import BarInventory from './pages/bar/Inventory';
import BarNewComanda from './pages/bar/NewComanda';
import BarNewProduct from './pages/bar/NewProduct';
import BarNewSale from './pages/bar/NewSale';
import BarProducts from './pages/bar/Products';
import BarReports from './pages/bar/Reports';
import BarUnifiedSale from './pages/bar/UnifiedSale';
import BarViewComanda from './pages/bar/ViewComanda';

// School pages
import ClassStudents from '@/pages/escolinha/ClassStudents';
import Classes from '@/pages/escolinha/Classes';
import EditClass from '@/pages/escolinha/EditClass';
import EditStudent from '@/pages/escolinha/EditStudent';
import EditTeacher from '@/pages/escolinha/EditTeacher';
import NewClass from '@/pages/escolinha/NewClass';
import NewStudent from '@/pages/escolinha/NewStudent';
import NewTeacher from '@/pages/escolinha/NewTeacher';
import Payments from '@/pages/escolinha/Payments';
import ReceivePayment from '@/pages/escolinha/ReceivePayment';
import Reports from '@/pages/escolinha/Reports';
import StudentHistory from '@/pages/escolinha/StudentHistory';
import Students from '@/pages/escolinha/Students';
import TeacherReport from '@/pages/escolinha/TeacherReport';
import Teachers from '@/pages/escolinha/Teachers';
import AttendanceCall from '@/pages/escolinha/AttendanceCall';

// Financeiro pages
import AccountsPayable from '@/pages/financeiro/AccountsPayable';
import AccountsReceivable from '@/pages/financeiro/AccountsReceivable';
import CashFlow from '@/pages/financeiro/CashFlow';
import Expenses from '@/pages/financeiro/Expenses';
import FinanceiroRelatorios from '@/pages/financeiro/Reports';
import NewExpense from '@/pages/financeiro/NewExpense';
import NewRevenue from '@/pages/financeiro/NewRevenue';
import FinanceiroReceivePayment from '@/pages/financeiro/ReceivePayment';
import Revenues from '@/pages/financeiro/Revenues';
import TeacherPaymentReport from '@/pages/financeiro/TeacherPaymentReport';

import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import School from './pages/School';
import Settings from './pages/Settings';
import UniversalReceivePayment from './pages/UniversalReceivePayment';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/painel" element={<Dashboard />} />
                
                {/* Rota universal de recebimento */}
                <Route path="/pagamento-universal" element={<UniversalReceivePayment />} />
                
                <Route path="/eventos" element={<Events />} />
                <Route path="/eventos/calendario" element={<EventsCalendar />} />
                <Route path="/eventos/locais" element={<EventsVenues />} />
                <Route path="/eventos/locais/novo" element={<EventsNewVenue />} />
                <Route path="/eventos/locais/:id/editar" element={<EventsEditVenue />} />
                <Route path="/eventos/clientes" element={<EventsClients />} />
                <Route path="/eventos/clientes/novo" element={<EventsNewClient />} />
                <Route path="/eventos/clientes/:id/editar" element={<EventsEditClient />} />
                <Route path="/eventos/clientes/:id/historico" element={<EventsClientHistory />} />
                <Route path="/eventos/reservas/nova" element={<EventsReservation />} />
                <Route path="/eventos/reservas/:id/editar" element={<EventsEditReservation />} />
                <Route path="/eventos/contas-a-receber" element={<EventsReceivables />} />
                <Route path="/eventos/contas-a-receber/novo" element={<EventsNewReceivable />} />
                <Route path="/eventos/contas-a-receber/:id/editar" element={<EventsEditReceivable />} />
                <Route path="/eventos/contas-a-receber/:id/receber" element={<EventsReceivePayment />} />
                <Route path="/eventos/relatorios" element={<EventsReports />} />
                
                <Route path="/bar" element={<Bar />} />
                <Route path="/bar/produtos" element={<BarProducts />} />
                <Route path="/bar/produtos/novo" element={<BarNewProduct />} />
                <Route path="/bar/produtos/:id/editar" element={<BarEditProduct />} />
                <Route path="/bar/estoque" element={<BarInventory />} />
                <Route path="/bar/comandas" element={<BarComandas />} />
                <Route path="/bar/comandas/novo" element={<BarNewComanda />} />
                <Route path="/bar/comandas/:id" element={<BarViewComanda />} />
                <Route path="/bar/venda-unificada" element={<BarUnifiedSale />} />
                <Route path="/bar/nova-venda" element={<BarNewSale />} />
                <Route path="/bar/checkout" element={<BarCheckout />} />
                <Route path="/bar/relatorios" element={<BarReports />} />
                
                <Route path="/escolinha" element={<School />} />
                <Route path="/escolinha/alunos" element={<Students />} />
                <Route path="/escolinha/alunos/novo" element={<NewStudent />} />
                <Route path="/escolinha/alunos/:id/editar" element={<EditStudent />} />
                <Route path="/escolinha/alunos/:id/historico" element={<StudentHistory />} />
                <Route path="/escolinha/turmas" element={<Classes />} />
                <Route path="/escolinha/turmas/nova" element={<NewClass />} />
                <Route path="/escolinha/turmas/:id/editar" element={<EditClass />} />
                <Route path="/escolinha/turmas/:classId/alunos" element={<ClassStudents />} />
                <Route path="/escolinha/professores" element={<Teachers />} />
                <Route path="/escolinha/professores/novo" element={<NewTeacher />} />
                <Route path="/escolinha/professores/:id/editar" element={<EditTeacher />} />
                <Route path="/escolinha/professores/:id/relatorio" element={<TeacherReport />} />
                <Route path="/escolinha/mensalidades" element={<Payments />} />
                <Route path="/escolinha/receber" element={<ReceivePayment />} />
                <Route path="/escolinha/receber/:id" element={<ReceivePayment />} />
                <Route path="/escolinha/relatorios" element={<Reports />} />
                
                <Route path="/financeiro" element={<Financial />} />
                <Route path="/financeiro/receitas" element={<Revenues />} />
                <Route path="/financeiro/receitas/nova" element={<NewRevenue />} />
                <Route path="/financeiro/despesas" element={<Expenses />} />
                <Route path="/financeiro/despesas/nova" element={<NewExpense />} />
                <Route path="/financeiro/contas-receber" element={<AccountsReceivable />} />
                <Route path="/financeiro/contas-pagar" element={<AccountsPayable />} />
                <Route path="/financeiro/fluxo-caixa" element={<CashFlow />} />
                <Route path="/financeiro/receber" element={<FinanceiroReceivePayment />} />
                <Route path="/financeiro/receber/:id" element={<FinanceiroReceivePayment />} />
                <Route path="/financeiro/relatorios" element={<FinanceiroRelatorios />} />
                <Route path="/financeiro/relatorios/professores" element={<TeacherPaymentReport />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
