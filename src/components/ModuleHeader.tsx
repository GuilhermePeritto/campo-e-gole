
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, LogOut, Settings, User, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickSearch from './QuickSearch';

interface ModuleHeaderProps {
  title: string;
  icon: React.ReactNode;
  moduleColor: string;
  mustReturn?: boolean;
  backTo?: string;
  backLabel?: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  icon,
  moduleColor,
  mustReturn = true,
  backTo = '/painel',
  backLabel = 'Dashboard'
}) => {
  const navigate = useNavigate();
  const { user, company, currentBranch } = useAuth();
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

  // Verificar se é o dashboard para usar cores diferentes
  const isDashboard = moduleColor === 'hsl(var(--background))';
  const textColor = isDashboard ? 'text-foreground' : 'text-white';
  const buttonHoverColor = isDashboard ? 'hover:bg-foreground/10' : 'hover:bg-white/20';

  // Adicionar listener para o atalho F2
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'F2') {
        event.preventDefault();
        setIsQuickSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      <header
        className="shadow-sm border-b"
        style={{ backgroundColor: moduleColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {mustReturn && <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backTo)}
                className={`gap-2 ${textColor} ${buttonHoverColor}`}
              >
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
              </Button>
              }
              <div className="flex items-center gap-2">
                <div className={textColor}>
                  {icon}
                </div>
                <h1 className={`text-xl font-semibold ${textColor}`}>{title}</h1>
              </div>
            </div>

            {/* Company - Branch Info (Centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
              <div className="text-center">
                <p className={`text-sm font-medium ${textColor}`}>
                  {company?.name || 'Arena Sports Club'}
                  {currentBranch && (
                    <>
                      <span className={`mx-2 ${isDashboard ? 'text-muted-foreground' : 'text-white/60'}`}>-</span>
                      {currentBranch.name}
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-4">
              {/* Quick Search Button - Redesigned */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsQuickSearchOpen(true)}
                className={`relative group ${textColor} ${buttonHoverColor} h-9 w-9 p-0 rounded-full transition-all duration-200`}
                title="Busca Rápida (F2)"
              >
                <div className="relative">
                  <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${isDashboard ? 'bg-primary' : 'bg-white/80'} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                </div>
                <div className={`absolute inset-0 rounded-full border-2 border-transparent group-hover:border-current/20 transition-colors duration-200`} />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${textColor}`}>
                        {user?.name || 'Administrador'}
                      </p>
                      <p className={`text-xs ${isDashboard ? 'text-muted-foreground' : 'text-white/80'}`}>
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
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => navigate(`/configuracoes/usuarios/${user?.id || '1'}/editar`)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Editar Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/login')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Drawer */}
      <QuickSearch 
        isOpen={isQuickSearchOpen} 
        onClose={() => setIsQuickSearchOpen(false)} 
      />
    </>
  );
};

export default ModuleHeader;
