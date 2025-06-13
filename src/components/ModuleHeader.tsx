
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
import { ArrowLeft, LogOut, Settings, User } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

  // Verificar se é o dashboard para usar cores diferentes
  const isDashboard = moduleColor === 'hsl(var(--background))';
  const textColor = isDashboard ? 'text-foreground' : 'text-white';
  const buttonHoverColor = isDashboard ? 'hover:bg-foreground/10' : 'hover:bg-white/20';

  return (
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
  );
};

export default ModuleHeader;
