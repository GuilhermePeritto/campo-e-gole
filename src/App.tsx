
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Events from "./pages/Events";
import Bar from "./pages/Bar";
import School from "./pages/School";
import NotFound from "./pages/NotFound";
// Event pages
import NewReservation from "./pages/events/NewReservation";
import Calendar from "./pages/events/Calendar";
import Venues from "./pages/events/Venues";
import NewVenue from "./pages/events/NewVenue";
import EditVenue from "./pages/events/EditVenue";
import Clients from "./pages/events/Clients";
import NewClient from "./pages/events/NewClient";
import EditClient from "./pages/events/EditClient";
import ClientHistory from "./pages/events/ClientHistory";
import Receivables from "./pages/events/Receivables";
import NewReceivable from "./pages/events/NewReceivable";
import EditReceivable from "./pages/events/EditReceivable";
import ReceivePayment from "./pages/events/ReceivePayment";
import EventReports from "./pages/events/Reports";
// Bar pages
import UnifiedSale from "./pages/bar/UnifiedSale";
import Comandas from "./pages/bar/Comandas";
import Inventory from "./pages/bar/Inventory";
import Products from "./pages/bar/Products";
import BarReports from "./pages/bar/Reports";
import NewProduct from "./pages/bar/NewProduct";
import EditProduct from "./pages/bar/EditProduct";
import Checkout from "./pages/bar/Checkout";
// School pages
import Students from "./pages/school/Students";
import NewStudent from "./pages/school/NewStudent";
import EditStudent from "./pages/school/EditStudent";
import StudentHistory from "./pages/school/StudentHistory";
import Payments from "./pages/school/Payments";
import ReceiveStudentPayment from "./pages/school/ReceivePayment";
import Classes from "./pages/school/Classes";
import EditClass from "./pages/school/EditClass";
import ClassStudents from "./pages/school/ClassStudents";
import SchoolReports from "./pages/school/Reports";

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
        path="/configuracoes"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      {/* Rotas de Eventos */}
      <Route
        path="/eventos"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/reservas/nova"
        element={
          <ProtectedRoute>
            <NewReservation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/calendario"
        element={
          <ProtectedRoute>
            <Calendar />
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
        path="/eventos/contas-receber"
        element={
          <ProtectedRoute>
            <Receivables />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/contas-receber/nova"
        element={
          <ProtectedRoute>
            <NewReceivable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/contas-receber/:id/editar"
        element={
          <ProtectedRoute>
            <EditReceivable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/contas-receber/:id/receber"
        element={
          <ProtectedRoute>
            <ReceivePayment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eventos/relatorios"
        element={
          <ProtectedRoute>
            <EventReports />
          </ProtectedRoute>
        }
      />
      {/* Rotas do Bar */}
      <Route
        path="/bar"
        element={
          <ProtectedRoute>
            <Bar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/vendas/nova"
        element={
          <ProtectedRoute>
            <UnifiedSale />
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
        path="/bar/comandas/nova"
        element={
          <ProtectedRoute>
            <UnifiedSale />
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
        path="/bar/fechamento"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/relatorios"
        element={
          <ProtectedRoute>
            <BarReports />
          </ProtectedRoute>
        }
      />
      {/* Rotas da Escolinha */}
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
        path="/escolinha/mensalidades"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/escolinha/mensalidades/:id/receber"
        element={
          <ProtectedRoute>
            <ReceiveStudentPayment />
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
        path="/escolinha/relatorios"
        element={
          <ProtectedRoute>
            <SchoolReports />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
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
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
