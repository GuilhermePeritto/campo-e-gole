
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Bar from './pages/Bar';
import School from './pages/School';
import Financial from './pages/Financial';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Events pages
import EventsCalendar from './pages/eventos/Calendar';
import EventsClients from './pages/eventos/Clients';
import EventsVenues from './pages/eventos/Venues';
import EventsReservation from './pages/eventos/NewReservation';
import EventsEditReservation from './pages/eventos/EditReservation';
import EventsNewClient from './pages/eventos/NewClient';
import EventsEditClient from './pages/eventos/EditClient';
import EventsNewVenue from './pages/eventos/NewVenue';
import EventsEditVenue from './pages/eventos/EditVenue';
import EventsReceivables from './pages/eventos/Receivables';
import EventsNewReceivable from './pages/eventos/NewReceivable';
import EventsEditReceivable from './pages/eventos/EditReceivable';
import EventsReceivePayment from './pages/eventos/ReceivePayment';
import EventsReports from './pages/eventos/Reports';
import EventsClientHistory from './pages/eventos/ClientHistory';

// Bar pages
import BarProducts from './pages/bar/Products';
import BarNewProduct from './pages/bar/NewProduct';
import BarEditProduct from './pages/bar/EditProduct';
import BarInventory from './pages/bar/Inventory';
import BarComandas from './pages/bar/Comandas';
import BarNewComanda from './pages/bar/NewComanda';
import BarUnifiedSale from './pages/bar/UnifiedSale';
import BarNewSale from './pages/bar/NewSale';
import BarCheckout from './pages/bar/Checkout';
import BarReports from './pages/bar/Reports';

// School pages
import SchoolStudents from './pages/escolinha/Students';
import SchoolNewStudent from './pages/escolinha/NewStudent';
import SchoolEditStudent from './pages/escolinha/EditStudent';
import SchoolClasses from './pages/escolinha/Classes';
import SchoolEditClass from './pages/escolinha/EditClass';
import SchoolClassStudents from './pages/escolinha/ClassStudents';
import SchoolPayments from './pages/escolinha/Payments';
import SchoolReports from './pages/escolinha/Reports';
import SchoolStudentHistory from './pages/escolinha/StudentHistory';

// Financial pages
import FinancialRevenues from './pages/financeiro/Revenues';
import FinancialNewRevenue from './pages/financeiro/NewRevenue';
import FinancialExpenses from './pages/financeiro/Expenses';
import FinancialNewExpense from './pages/financeiro/NewExpense';
import FinancialAccountsPayable from './pages/financeiro/AccountsPayable';
import FinancialAccountsReceivable from './pages/financeiro/AccountsReceivable';
import FinancialReceivePayment from './pages/financeiro/ReceivePayment';
import FinancialCashFlow from './pages/financeiro/CashFlow';
import FinancialReports from './pages/financeiro/Reports';

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
              <Route path="/eventos/calendario" element={<EventsCalendar />} />
              <Route path="/eventos/clientes" element={<EventsClients />} />
              <Route path="/eventos/clientes/novo" element={<EventsNewClient />} />
              <Route path="/eventos/clientes/:id/editar" element={<EventsEditClient />} />
              <Route path="/eventos/clientes/:id/historico" element={<EventsClientHistory />} />
              <Route path="/eventos/locais" element={<EventsVenues />} />
              <Route path="/eventos/locais/novo" element={<EventsNewVenue />} />
              <Route path="/eventos/locais/:id/editar" element={<EventsEditVenue />} />
              <Route path="/eventos/reservas/nova" element={<EventsReservation />} />
              <Route path="/eventos/reservas/:id/editar" element={<EventsEditReservation />} />
              <Route path="/eventos/contas-receber" element={<EventsReceivables />} />
              <Route path="/eventos/contas-receber/nova" element={<EventsNewReceivable />} />
              <Route path="/eventos/contas-receber/:id/editar" element={<EventsEditReceivable />} />
              <Route path="/eventos/contas-receber/:id/receber" element={<EventsReceivePayment />} />
              <Route path="/eventos/relatorios" element={<EventsReports />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/bar/produtos" element={<BarProducts />} />
              <Route path="/bar/produtos/novo" element={<BarNewProduct />} />
              <Route path="/bar/produtos/:id/editar" element={<BarEditProduct />} />
              <Route path="/bar/estoque" element={<BarInventory />} />
              <Route path="/bar/comandas" element={<BarComandas />} />
              <Route path="/bar/comandas/nova" element={<BarNewComanda />} />
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
              <Route path="/escolinha/turmas/:id/editar" element={<SchoolEditClass />} />
              <Route path="/escolinha/turmas/:id/alunos" element={<SchoolClassStudents />} />
              <Route path="/escolinha/pagamentos" element={<SchoolPayments />} />
              <Route path="/escolinha/relatorios" element={<SchoolReports />} />
              <Route path="/financeiro" element={<Financial />} />
              <Route path="/financeiro/receitas" element={<FinancialRevenues />} />
              <Route path="/financeiro/receitas/nova" element={<FinancialNewRevenue />} />
              <Route path="/financeiro/despesas" element={<FinancialExpenses />} />
              <Route path="/financeiro/despesas/nova" element={<FinancialNewExpense />} />
              <Route path="/financeiro/contas-pagar" element={<FinancialAccountsPayable />} />
              <Route path="/financeiro/contas-receber" element={<FinancialAccountsReceivable />} />
              <Route path="/financeiro/contas-receber/:id/receber" element={<FinancialReceivePayment />} />
              <Route path="/financeiro/fluxo-caixa" element={<FinancialCashFlow />} />
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
