
import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/ui/toaster';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default RootLayout;
