import { Button } from '@/components/ui/button';
import { useNavigationHistory } from '@/hooks/useNavigationHistory';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

interface PageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
  backLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  icon,
  showBackButton = true,
  backLabel = 'Voltar',
  children,
  className = ''
}) => {
  const { goBack } = useNavigationHistory();

  const handleBackClick = () => {
    goBack();
  };

  return (
    <header className={`shadow-sm border-b ${className}`}>
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
              </Button>
            )}
            <div className="flex items-center gap-2">
              {icon && (
                <div className="text-foreground">
                  {icon}
                </div>
              )}
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
          </div>
          {children && (
            <div className="flex items-center gap-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader; 