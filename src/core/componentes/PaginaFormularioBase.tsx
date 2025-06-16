
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ModuleHeader from '@/components/ModuleHeader';
import PageTour, { TourStep } from '@/components/PageTour';

interface PaginaFormularioBaseProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  moduleColor: string;
  backTo: string;
  backLabel: string;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  children: React.ReactNode;
  tourSteps?: TourStep[];
  tourTitle?: string;
  className?: string;
  submitDisabled?: boolean;
  submitVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  extraActions?: React.ReactNode;
}

const PaginaFormularioBase: React.FC<PaginaFormularioBaseProps> = ({
  title,
  description,
  icon,
  moduleColor,
  backTo,
  backLabel,
  onSubmit,
  submitLabel = "Salvar",
  children,
  tourSteps = [],
  tourTitle,
  className,
  submitDisabled = false,
  submitVariant = "default",
  extraActions
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                {description && (
                  <CardDescription className="mt-1">{description}</CardDescription>
                )}
              </div>
              {tourSteps.length > 0 && tourTitle && (
                <PageTour steps={tourSteps} title={tourTitle} />
              )}
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmit} className={`space-y-6 ${className || ''}`}>
              {children}

              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="gap-2"
                >
                  <Link to={backTo}>
                    <ArrowLeft className="h-4 w-4" />
                    {backLabel}
                  </Link>
                </Button>

                <div className="flex gap-3">
                  {extraActions}
                  <Button
                    type="submit"
                    variant={submitVariant}
                    disabled={submitDisabled}
                  >
                    {submitLabel}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PaginaFormularioBase;
