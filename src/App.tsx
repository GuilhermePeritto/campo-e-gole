import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RootLayout from './layouts/RootLayout';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './pages/Settings';
import School from './pages/school/School';
import Students from './pages/school/Students';
import NewStudent from './pages/school/NewStudent';
import Classes from './pages/school/Classes';
import Payments from './pages/school/Payments';
import SchoolReports from './pages/school/Reports';
import Events from './pages/events/Events';
import Calendar from './pages/events/Calendar';
import Clients from './pages/events/Clients';
import NewClient from './pages/events/NewClient';
import Venues from './pages/events/Venues';
import NewVenue from './pages/events/NewVenue';
import Receivables from './pages/events/Receivables';
import NewReceivable from './pages/events/NewReceivable';
import EventsReports from './pages/events/Reports';
import EditClient from './pages/events/EditClient';
import ClientHistory from './pages/events/ClientHistory';
import EditVenue from './pages/events/EditVenue';
import NewReservation from './pages/events/NewReservation';
import EditStudent from './pages/school/EditStudent';
import StudentHistory from './pages/school/StudentHistory';
import EditClass from './pages/school/EditClass';
import ClassStudents from './pages/school/ClassStudents';
import EditReceivable from './pages/events/EditReceivable';
import ReceivePayment from './pages/events/ReceivePayment';

function App() {
  const { isLoggedIn } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* School Routes */}
        <Route path="/school" element={<School />} />
        <Route path="/school/students" element={<Students />} />
        <Route path="/school/students/new" element={<NewStudent />} />
        <Route path="/school/students/:id/edit" element={<EditStudent />} />
        <Route path="/school/students/:id/history" element={<StudentHistory />} />
        <Route path="/school/classes" element={<Classes />} />
        <Route path="/school/classes/:id/edit" element={<EditClass />} />
        <Route path="/school/classes/:id/students" element={<ClassStudents />} />
        <Route path="/school/payments" element={<Payments />} />
        <Route path="/school/reports" element={<SchoolReports />} />

        {/* Events Routes */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/calendar" element={<Calendar />} />
        <Route path="/events/clients" element={<Clients />} />
        <Route path="/events/clients/new" element={<NewClient />} />
        <Route path="/events/clients/:id/edit" element={<EditClient />} />
        <Route path="/events/clients/:id/history" element={<ClientHistory />} />
        <Route path="/events/venues" element={<Venues />} />
        <Route path="/events/venues/new" element={<NewVenue />} />
        <Route path="/events/venues/:id/edit" element={<EditVenue />} />
        <Route path="/events/reservations/new" element={<NewReservation />} />
        <Route path="/events/receivables" element={<Receivables />} />
        <Route path="/events/receivables/new" element={<NewReceivable />} />
        <Route path="/events/receivables/:id/edit" element={<EditReceivable />} />
        <Route path="/events/receivables/:id/receive" element={<ReceivePayment />} />
        <Route path="/events/reports" element={<EventsReports />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
