
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Bar from './pages/Bar';
import Products from './pages/bar/Products';
import NewProduct from './pages/bar/NewProduct';
import EditProduct from './pages/bar/EditProduct';
import Inventory from './pages/bar/Inventory';
import Comandas from './pages/bar/Comandas';
import NewSale from './pages/bar/NewSale';
import UnifiedSale from './pages/bar/UnifiedSale';
import Checkout from './pages/bar/Checkout';
import BarReports from './pages/bar/Reports';
import Financial from './pages/Financial';
import ContasPagar from './pages/financeiro/AccountsPayable';
import ContasReceber from './pages/financeiro/AccountsReceivable';
import RelatoriosFinanceiros from './pages/financeiro/Reports';
import NewPayable from './pages/financeiro/NewPayable';
import NewReceivable from './pages/financeiro/NewReceivable';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ViewComanda from './pages/bar/ViewComanda';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Base Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          {/* Financeiro Module Routes */}
          <Route path="/financeiro" element={<Financial />} />
          <Route path="/financeiro/contas-a-pagar" element={<ContasPagar />} />
          <Route path="/financeiro/contas-a-receber" element={<ContasReceber />} />
          <Route path="/financeiro/relatorios" element={<RelatoriosFinanceiros />} />
          <Route path="/financeiro/novo-pagamento" element={<NewPayable />} />
          <Route path="/financeiro/novo-recebimento" element={<NewReceivable />} />
          
          {/* Bar Module Routes */}
          <Route path="/bar" element={<Bar />} />
          <Route path="/bar/products" element={<Products />} />
          <Route path="/bar/new-product" element={<NewProduct />} />
          <Route path="/bar/edit-product/:id" element={<EditProduct />} />
          <Route path="/bar/inventory" element={<Inventory />} />
          <Route path="/bar/comandas" element={<Comandas />} />
          <Route path="/bar/comandas/:id" element={<ViewComanda />} />
          <Route path="/bar/new-sale" element={<NewSale />} />
          <Route path="/bar/unified-sale" element={<UnifiedSale />} />
          <Route path="/bar/checkout" element={<Checkout />} />
          <Route path="/bar/reports" element={<BarReports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
