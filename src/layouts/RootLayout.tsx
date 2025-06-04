
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Toaster } from '../components/ui/toaster';

const RootLayout = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Outlet />
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
