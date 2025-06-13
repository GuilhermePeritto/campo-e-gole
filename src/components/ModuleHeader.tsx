
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import QuickSearch from './QuickSearch';

interface ModuleHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backTo?: string;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  moduleColor?: string;
  mustReturn?: boolean;
  backLabel?: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  backTo = '/',
  actions,
  icon,
  moduleColor,
  mustReturn,
  backLabel = 'Voltar'
}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-card border-b border-border">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {(showBackButton || mustReturn) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backTo)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
              </Button>
            )}
            <div className="flex items-center gap-3">
              {icon && (
                <div 
                  className="p-2 rounded-lg"
                  style={moduleColor ? { backgroundColor: moduleColor } : {}}
                >
                  {icon}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {subtitle && (
                  <p className="text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <QuickSearch />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {theme === 'light' ? 'Escuro' : 'Claro'}
              </span>
            </Button>
            
            {actions}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModuleHeader;
