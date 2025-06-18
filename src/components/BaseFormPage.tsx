
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ModuleHeader from '@/components/ModuleHeader';
import PageTour, { TourStep } from '@/components/PageTour';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormSection {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface BaseFormPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  moduleColor: string;
  backTo: string;
  backLabel: string;
  children?: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  tourSteps?: TourStep[];
  tourTitle?: string;
  formSections?: FormSection[];
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
  submitLabel,
  tourSteps,
  tourTitle,
  formSections
}) => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<string[]>(
    formSections?.filter(section => section.defaultOpen).map(section => section.id) || []
  );

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
        <Card className="shadow-lg relative">
          {tourSteps && tourTitle && (
            <PageTour 
              steps={tourSteps} 
              title={tourTitle}
              onStepChange={(stepIndex) => {
                // Abrir seção correspondente ao passo do tour
                if (formSections && tourSteps[stepIndex]) {
                  const step = tourSteps[stepIndex];
                  const accordionMatch = step.target.match(/data-accordion="([^"]+)"/);
                  if (accordionMatch) {
                    const sectionId = accordionMatch[1];
                    setOpenSections(prev => [...prev.filter(id => id !== sectionId), sectionId]);
                  }
                }
              }}
            />
          )}
          
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
            <form onSubmit={onSubmit} className="space-y-8">
              {formSections ? (
                <Accordion type="multiple" value={openSections} onValueChange={setOpenSections}>
                  {formSections.map((section) => (
                    <AccordionItem key={section.id} value={section.id} data-accordion={section.id}>
                      <AccordionTrigger className="text-lg font-semibold">
                        {section.title}
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        {section.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                children
              )}
              
              <div className="flex gap-4 pt-6 border-t">
                <Button type="submit" className="flex-1 h-11 font-medium">
                  {submitLabel}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(backTo)}
                  className="flex-1 h-11 font-medium"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BaseFormPage;
