
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ModuleHeaderProps {
  title: string;
  icon: React.ReactNode;
  moduleColor: string;
  backTo?: string;
  backLabel?: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  icon,
  moduleColor,
  backTo = '/painel',
  backLabel = 'Dashboard'
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="shadow-sm border-b" style={{ borderBottomColor: moduleColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(backTo)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Button>
            <div className="flex items-center gap-2">
              <div style={{ color: moduleColor }}>
                {icon}
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-300">{title}</h1>
              <div 
                className="w-1 h-6 rounded-full ml-2" 
                style={{ backgroundColor: moduleColor }}
              />
            </div>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  {user?.name || 'Administrador'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user?.email || 'admin@exemplo.com'}
                </p>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModuleHeader;
