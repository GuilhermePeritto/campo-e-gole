import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { useNavigationHistory } from '@/hooks/useNavigationHistory';
import { Save, X } from 'lucide-react';
import React from 'react';

interface FormularioBaseProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  moduleColor: string;
  backTo?: string;
  backLabel?: string;
  children?: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  submitIcon?: React.ReactNode;
  cancelLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  layout?: 'single' | 'two-column' | 'three-column';
  showHeader?: boolean;
  className?: string;
}

const FormularioBase: React.FC<FormularioBaseProps> = ({
  title,
  description,
  icon,
  moduleColor,
  backTo,
  backLabel,
  children,
  onSubmit,
  submitLabel = "Salvar",
  submitIcon = <Save className="h-4 w-4" />,
  cancelLabel = "Cancelar",
  loading = false,
  disabled = false,
  layout = 'single',
  showHeader = true,
  className = ""
}) => {
  const { goBack } = useNavigationHistory();

  const getLayoutClass = () => {
    const layoutClasses = {
      'single': 'grid-cols-1',
      'two-column': 'grid-cols-1 lg:grid-cols-2',
      'three-column': 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
    };
    return layoutClasses[layout];
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-muted/20 ${className}`}>
      {showHeader && (
        <ModuleHeader
          title={title}
          icon={icon}
          moduleColor={moduleColor}
        />
      )}

      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Header do Formulário */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <div className="text-primary">
                      {icon}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {title}
                  </h1>
                  {description && (
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo do Formulário */}
          <div className={`grid gap-8 ${getLayoutClass()}`}>
            {children}
          </div>

          {/* Botões de Ação */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={disabled || loading}
                  className="flex-1 h-12 lg:h-14 font-semibold text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 order-2 sm:order-1"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Salvando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {submitIcon}
                      <span>{submitLabel}</span>
                    </div>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={loading}
                  className="flex-1 h-12 lg:h-14 font-semibold text-base border-2 hover:bg-muted/50 transition-all duration-200 order-1 sm:order-2"
                >
                  <div className="flex items-center gap-3">
                    <X className="h-5 w-5" />
                    <span>{cancelLabel}</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default FormularioBase; 