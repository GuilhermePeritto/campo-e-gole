
import { Toaster } from '@/components/ui/toaster';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Bar from './pages/Bar';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Financial from './pages/Financial';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import School from './pages/School';
import Settings from './pages/Settings';

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
import SchoolClasses from './pages/escolinha/Classes';
import SchoolClassStudents from './pages/escolinha/ClassStudents';
import SchoolEditClass from './pages/escolinha/EditClass';
import SchoolEditStudent from './pages/escolinha/EditStudent';
import SchoolNewClass from './pages/escolinha/NewClass';
import SchoolNewStudent from './pages/escolinha/NewStudent';
import SchoolPayments from './pages/escolinha/Payments';
import SchoolReceivePayment from './pages/escolinha/ReceivePayment';
import SchoolReports from './pages/escolinha/Reports';
import SchoolStudentHistory from './pages/escolinha/StudentHistory';
import SchoolStudents from './pages/escolinha/Students';

// Financial pages
import FinancialAccountsPayable from './pages/financeiro/AccountsPayable';
import FinancialAccountsReceivable from './pages/financeiro/AccountsReceivable';
import FinancialCashFlow from './pages/financeiro/CashFlow';
import FinancialExpenses from './pages/financeiro/Expenses';
import FinancialNewExpense from './pages/financeiro/NewExpense';
import FinancialNewRevenue from './pages/financeiro/NewRevenue';
import FinancialReceivePayment from './pages/financeiro/ReceivePayment';
import FinancialReports from './pages/financeiro/Reports';
import FinancialRevenues from './pages/financeiro/Revenues';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/painel" element={<Dashboard />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/eventos/reservas" element={<EventsCalendar />} />
              <Route path="/eventos/clientes" element={<EventsClients />} />
              <Route path="/eventos/clientes/novo" element={<EventsNewClient />} />
              <Route path="/eventos/clientes/:id/editar" element={<EventsEditClient />} />
              <Route path="/eventos/clientes/:id/historico" element={<EventsClientHistory />} />
              <Route path="/eventos/locais" element={<EventsVenues />} />
              <Route path="/eventos/locais/novo" element={<EventsNewVenue />} />
              <Route path="/eventos/locais/:id/editar" element={<EventsEditVenue />} />
              <Route path="/eventos/novo" element={<EventsReservation />} />
              <Route path="/eventos/:id/editar" element={<EventsEditReservation />} />
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
              <Route path="/escolinha/alunos" element={<SchoolStudents />} />
              <Route path="/escolinha/alunos/novo" element={<SchoolNewStudent />} />
              <Route path="/escolinha/alunos/:id/editar" element={<SchoolEditStudent />} />
              <Route path="/escolinha/alunos/:id/historico" element={<SchoolStudentHistory />} />
              <Route path="/escolinha/turmas" element={<SchoolClasses />} />
              <Route path="/escolinha/turmas/nova" element={<SchoolNewClass />} />
              <Route path="/escolinha/turmas/:id/editar" element={<SchoolEditClass />} />
              <Route path="/escolinha/turmas/:id/alunos" element={<SchoolClassStudents />} />
              <Route path="/escolinha/mensalidades" element={<SchoolPayments />} />
              <Route path="/escolinha/mensalidades/:id/receber" element={<SchoolReceivePayment />} />
              <Route path="/escolinha/relatorios" element={<SchoolReports />} />
              <Route path="/financeiro" element={<Financial />} />
              <Route path="/financeiro/receitas" element={<FinancialRevenues />} />
              <Route path="/financeiro/receitas/novo" element={<FinancialNewRevenue />} />
              <Route path="/financeiro/despesas" element={<FinancialExpenses />} />
              <Route path="/financeiro/despesas/novo" element={<FinancialNewExpense />} />
              <Route path="/financeiro/contas-a-pagar" element={<FinancialAccountsPayable />} />
              <Route path="/financeiro/contas-a-receber" element={<FinancialAccountsReceivable />} />
              <Route path="/financeiro/contas-a-receber/:id/receber" element={<FinancialReceivePayment />} />
              <Route path="/financeiro/fluxo-de-caixa" element={<FinancialCashFlow />} />
              <Route path="/financeiro/relatorios" element={<FinancialReports />} />
              <Route path="/configuracoes" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
