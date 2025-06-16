
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ModuleHeader from '@/components/ModuleHeader';

interface ListaBaseProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  moduleColor: string;
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
  headerActions?: ReactNode;
  className?: string;
}

const ListaBase: React.FC<ListaBaseProps> = ({
  title,
  description,
  icon,
  moduleColor,
  backTo,
  backLabel,
  children,
  headerActions,
  className
}) => {
  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title={title}
        icon={icon}
        moduleColor={moduleColor}
        backTo={backTo}
        backLabel={backLabel}
      />

      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className || ''}`}>
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                {description && (
                  <CardDescription className="mt-1">{description}</CardDescription>
                )}
              </div>
              {headerActions && (
                <div className="flex gap-3">
                  {headerActions}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {children}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ListaBase;
