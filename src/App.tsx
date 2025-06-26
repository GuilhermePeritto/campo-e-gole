
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { EventoProvider } from '@/contexts/EventoContext';
import Auditoria from '@/pages/configuracoes/Auditoria';
import Empresa from '@/pages/configuracoes/Empresa';
import Filiais from '@/pages/configuracoes/Filiais';
import Grupos from '@/pages/configuracoes/Grupos';
import NovoGrupo from '@/pages/configuracoes/NovoGrupo';
import ParametrosPorFilial from '@/pages/configuracoes/ParametrosPorFilial';
import PermissoesUsuario from '@/pages/configuracoes/PermissoesUsuario';
import Settings from '@/pages/Settings';
import Usuario from '@/pages/configuracoes/Usuario';
import Usuarios from '@/pages/configuracoes/Usuarios';
import Bar from '@/pages/Bar';
import Calendario from '@/pages/Calendario';
import Clientes from '@/pages/Clientes';
import Dashboard from '@/pages/Dashboard';
import Eventos from '@/pages/Eventos';
import Financeiro from '@/pages/Financeiro';
import ForgotPassword from '@/pages/ForgotPassword';
import Inicio from '@/pages/Inicio';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Produtos from '@/pages/Produtos';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <AuthProvider>
      <EventoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} >
              <Route path="inicio" element={<Inicio />} />
              <Route path="calendario" element={<Calendario />} />
              <Route path="eventos" element={<Eventos />} />
              <Route path="bar" element={<Bar />} />
              <Route path="financeiro" element={<Financeiro />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="produtos" element={<Produtos />} />
            </Route>

            {/* Configurações Routes */}
            <Route path="/configuracoes" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/configuracoes/empresa" element={<PrivateRoute><Empresa /></PrivateRoute>} />
            <Route path="/configuracoes/filiais" element={<PrivateRoute><Filiais /></PrivateRoute>} />
            <Route path="/configuracoes/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
            <Route path="/configuracoes/usuarios/novo" element={<PrivateRoute><Usuario /></PrivateRoute>} />
            <Route path="/configuracoes/usuarios/:id" element={<PrivateRoute><Usuario /></PrivateRoute>} />
            <Route path="/configuracoes/usuarios/:id/permissoes" element={<PrivateRoute><PermissoesUsuario /></PrivateRoute>} />
            <Route path="/configuracoes/grupos" element={<PrivateRoute><Grupos /></PrivateRoute>} />
            <Route path="/configuracoes/grupos/novo" element={<PrivateRoute><NovoGrupo /></PrivateRoute>} />
            <Route path="/configuracoes/grupos/:id" element={<PrivateRoute><NovoGrupo /></PrivateRoute>} />
            <Route path="/configuracoes/parametros" element={<PrivateRoute><ParametrosPorFilial /></PrivateRoute>} />
            <Route path="/configuracoes/auditoria" element={<PrivateRoute><Auditoria /></PrivateRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </EventoProvider>
    </AuthProvider>
  );
}

interface PrivateRouteProps {
  children: React.ReactElement;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default App;
