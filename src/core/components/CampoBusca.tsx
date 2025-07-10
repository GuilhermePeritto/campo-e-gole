
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface CampoBuscaProps {
  label?: string;
  value?: string;
  selectedId?: string; // ID do item selecionado
  onChange?: (value: string, item?: any) => void;
  items?: any[];
  displayField?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
  carregando?: boolean;
  onBuscar?: (termo: string) => void;
  onLoadById?: (id: string) => Promise<any>; // Função para carregar item por ID
  disabled?: boolean;
}

const CampoBusca: React.FC<CampoBuscaProps> = ({
  label,
  value = '',
  selectedId,
  onChange,
  items = [],
  displayField = 'label',
  placeholder = "Digite para buscar...",
  className,
  required = false,
  id,
  carregando = false,
  onBuscar,
  onLoadById,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loadingById, setLoadingById] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Carregar item por ID quando selectedId mudar
  useEffect(() => {
    const loadItemById = async () => {
      if (!selectedId) {
        setSelectedItem(null);
        setSearchTerm('');
        return;
      }

      // Primeiro tenta encontrar nos items locais
      const localItem = items.find(item => item.id === selectedId);
      if (localItem) {
        setSelectedItem(localItem);
        setSearchTerm(localItem[displayField] || '');
        return;
      }

      // Se não encontrou localmente e tem função de carregamento, tenta carregar
      if (onLoadById) {
        setLoadingById(true);
        try {
          const item = await onLoadById(selectedId);
          if (item) {
            setSelectedItem(item);
            setSearchTerm(item[displayField] || '');
            // Adicionar o item carregado à lista local se não existir
            if (!items.find(i => i.id === item.id)) {
              setFilteredOptions(prev => [item, ...prev]);
            }
          }
        } catch (error) {
          console.error('Erro ao carregar item por ID:', error);
        } finally {
          setLoadingById(false);
        }
      }
    };

    loadItemById();
  }, [selectedId, items, displayField, onLoadById]);

  // Atualizar searchTerm quando value mudar externamente
  useEffect(() => {
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  }, [value]);

  useEffect(() => {
    if (searchTerm && isOpen) {
      const filtered = items.filter(item =>
        item[displayField]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      // Sempre mostrar todos os itens quando não há termo de busca ou quando abre o dropdown
      setFilteredOptions(items);
    }
  }, [searchTerm, items, displayField, isOpen]);

  useEffect(() => {
    if (onBuscar && searchTerm && !selectedItem) {
      const timeoutId = setTimeout(() => {
        onBuscar(searchTerm);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, onBuscar, selectedItem]);

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
    
    // Limpar item selecionado quando usuário digita
    if (selectedItem && newValue !== selectedItem[displayField]) {
      setSelectedItem(null);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleInputFocus = () => {
    if (disabled) return;
    setIsOpen(true);
    // Limpar termo de busca ao focar para mostrar todas as opções
    if (searchTerm && !selectedItem) {
      setSearchTerm('');
    }
  };

  const handleOptionSelect = (option: any) => {
    setSearchTerm(option[displayField]);
    setSelectedItem(option);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    if (onChange) {
      onChange(option[displayField], option);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || disabled) return;

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
    setSelectedItem(null);
    setIsOpen(false);
    if (onChange) {
      onChange('');
    }
    inputRef.current?.focus();
  };

  const displayValue = selectedItem ? selectedItem[displayField] : searchTerm;
  const isLoading = carregando || loadingById;

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
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={cn("pl-10 pr-10 h-11", className)}
          required={required}
          disabled={disabled}
        />
        {displayValue && !disabled && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && !disabled && (
        <div
          ref={listRef}
          className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-background border border-border rounded-md shadow-lg"
        >
          {isLoading ? (
            <div className="p-3 text-center text-muted-foreground">
              Carregando...
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.id || index}
                onClick={() => handleOptionSelect(option)}
                className={cn(
                  "p-3 cursor-pointer hover:bg-muted/50 border-b border-border last:border-0",
                  selectedIndex === index && "bg-muted",
                  selectedItem?.id === option.id && "bg-primary/10 border-primary/20"
                )}
              >
                <div className="text-foreground font-medium">{option[displayField]}</div>
                {option.subtitle && (
                  <div className="text-sm text-muted-foreground">{option.subtitle}</div>
                )}
                {option.email && (
                  <div className="text-sm text-muted-foreground">{option.email}</div>
                )}
                {option.tipo && (
                  <div className="text-sm text-muted-foreground">{option.tipo}</div>
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
