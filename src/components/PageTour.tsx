
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { HelpCircle, ArrowLeft, ArrowRight, X } from 'lucide-react';

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface PageTourProps {
  steps: TourStep[];
  title: string;
}

const PageTour: React.FC<PageTourProps> = ({ steps, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      if (element) {
        setTargetElement(element);
        // Scroll to element and highlight it
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.outline = '2px solid hsl(var(--primary))';
        element.style.outlineOffset = '4px';
        element.style.borderRadius = '8px';
      }
    }

    return () => {
      // Remove highlight from previous element
      if (targetElement) {
        targetElement.style.outline = '';
        targetElement.style.outlineOffset = '';
        targetElement.style.borderRadius = '';
      }
    };
  }, [currentStep, isOpen, steps, targetElement]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    if (targetElement) {
      targetElement.style.outline = '';
      targetElement.style.outlineOffset = '';
      targetElement.style.borderRadius = '';
    }
    setIsOpen(false);
    setCurrentStep(0);
    setTargetElement(null);
  };

  const startTour = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  if (!steps || steps.length === 0) return null;

  return (
    <>
      {/* Help Icon Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={startTour}
          size="icon"
          className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          title={`Iniciar tour: ${title}`}
        >
          <HelpCircle className="h-6 w-6 text-primary-foreground" />
        </Button>
      </div>

      {/* Tour Popover */}
      {isOpen && targetElement && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div 
            className="absolute bg-background border rounded-lg shadow-lg p-4 max-w-sm pointer-events-auto"
            style={{
              top: targetElement.offsetTop + targetElement.offsetHeight + 10,
              left: Math.min(
                targetElement.offsetLeft,
                window.innerWidth - 400
              ),
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm text-primary">
                  {steps[currentStep].title}
                </h3>
                <div className="text-xs text-muted-foreground mt-1">
                  Passo {currentStep + 1} de {steps.length}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 -mt-1 -mr-1"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-foreground mb-4">
              {steps[currentStep].content}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    className="gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Anterior
                  </Button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    size="sm"
                    onClick={handleNext}
                    className="gap-1"
                  >
                    Próximo
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleClose}
                    className="gap-1"
                  >
                    Finalizar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageTour;
