import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Bar from "./pages/Bar";
import Checkout from "./pages/bar/Checkout";
import Comandas from "./pages/bar/Comandas";
import EditProduct from "./pages/bar/EditProduct";
import Inventory from "./pages/bar/Inventory";
import NewComanda from "./pages/bar/NewComanda";
import NewProduct from "./pages/bar/NewProduct";
import NewSale from "./pages/bar/NewSale";
import Products from "./pages/bar/Products";
import { default as BarRelatorios } from "./pages/bar/Reports";
import UnifiedSale from "./pages/bar/UnifiedSale";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/escolinha/Classes";
import ClassStudents from "./pages/escolinha/ClassStudents";
import EditClass from "./pages/escolinha/EditClass";
import EditStudent from "./pages/escolinha/EditStudent";
import NewStudent from "./pages/escolinha/NewStudent";
import Payments from "./pages/escolinha/Payments";
import EscolinhaRelatorios from "./pages/escolinha/Reports";
import StudentHistory from "./pages/escolinha/StudentHistory";
import Students from "./pages/escolinha/Students";
import Calendar from "./pages/eventos/Calendar";
import ClientHistory from "./pages/eventos/ClientHistory";
import Clients from "./pages/eventos/Clients";
import EditClient from "./pages/eventos/EditClient";
import EditReceivable from "./pages/eventos/EditReceivable";
import EditReservation from "./pages/eventos/EditReservation";
import EditVenue from "./pages/eventos/EditVenue";
import NewClient from "./pages/eventos/NewClient";
import NewReceivable from "./pages/eventos/NewReceivable";
import NewReservation from "./pages/eventos/NewReservation";
import NewVenue from "./pages/eventos/NewVenue";
import Receivables from "./pages/eventos/Receivables";
import ReceberPagamento from "./pages/eventos/ReceivePayment";
import EventoRelatorios from "./pages/eventos/Reports";
import Venues from "./pages/eventos/Venues";
import Events from "./pages/Events";
import ContasAPagar from "./pages/financeiro/AccountsPayable";
import ContasAReceber from "./pages/financeiro/AccountsReceivable";
import FluxoDeCaixa from "./pages/financeiro/CashFlow";
import Despesas from "./pages/financeiro/Expenses";
import NovaDespesa from "./pages/financeiro/NewExpense";
import NovaReceita from "./pages/financeiro/NewRevenue";
import FinanceiroRelatorios from "./pages/financeiro/Reports";
import Receitas from "./pages/financeiro/Revenues";
import Financeiro from "./pages/Financial";
import Login from "./pages/Login";
import NaoEncontrada from "./pages/NotFound";
import School from "./pages/School";
import Settings from "./pages/Settings";
const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/painel" /> : <Login />} 
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/painel"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracao"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      {/* Events Routes */}
      <Route
        path="/eventos"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/agenda"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/novo-reserva"
        element={
          <ProtectedRoute>
            <NewReservation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/reserva/:id/editar"
        element={
          <ProtectedRoute>
            <EditReservation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/locais"
        element={
          <ProtectedRoute>
            <Venues />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/locais/novo"
        element={
          <ProtectedRoute>
            <NewVenue />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/locais/:id/editar"
        element={
          <ProtectedRoute>
            <EditVenue />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/clientes"
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/clientes/novo"
        element={
          <ProtectedRoute>
            <NewClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/clientes/:id/editar"
        element={
          <ProtectedRoute>
            <EditClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/clientes/:id/historico"
        element={
          <ProtectedRoute>
            <ClientHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/contas-a-receber"
        element={
          <ProtectedRoute>
            <Receivables />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/contas-a-receber/novo"
        element={
          <ProtectedRoute>
            <NewReceivable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/contas-a-receber/:id/editar"
        element={
          <ProtectedRoute>
            <EditReceivable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/contas-a-receber/:id/receber"
        element={
          <ProtectedRoute>
            <ReceberPagamento />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/relatorios"
        element={
          <ProtectedRoute>
            <EventoRelatorios />
          </ProtectedRoute>
        }
      />
      {/* Bar Routes */}
      <Route
        path="/bar"
        element={
          <ProtectedRoute>
            <Bar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/produtos"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/produtos/novo"
        element={
          <ProtectedRoute>
            <NewProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/produtos/:id/editar"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/estoque"
        element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/comandas"
        element={
          <ProtectedRoute>
            <Comandas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/comandas/novo"
        element={
          <ProtectedRoute>
            <NewComanda />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/comandas/:id/conferir"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/vendas/novo"
        element={
          <ProtectedRoute>
            <NewSale />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/vendas/unificada"
        element={
          <ProtectedRoute>
            <UnifiedSale />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/relatorios"
        element={
          <ProtectedRoute>
            <BarRelatorios />
          </ProtectedRoute>
        }
      />
      {/* School Routes */}
      <Route
        path="/escolinha"
        element={
          <ProtectedRoute>
            <School />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/alunos"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/alunos/novo"
        element={
          <ProtectedRoute>
            <NewStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/alunos/:id/editar"
        element={
          <ProtectedRoute>
            <EditStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/alunos/:id/historico"
        element={
          <ProtectedRoute>
            <StudentHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/turmas"
        element={
          <ProtectedRoute>
            <Classes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/turmas/:id/editar"
        element={
          <ProtectedRoute>
            <EditClass />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/turmas/:id/alunos"
        element={
          <ProtectedRoute>
            <ClassStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/mensalidades"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/relatorios"
        element={
          <ProtectedRoute>
            <EscolinhaRelatorios />
          </ProtectedRoute>
        }
      />
      {/* Financeiro Routes */}
      <Route
        path="/financeiro"
        element={
          <ProtectedRoute>
            <Financeiro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/receitas"
        element={
          <ProtectedRoute>
            <Receitas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/despesas"
        element={
          <ProtectedRoute>
            <Despesas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/contas-a-receber"
        element={
          <ProtectedRoute>
            <ContasAReceber />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/contas-a-pagar"
        element={
          <ProtectedRoute>
            <ContasAPagar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/fluxo-de-caixa"
        element={
          <ProtectedRoute>
            <FluxoDeCaixa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/relatorios"
        element={
          <ProtectedRoute>
            <FinanceiroRelatorios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/novo-receita"
        element={
          <ProtectedRoute>
            <NovaReceita />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/novo-despesa"
        element={
          <ProtectedRoute>
            <NovaDespesa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financeiro/receber-pagamento"
        element={
          <ProtectedRoute>
            <ReceberPagamento />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
