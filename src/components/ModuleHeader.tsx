
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigationHistory } from '@/hooks/useNavigationHistory';

interface ModuleHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  moduleColor: string;
  backTo?: string;
  backLabel?: string;
  customBackAction?: () => void;
  showBackButton?: boolean;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  description,
  icon,
  moduleColor,
  backTo,
  backLabel = "Voltar",
  customBackAction,
  showBackButton = true
}) => {
  const { goBack } = useNavigationHistory();

  const handleBack = () => {
    if (customBackAction) {
      customBackAction();
    } else {
      goBack();
    }
  };

  return (
    <div 
      className="border-b px-6 py-4"
      style={{ 
        backgroundColor: `rgb(${moduleColor} / 0.05)`,
        borderBottomColor: `rgb(${moduleColor} / 0.2)`
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2 hover:bg-white/50"
            >
              <ChevronLeft className="h-4 w-4" />
              {backLabel}
            </Button>
          )}
          <div className="flex items-center gap-3">
            {icon && (
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `rgb(${moduleColor} / 0.1)` }}
              >
                <div style={{ color: `rgb(${moduleColor})` }}>
                  {icon}
                </div>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {description && (
                <p className="text-muted-foreground text-sm mt-1">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleHeader;
