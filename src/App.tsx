
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
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
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      {/* Events Routes */}
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/reservations/new"
        element={
          <ProtectedRoute>
            <NewReservation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/calendar"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/venues"
        element={
          <ProtectedRoute>
            <Venues />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/venues/new"
        element={
          <ProtectedRoute>
            <NewVenue />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/venues/:id/edit"
        element={
          <ProtectedRoute>
            <EditVenue />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/clients"
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/clients/new"
        element={
          <ProtectedRoute>
            <NewClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/clients/:id/edit"
        element={
          <ProtectedRoute>
            <EditClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/clients/:id/history"
        element={
          <ProtectedRoute>
            <ClientHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/receivables"
        element={
          <ProtectedRoute>
            <Receivables />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/receivables/new"
        element={
          <ProtectedRoute>
            <NewReceivable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/reports"
        element={
          <ProtectedRoute>
            <EventReports />
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
        path="/bar/sales/new"
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
        path="/bar/comandas/new"
        element={
          <ProtectedRoute>
            <UnifiedSale />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/inventory"
        element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/products/new"
        element={
          <ProtectedRoute>
            <NewProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/products/:id/edit"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bar/reports"
        element={
          <ProtectedRoute>
            <BarReports />
          </ProtectedRoute>
        }
      />
      {/* School Routes */}
      <Route
        path="/school"
        element={
          <ProtectedRoute>
            <School />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school/students/new"
        element={
          <ProtectedRoute>
            <NewStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school/classes"
        element={
          <ProtectedRoute>
            <Classes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school/reports"
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
