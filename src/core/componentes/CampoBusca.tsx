
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OpcaoBusca {
  id: string;
  label: string;
  subtitle?: string;
}

interface CampoBuscaProps {
  label?: string;
  value?: string;
  onChange?: (value: string, item?: OpcaoBusca) => void;
  opcoes?: OpcaoBusca[];
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
  carregando?: boolean;
  onBuscar?: (termo: string) => void;
}

const CampoBusca: React.FC<CampoBuscaProps> = ({
  label,
  value = '',
  onChange,
  opcoes = [],
  placeholder = "Digite para buscar...",
  className,
  required = false,
  id,
  carregando = false,
  onBuscar
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState<OpcaoBusca[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm) {
      const filtered = opcoes.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (option.subtitle && option.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(opcoes);
    }
  }, [searchTerm, opcoes]);

  useEffect(() => {
    if (onBuscar && searchTerm) {
      const timeoutId = setTimeout(() => {
        onBuscar(searchTerm);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, onBuscar]);

  // Fechar lista quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    setSelectedIndex(-1);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleOptionSelect = (option: OpcaoBusca) => {
    setSearchTerm(option.label);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    if (onChange) {
      onChange(option.label, option);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
          handleOptionSelect(filteredOptions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
    if (onChange) {
      onChange('');
    }
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          id={id}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={cn("pl-10 pr-10 h-11", className)}
          required={required}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={listRef}
          className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-background border border-border rounded-md shadow-lg"
        >
          {carregando ? (
            <div className="p-3 text-center text-muted-foreground">
              Carregando...
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className={cn(
                  "p-3 cursor-pointer hover:bg-muted/50 border-b border-border last:border-0",
                  selectedIndex === index && "bg-muted"
                )}
              >
                <div className="font-medium text-foreground">{option.label}</div>
                {option.subtitle && (
                  <div className="text-sm text-muted-foreground">{option.subtitle}</div>
                )}
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-muted-foreground">
              Nenhum resultado encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CampoBusca;
