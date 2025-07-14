import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'subtle';
  colSpan?: 1 | 2 | 3 | 'full';
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  icon,
  children,
  className = "",
  variant = "default",
  colSpan = 1
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'accent':
        return 'relative overflow-hidden';
      case 'subtle':
        return 'relative';
      default:
        return 'relative overflow-hidden';
    }
  };

  const getColSpanClass = () => {
    const colSpanClasses = {
      1: 'col-span-1',
      2: 'col-span-1 lg:col-span-2',
      3: 'col-span-1 lg:col-span-2 xl:col-span-3',
      'full': 'col-span-full'
    };
    return colSpanClasses[colSpan];
  };

  const getBackgroundClasses = () => {
    switch (variant) {
      case 'accent':
        return 'bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20';
      case 'subtle':
        return 'bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 border border-border/50';
      default:
        return 'bg-gradient-to-br from-background via-background to-muted/10 border border-border/30';
    }
  };

  return (
    <div className={`${getColSpanClass()} ${getVariantClasses()} ${className}`}>
      {/* Efeito de fundo com blur */}
      {variant === 'accent' && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-xl"></div>
      )}
      
      <div className={`relative ${getBackgroundClasses()} backdrop-blur-sm rounded-2xl p-6 lg:p-8`}>
        {/* Header da seção */}
        {(title || description) && (
          <div className="mb-6 lg:mb-8">
            <div className="flex items-start gap-4">
              {icon && (
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    variant === 'accent' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted/50 text-muted-foreground'
                  }`}>
                    {icon}
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className={`text-xl lg:text-2xl font-bold mb-2 ${
                  variant === 'accent' ? 'text-primary' : 'text-foreground'
                }`}>
                  {title}
                </h3>
                {description && (
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo da seção */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormSection; 