import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Agenda from './pages/eventos/eventos/Agenda';
import Reserva from './pages/eventos/eventos/Reserva';
import Financeiro from './pages/financeiro/Financeiro';
import Inicio from './pages/inicio/Inicio';
import Locais from './pages/eventos/locais/Locais';
import Clientes from './pages/eventos/clientes/Clientes';
import Recebiveis from './pages/eventos/recebiveis/Recebiveis';
import ReceberPagamento from './pages/eventos/recebiveis/ReceberPagamento';
import Local from './pages/eventos/locais/Local';
import Cliente from './pages/eventos/clientes/Cliente';
import Recebivel from './pages/eventos/recebiveis/Recebivel';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/financeiro" element={<Financeiro />} />

        <Route path="/eventos" element={<Agenda />} />
        <Route path="/eventos/reservar" element={<Reserva />} />
        <Route path="/eventos/reservas/:id" element={<Reserva />} />
        <Route path="/eventos/locais" element={<Locais />} />
        <Route path="/eventos/locais/:id" element={<Local />} />
        <Route path="/eventos/locais/novo" element={<Local />} />
        <Route path="/eventos/clientes" element={<Clientes />} />
        <Route path="/eventos/clientes/:id" element={<Cliente />} />
        <Route path="/eventos/clientes/novo" element={<Cliente />} />
        <Route path="/eventos/contas-a-receber" element={<Recebiveis />} />
        <Route path="/eventos/contas-a-receber/:id" element={<Recebivel />} />
        <Route path="/eventos/contas-a-receber/novo" element={<Recebivel />} />
        <Route path="/eventos/contas-a-receber/:id/receber" element={<ReceberPagamento />} />
      </Routes>
    </BrowserRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
