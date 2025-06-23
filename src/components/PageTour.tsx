
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
  onStepChange?: (stepIndex: number) => void;
}

const PageTour: React.FC<PageTourProps> = ({ steps, title, onStepChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      // Notificar mudança de passo
      onStepChange?.(currentStep);
      
      // Aguardar um pouco para a seção abrir antes de encontrar o elemento
      setTimeout(() => {
        const element = document.querySelector(steps[currentStep].target) as HTMLElement;
        if (element) {
          setTargetElement(element);
          
          // Scroll to element and highlight it
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.style.outline = '2px solid hsl(var(--primary))';
          element.style.outlineOffset = '4px';
          element.style.borderRadius = '8px';
          
          // Calcular posição do popover
          const rect = element.getBoundingClientRect();
          const position = getOptimalPosition(rect);
          setPopoverPosition(position);
        }
      }, 300);
    }

    return () => {
      // Remove highlight from previous element
      if (targetElement) {
        targetElement.style.outline = '';
        targetElement.style.outlineOffset = '';
        targetElement.style.borderRadius = '';
      }
    };
  }, [currentStep, isOpen, steps, targetElement, onStepChange]);

  // Recalcular posição quando a janela é redimensionada
  useEffect(() => {
    const handleResize = () => {
      if (targetElement && isOpen) {
        const rect = targetElement.getBoundingClientRect();
        const position = getOptimalPosition(rect);
        setPopoverPosition(position);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [targetElement, isOpen]);

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

  const getOptimalPosition = (rect: DOMRect) => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const popoverWidth = 350;
    const popoverHeight = 200;
    
    // Posição preferencial: abaixo do elemento
    if (rect.bottom + popoverHeight + 20 < windowHeight) {
      return {
        top: rect.bottom + 10,
        left: Math.max(10, Math.min(rect.left, windowWidth - popoverWidth - 10)),
      };
    }
    // Se não cabe abaixo, tenta acima
    else if (rect.top - popoverHeight - 20 > 0) {
      return {
        top: rect.top - popoverHeight - 10,
        left: Math.max(10, Math.min(rect.left, windowWidth - popoverWidth - 10)),
      };
    }
    // Se não cabe acima nem abaixo, posiciona à direita
    else if (rect.right + popoverWidth + 20 < windowWidth) {
      return {
        top: Math.max(10, Math.min(rect.top, windowHeight - popoverHeight - 10)),
        left: rect.right + 10,
      };
    }
    // Por último, posiciona à esquerda
    else {
      return {
        top: Math.max(10, Math.min(rect.top, windowHeight - popoverHeight - 10)),
        left: Math.max(10, rect.left - popoverWidth - 10),
      };
    }
  };

  if (!steps || steps.length === 0) return null;

  return (
    <>
      {/* Help Icon Button */}
      <Button
        onClick={startTour}
        size="icon"
        className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 shadow-md"
        title={`Iniciar tour: ${title}`}
      >
        <HelpCircle className="h-4 w-4 text-primary-foreground" />
      </Button>

      {/* Tour Popover */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div 
            className="absolute bg-background border rounded-lg shadow-xl p-4 w-80 pointer-events-auto"
            style={{
              top: `${popoverPosition.top}px`,
              left: `${popoverPosition.left}px`,
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
