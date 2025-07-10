
import CampoBusca from '@/core/components/CampoBusca';
import React from 'react';

interface SearchableSelectProps {
  label?: string;
  selectedId?: string;
  onChange?: (value: string, item?: any) => void;
  items?: any[];
  displayField?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
  loading?: boolean;
  onSearch?: (termo: string) => void;
  onLoadById?: (id: string) => Promise<any>;
  disabled?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  selectedId,
  onChange,
  items = [],
  displayField = 'label',
  placeholder = "Selecione uma opção...",
  className,
  required = false,
  id,
  loading = false,
  onSearch,
  onLoadById,
  disabled = false
}) => {
  return (
    <CampoBusca
      label={label}
      selectedId={selectedId}
      onChange={onChange}
      items={items}
      displayField={displayField}
      placeholder={placeholder}
      className={className}
      required={required}
      id={id}
      carregando={loading}
      onBuscar={onSearch}
      onLoadById={onLoadById}
      disabled={disabled}
    />
  );
};

export default SearchableSelect;
