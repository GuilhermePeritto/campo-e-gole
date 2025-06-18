import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ModuleHeader from '@/components/ModuleHeader';
import PageTour, { TourStep } from '@/components/PageTour';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormSection {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
  alwaysOpen?: boolean;
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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    formSections?.reduce((acc, section) => ({
      ...acc,
      [section.id]: section.defaultOpen || section.alwaysOpen || false
    }), {}) || {}
  );

  const toggleSection = (sectionId: string) => {
    const section = formSections?.find(s => s.id === sectionId);
    if (section?.alwaysOpen) return;
    
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ModuleHeader
        title={title}
        icon={icon}
        moduleColor={moduleColor}
        backTo={backTo}
        backLabel={backLabel}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={onSubmit} className="space-y-6">
          {formSections ? (
            <div className="space-y-6 relative">
              {/* Tour Guide positioned relative to the primary card */}
              {tourSteps && tourTitle && formSections.length > 0 && (
                <div className="absolute top-4 right-4 z-20">
                  <PageTour 
                    steps={tourSteps} 
                    title={tourTitle}
                    onStepChange={(stepIndex) => {
                      if (formSections && tourSteps[stepIndex]) {
                        const step = tourSteps[stepIndex];
                        const cardMatch = step.target.match(/data-card="([^"]+)"/);
                        if (cardMatch) {
                          const sectionId = cardMatch[1];
                          setOpenSections(prev => ({ ...prev, [sectionId]: true }));
                        }
                      }
                    }}
                  />
                </div>
              )}

              {formSections.map((section) => (
                <Card key={section.id} className="shadow-md" data-card={section.id}>
                  {section.alwaysOpen ? (
                    <>
                      <CardHeader className="bg-muted/30 border-b">
                        <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
                          <div className="text-primary">
                            {icon}
                          </div>
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        {section.content}
                      </CardContent>
                    </>
                  ) : (
                    <Collapsible 
                      open={openSections[section.id]} 
                      onOpenChange={() => toggleSection(section.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors bg-muted/30 border-b">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
                              <div className="text-primary">
                                {icon}
                              </div>
                              {section.title}
                            </CardTitle>
                            {openSections[section.id] ? (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-6">
                          {section.content}
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </Card>
              ))}
            </div>
          ) : (
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
          )}
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex gap-4">
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
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
};

export default BaseFormPage;
