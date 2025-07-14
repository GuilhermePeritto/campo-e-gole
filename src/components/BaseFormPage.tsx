import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigationHistory } from '@/hooks/useNavigationHistory';
import React from 'react';

interface BaseFormPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  moduleColor: string;
  backTo?: string;
  backLabel?: string;
  children?: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
}

const BaseFormPage: React.FC<BaseFormPageProps> = ({
  title,
  description,
  icon,
  moduleColor,
  backTo,
  backLabel,
  children,
  onSubmit,
  submitLabel
}) => {
  const { goBack } = useNavigationHistory();

  return (
    <div className="min-h-screen bg-background relative">
      <ModuleHeader
        title={title}
        icon={icon}
        moduleColor={moduleColor}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <form onSubmit={onSubmit} className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="text-primary">
                  {icon}
                </div>
                {title}
              </CardTitle>
              <CardDescription>
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {children}
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Button type="submit" className="flex-1 h-11 font-medium">
                  {submitLabel}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex-1 h-11 font-medium"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
};

export default BaseFormPage;
